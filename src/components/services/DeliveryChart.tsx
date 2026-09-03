import { services } from '../../data/content'

const BARS = 46

/**
 * Curva determinística de entrega: cada barra tem a altura total (planejado) e,
 * por dentro, a fatia já entregue crescendo da esquerda para a direita.
 * Sem `Math.random` — o gráfico é o mesmo em todo render.
 */
const noise = (i: number) => {
  const v = Math.sin(i * 12.9898) * 43758.5453
  return v - Math.floor(v)
}

const bars = Array.from({ length: BARS }, (_, i) => {
  const t = i / (BARS - 1)
  const delivered = Math.min(1, Math.max(0.03, Math.pow(t, 2.1) + 0.03 * noise(i)))
  const planned = 0.92 + 0.08 * noise(i + 7)
  return { delivered, planned }
})

export function DeliveryChart() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-5 px-4 pt-4">
        {services.chart.legend.map((entry) => (
          <span
            key={entry.label}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-ink/35"
          >
            <span
              className={`size-1.5 rounded-full ${
                entry.tone === 'accent' ? 'bg-(--accent)' : 'bg-ink/25'
              }`}
            />
            {entry.label}
          </span>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 items-end gap-[2px] px-4 pt-5">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="relative flex-1 rounded-[1px] bg-(--accent)/22"
            style={{ height: `${bar.planned * 100}%` }}
          >
            <div
              className="absolute inset-x-0 bottom-0 rounded-[1px] bg-(--accent)"
              style={{ height: `${bar.delivered * 100}%` }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between px-4 pb-4 pt-3 text-[10px] uppercase tracking-[0.14em] text-ink/25">
        {services.chart.months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  )
}
