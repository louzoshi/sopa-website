import { services } from '../../data/content'

/**
 * Grade de trabalhos do card de Criação: quatro sites no ar, cada um abrindo
 * em outra aba.
 *
 * O print é resolvido por `slug`, não por caminho escrito à mão: o glob abaixo
 * varre `src/assets/trabalhos` em build time e casa `<slug>.<ext>`. Quem ainda
 * não tem arquivo cai no placeholder hachurado — assim dá para publicar um
 * print de cada vez só soltando a imagem na pasta.
 */
const SHOTS = import.meta.glob('../../assets/trabalhos/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

const shotFor = (slug: string) =>
  Object.entries(SHOTS).find(([path]) => path.includes(`/${slug}.`))?.[1]

export function WorkGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {services.works.map((work) => {
        const shot = shotFor(work.slug)

        return (
          <a
            key={work.slug}
            href={work.href}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <div className="aspect-16/10 overflow-hidden rounded-lg border border-white/6 bg-white/2 transition-colors group-hover:border-(--accent)/40">
              {shot ? (
                <img
                  src={shot}
                  alt={`Print do site ${work.name}`}
                  loading="lazy"
                  className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <span className="flex size-full items-center justify-center bg-hatch text-[10px] tracking-[0.08em] text-ink/25">
                  {new URL(work.href).hostname.replace('www.', '')}
                </span>
              )}
            </div>

            <p className="mt-2 flex items-center gap-1.5 text-[12px] text-ink/45 transition-colors group-hover:text-ink">
              {work.name}
              <span aria-hidden className="text-[11px] text-ink/30 group-hover:text-(--accent)">
                ↗
              </span>
            </p>
          </a>
        )
      })}
    </div>
  )
}
