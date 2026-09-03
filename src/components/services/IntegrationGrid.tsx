import { services } from '../../data/content'
import { Icon } from '../Icon'

const PER_ROW = 3

/**
 * Grade de integrações do card de Automação: as ferramentas com que o agente
 * conversa, três por fileira, ladeadas por tiles hachurados vazios que sangram
 * para fora do painel — a lista não termina no que cabe na tela.
 *
 * Só a hachura é cortada pela máscara; os tiles com conteúdo ficam sempre
 * inteiros. Abaixo de `md` os vazios somem e sobram as três colunas cheias.
 */
export function IntegrationGrid() {
  const items = services.integrations
  const rows = Array.from({ length: Math.ceil(items.length / PER_ROW) }, (_, i) =>
    items.slice(i * PER_ROW, (i + 1) * PER_ROW),
  )

  return (
    <div className="h-[372px] overflow-hidden p-4 md:mask-fade-x">
      <div
        className="grid h-full grid-cols-3 gap-3 md:-mx-14 md:grid-cols-5"
        style={{ gridTemplateRows: `repeat(${rows.length}, minmax(0, 1fr))` }}
      >
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex} items={row} />
        ))}
      </div>
    </div>
  )
}

function Row({ items }: { items: (typeof services.integrations)[number][] }) {
  return (
    <>
      <EmptyTile />
      {items.map((item) => (
        <Tile key={item.label} monogram={item.monogram} label={item.label} />
      ))}
      <EmptyTile />
    </>
  )
}

function Tile({ monogram, label }: { monogram: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 rounded-xl border border-white/6 bg-white/2 px-2 py-3">
      <span className="flex size-10 items-center justify-center rounded-full bg-(--accent)/15 text-xs font-semibold tracking-[0.06em] text-(--accent)">
        {monogram}
      </span>
      <span className="flex w-full min-w-0 items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.06em] text-ink/35 md:text-[10px] md:tracking-[0.12em]">
        <span className="truncate">{label}</span>
        <Icon name="check" className="hidden size-3 shrink-0 text-(--accent)/70 md:block" />
      </span>
    </div>
  )
}

/** Só aparece a partir de `md`, onde a grade sangra para fora do painel. */
function EmptyTile() {
  return <div className="hidden rounded-xl border border-white/5 bg-hatch md:block" aria-hidden />
}
