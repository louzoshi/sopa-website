import { useEffect, useRef, useState } from 'react'

import { BEAM_FRAG, BEAM_VERT } from './beamShaders'

/**
 * Faixa horizontal com o feixe de luz renderizado em WebGL2.
 * O canvas entra com fade suave assim que o primeiro frame é desenhado.
 *
 * `className` posiciona a faixa dentro do container (o hero e o footer usam
 * alturas e ancoragens diferentes). Se o WebGL2 não estiver disponível (ou o
 * shader falhar), o componente apenas não desenha nada — a seção segue de pé.
 */
export function LightBeam({ className = 'top-[6%] h-[88%]' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2', {
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    })
    if (!gl) {
      console.warn('WebGL2 indisponível — hero segue sem o feixe de luz.')
      return
    }

    const shaders: WebGLShader[] = []
    let program: WebGLProgram | null = null
    let buffer: WebGLBuffer | null = null
    let observer: ResizeObserver | null = null
    let raf = 0
    let fadeIn = 0

    /** Libera o que foi criado, mas NUNCA perde o contexto: `getContext` devolve
     *  sempre o mesmo objeto para este canvas, e um contexto perdido não
     *  compila mais nada no remount (StrictMode monta o efeito duas vezes). */
    const dispose = () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(fadeIn)
      observer?.disconnect()
      shaders.forEach((shader) => gl.deleteShader(shader))
      if (program) gl.deleteProgram(program)
      if (buffer) gl.deleteBuffer(buffer)
    }

    try {
      const compile = (type: number, src: string) => {
        const shader = gl.createShader(type)
        if (!shader) throw new Error('não foi possível criar o shader')
        shaders.push(shader)
        gl.shaderSource(shader, src)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          throw new Error(gl.getShaderInfoLog(shader) || 'shader não compilou')
        }
        return shader
      }

      program = gl.createProgram()
      if (!program) throw new Error('não foi possível criar o programa')
      gl.attachShader(program, compile(gl.VERTEX_SHADER, BEAM_VERT))
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, BEAM_FRAG))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'programa não linkou')
      }
      gl.useProgram(program)

      // um triângulo que cobre o viewport inteiro
      buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(program, 'p')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

      const uRes = gl.getUniformLocation(program, 'uRes')
      const uT = gl.getUniformLocation(program, 'uT')

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const resize = () => {
        const w = canvas.clientWidth * dpr
        const h = canvas.clientHeight * dpr
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
        }
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
      observer = new ResizeObserver(resize)
      observer.observe(canvas)
      resize()

      const start = performance.now()
      const frame = (now: number) => {
        resize()
        gl.uniform2f(uRes, canvas.width, canvas.height)
        gl.uniform1f(uT, (now - start) / 1000)
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
      fadeIn = requestAnimationFrame(() => setReady(true))
    } catch (error) {
      console.warn('Feixe de luz desativado:', error)
      dispose()
      return
    }

    return dispose
  }, [])

  return (
    <div className={`pointer-events-none absolute inset-x-0 z-[1] ${className}`}>
      <canvas
        ref={canvasRef}
        className={`block h-full w-full transition-opacity duration-[1800ms] ease-[cubic-bezier(.22,1,.36,1)] ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
