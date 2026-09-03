import { useEffect, useRef } from 'react'

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/** Fração do track em que o card termina de fechar as bordas. */
const CLOSE_AT = 0.35
/** Trecho em que o bloco inicial (logo/título/botões) desaparece. */
const CONTENT_FADE = { start: 0.14, length: 0.1 }
/** Trecho em que a narrativa atravessa o card. */
const STORY = { start: 0.18, length: 0.78 }
/** Altura da faixa central em que um parágrafo fica aceso, em fração da viewport. */
const SPOTLIGHT_BAND = 0.32

/**
 * Todo o comportamento de scroll do hero, num único loop de animação:
 *
 * 1. **bordas fecham** — `--p` (0→1) no track, de onde o padding e o
 *    border-radius do card derivam; com lerp, para assentar macio ao parar.
 * 2. **conteúdo inicial some** — `--hc` (1→0) logo depois que as bordas fecham.
 * 3. **narrativa atravessa** — o bloco de texto sobe de baixo para cima por
 *    dentro do card fixo; o feixe fica parado, daí o parallax.
 * 4. **spotlight** — cada parágrafo acende conforme se aproxima do centro da
 *    viewport e apaga ao se afastar.
 *
 * Tudo é lido da posição de scroll a cada frame, então o efeito acompanha a
 * rolagem nos dois sentidos.
 */
export function useHeroScroll() {
  const trackRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let closeCurrent = 0
    let raf = 0

    const tick = () => {
      const rect = track.getBoundingClientRect()
      const distance = track.offsetHeight - window.innerHeight
      const progress = distance > 0 ? clamp(-rect.top / distance, 0, 1) : 0
      const viewport = window.innerHeight

      // 1) bordas fecham
      const closeTarget = easeOutCubic(clamp(progress / CLOSE_AT, 0, 1))
      closeCurrent += (closeTarget - closeCurrent) * 0.12
      if (Math.abs(closeTarget - closeCurrent) < 0.001) closeCurrent = closeTarget
      track.style.setProperty('--p', closeCurrent.toFixed(4))

      // 2) conteúdo inicial some
      const content = contentRef.current
      if (content) {
        const fade = 1 - clamp((progress - CONTENT_FADE.start) / CONTENT_FADE.length, 0, 1)
        content.style.setProperty('--hc', fade.toFixed(3))
        // depois de sumir, para de interceptar cliques nos botões
        content.style.pointerEvents = fade < 0.02 ? 'none' : ''
      }

      // 3) narrativa atravessa o card
      const story = storyRef.current
      if (story) {
        const storyProgress = clamp((progress - STORY.start) / STORY.length, 0, 1)

        // A distância percorrida é calculada para que o ÚLTIMO bloco (o CTA)
        // termine centralizado, e não passe direto por cima: sem isso o card
        // fica vazio no fim do track.
        const lastBlock = story.lastElementChild as HTMLElement | null
        const travel = viewport * 0.5 + story.offsetHeight - (lastBlock?.offsetHeight ?? 0) / 2
        const y = viewport * 0.5 - storyProgress * travel
        story.style.transform = `translate(-50%, ${y.toFixed(1)}px)`

        // 4) spotlight por bloco
        const center = viewport * 0.5
        const band = viewport * SPOTLIGHT_BAND
        for (const child of story.children) {
          const block = child as HTMLElement
          const box = block.getBoundingClientRect()
          const blockCenter = box.top + box.height / 2
          const nearness = clamp(1 - Math.abs(blockCenter - center) / band, 0, 1)
          const opacity = easeOutCubic(nearness)
          block.style.opacity = opacity.toFixed(3)
          // bloco apagado não intercepta clique (importa para o CTA)
          block.style.pointerEvents = opacity < 0.05 ? 'none' : ''
        }
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [])

  return { trackRef, contentRef, storyRef }
}
