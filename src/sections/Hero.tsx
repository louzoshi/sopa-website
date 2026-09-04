import type { CSSProperties } from 'react'

import { Icon } from '../components/Icon'
import { SpecularButton } from '../components/SpecularButton'
import { HeroStory } from '../components/hero/HeroStory'
import { LightBeam } from '../components/hero/LightBeam'
import { ShapesField } from '../components/hero/ShapesField'
import { hero, whatsappUrl } from '../data/content'
import { useHeroScroll } from '../hooks/useHeroScroll'

/**
 * Hero em cinco camadas, de baixo para cima:
 *   1. gradiente escuro do card
 *   2. campo de hexágonos em wireframe (canvas 2D, mascarado)
 *   3. faixa do feixe de luz (WebGL)
 *   4. conteúdo inicial — logo, título, botões (some ao rolar)
 *   5. narrativa que atravessa o card por dentro
 *
 * O track alto + sticky dão a distância de scroll: conforme `--p` vai de 0 a 1
 * o padding cresce e os cantos arredondam, o preto do fundo aparece por trás e
 * o card "se solta" das bordas. Depois disso o texto começa a passar. A altura
 * do track é o ritmo da leitura: quanto mais parágrafos na narrativa, mais
 * track para o texto não sair correndo.
 * Ver `useHeroScroll` para as faixas de scroll de cada etapa.
 */
export function Hero() {
  const { trackRef, contentRef, storyRef } = useHeroScroll()

  return (
    <div ref={trackRef} className="relative h-[340vh] bg-frame">
      <div className="sticky top-0 flex h-screen items-center justify-center bg-frame">
        <div className="h-full w-full px-[calc(var(--p,0)*64px)] py-[calc(var(--p,0)*56px)]">
          <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[calc(var(--p,0)*40px)] bg-linear-[180deg,var(--color-hero-top)_0%,var(--color-hero-mid)_42%,var(--color-hero-bot)_78%] px-[6vw] py-[6vh]">
            <div className="absolute left-[26px] top-[22px] z-2 hidden font-mono text-[11px] uppercase leading-[1.8] tracking-[0.08em] text-ink/30 sm:block">
              {hero.corner.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>

            <ShapesField />
            <LightBeam />

            <div
              ref={contentRef}
              className="absolute left-1/2 top-1/2 z-2 w-full max-w-[900px] px-[6vw] text-center"
              style={
                {
                  opacity: 'var(--hc, 1)',
                  transform: 'translate(-50%, calc(-50% + (1 - var(--hc, 1)) * -40px))',
                } as CSSProperties
              }
            >
              <div className="mx-auto mb-10 size-[46px] border-2 border-white/20 [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]" />

              <h1 className="mb-[34px] font-display text-[clamp(38px,7vw,88px)] font-medium leading-[1.02] tracking-[-0.01em] text-ink-bright">
                {hero.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <div className="flex flex-wrap justify-center gap-3">
                <SpecularButton
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-surface-raised px-5 py-3 text-sm text-ink hover:border-white/25"
                >
                  <Icon name="whatsapp" className="size-4" />
                  {hero.actions.primary}
                </SpecularButton>
                <a
                  href="#servicos"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-transparent px-5 py-3 text-sm text-ink transition-colors hover:border-white/25"
                >
                  {hero.actions.secondary}
                </a>
              </div>

              <p className="mt-[34px] text-sm leading-relaxed text-ink/55">
                {hero.subtitle.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>

            <HeroStory ref={storyRef} />
          </section>
        </div>
      </div>
    </div>
  )
}
