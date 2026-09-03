import type { CSSProperties } from 'react'

import { Icon, type IconName } from '../components/Icon'
import { SectionHeading } from '../components/SectionHeading'
import { DeliveryChart } from '../components/services/DeliveryChart'
import { StackGrid } from '../components/services/StackGrid'
import { services } from '../data/content'

const ACCENTS = {
  warm: 'var(--color-accent-warm)',
  cool: 'var(--color-accent-cool)',
} as const

const VISUALS = {
  chart: DeliveryChart,
  stack: StackGrid,
} as const

type Card = (typeof services.cards)[number]

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

        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          {services.cards.map((card) => (
            <ServiceCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ card }: { card: Card }) {
  const Visual = VISUALS[card.visual]

  return (
    <article
      className="flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-card"
      style={{ '--accent': ACCENTS[card.accent] } as CSSProperties}
    >
      <div className="flex flex-1 flex-col p-8">
        <span className="flex size-9 items-center justify-center rounded-lg bg-(--accent)/12 text-(--accent)">
          <Icon name={card.icon as IconName} className="size-[18px]" />
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

        <a
          href="#contato"
          className="mt-8 inline-flex w-fit items-center rounded-lg border border-white/8 bg-white/4 px-4 py-2.5 text-[13px] text-ink/80 transition-colors hover:border-white/20 hover:text-ink"
        >
          {card.cta}
        </a>
      </div>

      <div className="mx-3 mb-3 h-[250px] overflow-hidden rounded-xl border border-white/6 bg-card-panel">
        <Visual />
      </div>
    </article>
  )
}
