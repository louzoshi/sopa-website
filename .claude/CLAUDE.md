# sopa-website

Site institucional da SOPA — estúdio de criação e engenharia. Página única em
português, fundo escuro, hero em WebGL conduzido por scroll.

## Atribuição — REGRA ABSOLUTA

Nunca cite, mencione ou referencie Claude, Anthropic, "AI", "IA", "gerado por IA"
ou qualquer assistente em **nada** deste repositório. Isso vale para, sem exceção:

- mensagens de commit (sem `Co-Authored-By`, sem trailer de sessão, sem "Generated with")
- títulos e corpo de Pull Requests
- comentários de código, docstrings, TODOs
- CHANGELOG, release notes, documentação
- nomes de branch

O autor de todo o trabalho é o dono do repositório. Escreva como ele escreveria.
`includeCoAuthoredBy` já está desligado em `.claude/settings.json`; mantenha assim.

## Stack

Vite 8 + React 19 + TypeScript + Tailwind CSS v4. Gerenciador: **pnpm**
(fixado em `packageManager`). Lint: oxlint. Sem roteador, sem CMS, sem backend.

```bash
pnpm dev     # http://localhost:5173
pnpm build   # tsc -b && vite build
pnpm lint
```

## Convenções

**Toda a copy vive em `src/data/content.ts`**, exportada por seção (`hero`,
`services`, `faq`, `footer`). Componentes não têm texto embutido — para mudar
qualquer palavra do site, mexa só nesse arquivo.

**O tema vive no `@theme` de `src/index.css`**, não há `tailwind.config`. Cores,
fontes e keyframes entram lá. Utilitários próprios usam `@utility` (e não
`@layer utilities`), senão não aceitam variantes como `md:`.

**Uma seção por arquivo** em `src/sections/`, montadas em `App.tsx`.

## Armadilhas conhecidas

**Translate no Tailwind v4 compõe com `transform` inline.** Os utilitários de
translate usam a propriedade CSS `translate`, que soma ao `transform` em vez de
substituí-lo. Em elementos posicionados por JS (`HeroStory`, dirigido pelo
`useHeroScroll`), não use `-translate-x-1/2` — o deslocamento sai dobrado. Quem
posiciona é o hook.

**Não perca o contexto WebGL no cleanup.** `canvas.getContext('webgl2')` devolve
sempre o mesmo objeto para aquele canvas. Chamar `loseContext()` na limpeza do
efeito quebra a remontagem no StrictMode: o shader não compila mais e a árvore
React cai inteira. O `LightBeam` libera shaders, programa e buffer, e nunca o
contexto.

**Efeitos de scroll leem a posição a cada frame** e devem funcionar nos dois
sentidos — nada de estado acumulado que só avança.
