import { services } from '../../data/content'
import { Icon } from '../Icon'

/**
 * Grade do stack: duas fileiras de tiles com monograma, ladeadas por tiles
 * hachurados vazios que sangram para fora do painel — só a hachura é cortada,
 * os tiles com conteúdo ficam sempre inteiros.
 */
export function StackGrid() {
  const items = services.stack.items
  const rows = [items.slice(0, 3), items.slice(3, 6)]

  return (
    <div className="h-full overflow-hidden p-4 md:mask-fade-x">
      <div className="grid h-full grid-cols-3 gap-3 md:-mx-14 md:grid-cols-5">
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex} items={row} />
        ))}
      </div>
    </div>
  )
}

function Row({ items }: { items: (typeof services.stack.items)[number][] }) {
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
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-white/6 bg-white/2 px-2 py-4">
      <span className="flex size-11 items-center justify-center rounded-full bg-(--accent)/15 text-xs font-semibold tracking-[0.06em] text-(--accent)">
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
