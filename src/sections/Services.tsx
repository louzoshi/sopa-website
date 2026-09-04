import { useState, type CSSProperties } from 'react'

import { Icon, type IconName } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'
import { SpecularButton } from '../components/SpecularButton'
import { IntegrationGrid } from '../components/services/IntegrationGrid'
import { WorkGrid } from '../components/services/WorkGrid'
import { services, whatsappUrl } from '../data/content'

const ACCENTS = {
  warm: 'var(--color-accent-warm)',
  cool: 'var(--color-accent-cool)',
} as const

/** Cada visual define a própria altura — a grade de trabalhos cresce com os thumbs. */
const VISUALS = {
  works: WorkGrid,
  integrations: IntegrationGrid,
} as const

type Card = (typeof services.cards)[number]

/**
 * Dois cards de serviço que abrem em acordeão, cada um por conta própria —
 * dá para deixar os dois abertos e comparar. O grid usa `items-start` de
 * propósito: sem isso o card fechado esticaria junto com o vizinho aberto.
 */
export function Services() {
  return (
    <section id="servicos" className="relative bg-surface px-6 py-28 sm:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          description={services.description}
          align="center"
        />

        <div className="mt-20 grid gap-6 lg:grid-cols-2 lg:items-start">
          {services.cards.map((card) => (
            <ServiceCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ card }: { card: Card }) {
  const [isOpen, setIsOpen] = useState(false)
  const Visual = VISUALS[card.visual]
  const panelId = `servico-${card.id}`

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border bg-card transition-colors ${
        isOpen ? 'border-(--accent)/30' : 'border-white/8 hover:border-white/16'
      }`}
      style={{ '--accent': ACCENTS[card.accent] } as CSSProperties}
    >
      <div className="flex flex-1 flex-col p-8">
        {/*
          O corpo inteiro é o gatilho: o cliente clica em qualquer lugar do
          texto para abrir. O CTA fica fora do <button> — link dentro de botão
          é markup inválido e o clique de um comeria o do outro.
        */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group cursor-pointer text-left"
        >
          <span className="flex items-start justify-between gap-4">
            <span className="flex size-9 items-center justify-center rounded-lg bg-(--accent)/12 text-(--accent)">
              <Icon name={card.icon as IconName} className="size-[18px]" />
            </span>
            <Icon
              name="chevron"
              className={`mt-2 size-4 shrink-0 text-ink/35 transition-transform duration-300 group-hover:text-ink/60 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </span>

          <h3 className="mt-6 text-lg text-(--accent)">{card.label}</h3>
          <p className="mt-2 max-w-sm font-serif text-[clamp(19px,2vw,24px)] leading-[1.25] text-ink-bright">
            {card.headline}
          </p>

          <ul className="mt-7 space-y-3">
            {card.bullets.map((bullet) => (
              <li key={bullet.lead} className="flex items-start gap-3 text-[13px] leading-relaxed">
                <Icon
                  name={bullet.icon as IconName}
                  className="mt-px size-3.5 shrink-0 text-(--accent)/80"
                />
                <span className="text-ink/40">
                  <span className="font-semibold text-ink/85">{bullet.lead}</span> {bullet.rest}
                </span>
              </li>
            ))}
          </ul>

          <span className="mt-6 inline-block text-[12px] uppercase tracking-[0.1em] text-ink/35 transition-colors group-hover:text-(--accent)">
            {isOpen ? services.toggle.close : services.toggle.open}
          </span>
        </button>

        {/*
          Acordeão por `grid-template-rows`: de 0fr a 1fr o navegador anima até
          a altura real do conteúdo, o que `height: auto` não faz. Quem esconde
          o excesso é o filho com overflow, não o pai.
        */}
        <div
          id={panelId}
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <ul className="mt-6 divide-y divide-white/6 border-t border-white/8">
              {card.services.map((service) => (
                <li key={service.name} className="py-3.5">
                  <p className="flex items-center gap-2.5 text-[13px] text-ink/85">
                    <span className="size-1 shrink-0 rounded-full bg-(--accent)" />
                    {service.name}
                  </p>
                  <p className="mt-1 pl-[18px] text-[12.5px] leading-relaxed text-ink/40">
                    {service.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <SpecularButton
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          radius={8}
          className="mt-8 w-fit rounded-lg border border-white/8 bg-white/4 px-4 py-2.5 text-[13px] text-ink/80 hover:border-white/20 hover:text-ink"
        >
          {card.ctaIcon && <Icon name={card.ctaIcon} className="size-4" />}
          {card.cta}
        </SpecularButton>
      </div>

      <div className="mx-3 mb-3 overflow-hidden rounded-xl border border-white/6 bg-card-panel">
        <Visual />
      </div>
    </article>
  )
}
