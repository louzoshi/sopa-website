# SOPA — Website

Site institucional da SOPA, estúdio de criação e engenharia. Página única em
português, fundo escuro, com um hero em WebGL que conduz a narrativa por scroll.

## Stack

| Pacote | Papel |
|---|---|
| Vite 8 | build e dev server |
| React 19 | UI |
| TypeScript | tipos em tudo |
| Tailwind CSS v4 | estilo, via `@tailwindcss/vite` (sem arquivo de config — o tema mora no `@theme` do `src/index.css`) |
| oxlint | lint |
| WebGL2 + Canvas 2D | efeitos do hero e do footer, sem biblioteca |

Sem roteador, sem CMS, sem backend: tudo é estático e o conteúdo vem de um
módulo TypeScript.

## Rodar

Requer **Node >= 20.19** e **pnpm** (fixado em `packageManager`; se não estiver
instalado, `corepack enable` resolve).

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc -b && vite build  -> dist/
pnpm preview    # serve o dist/ para conferir o build
pnpm lint       # oxlint
```

## Estrutura

```
src/
├── App.tsx                # monta as seções na ordem da página
├── data/content.ts        # TODA a copy do site
├── sections/              # uma seção por arquivo
│   ├── Hero.tsx           # hero com scrollytelling
│   ├── Services.tsx       # dois cards com painel visual
│   ├── Faq.tsx            # acordeão em pills
│   └── Footer.tsx         # CTA + palavra gigante + feixe
├── components/
│   ├── SectionHeading.tsx    # eyebrow + título serifado (à esquerda ou centrado)
│   ├── Icon.tsx              # ícones em traço, herdam currentColor
│   ├── hero/
│   │   ├── LightBeam.tsx     # feixe de luz em WebGL2 (usado no hero E no footer)
│   │   ├── beamShaders.ts    # vertex + fragment shader do feixe
│   │   ├── ShapesField.tsx   # hexágonos em wireframe (canvas 2D)
│   │   └── HeroStory.tsx     # narrativa que atravessa o card
│   └── services/
│       ├── DeliveryChart.tsx # barras entregue/planejado
│       └── StackGrid.tsx     # grade do stack, sangra nas laterais em md+
├── hooks/useHeroScroll.ts # todo o comportamento de scroll do hero
└── index.css              # @theme (cores, fontes, keyframes) + @utility próprios
```

## As seções

A página é `Hero → Serviços → FAQ → Footer`. Os CTAs apontam para as âncoras
`#servicos`, `#faq` e `#contato` (esta última é o próprio footer).

### Hero

Cinco camadas empilhadas dentro de um card, de baixo para cima:

1. **gradiente** escuro do card (`--color-hero-top/mid/bot`)
2. **ShapesField** — hexágonos concêntricos girando devagar, com máscara radial
   (`mask-shapes-field`) que apaga as bordas
3. **LightBeam** — shader WebGL2: uma linha central ondulante vira intensidade;
   a dispersão de prisma varre offsets verticais coloridos, e camadas de névoa
   tingem o fundo de quente (esquerda) a frio (direita)
4. **conteúdo inicial** — logo, título, botões e subtítulo
5. **HeroStory** — a narrativa que atravessa o card

`useHeroScroll` roda um único loop de animação e dirige as quatro etapas a
partir da posição de scroll dentro do track de `520vh`:

| etapa | faixa do track | o que faz |
|---|---|---|
| bordas fecham | 0 → 0.35 | `--p` (0→1) alimenta o `padding` e o `border-radius`; o preto do fundo aparece por trás e o card "se solta" das bordas |
| título some | 0.14 → 0.24 | `--hc` (1→0) apaga o conteúdo inicial e o desloca 40px para cima |
| narrativa passa | 0.18 → 0.96 | o bloco de texto sobe de baixo para cima; o feixe fica parado, daí o parallax |
| spotlight | contínuo | cada parágrafo acende ao chegar no centro da viewport e apaga ao sair |

Tudo é recalculado a cada frame a partir do scroll, então o efeito acompanha a
rolagem **nos dois sentidos**. A distância percorrida pela narrativa é medida
para que o último bloco (o CTA) termine centralizado, em vez de passar direto.

> **Cuidado ao mexer no `HeroStory`:** no Tailwind v4 os utilitários de translate
> usam a propriedade `translate`, que **compõe** com o `transform` inline em vez
> de substituí-lo. Quem posiciona o bloco é o hook — não adicione
> `-translate-x-1/2` lá, ou o deslocamento em X sai dobrado.

### Serviços

Dois cards, cada um com um acento próprio: âmbar para **Criação**, azul para
**Engenharia**. O card define `--accent` inline e os filhos consomem via
`bg-(--accent)/12`, `text-(--accent)`… — assim os painéis não precisam saber de
qual card são. Cada card tem rótulo, headline, três bullets com ícone, um CTA e
um painel visual no rodapé:

- `DeliveryChart` — barras "planejado" com a fatia "entregue" crescendo por
  dentro. Os dados vêm de uma função determinística (seno como pseudo-ruído,
  sem `Math.random`), então o gráfico é idêntico em todo render.
- `StackGrid` — tiles com monograma, ladeados por tiles hachurados que sangram
  para fora do painel. No mobile vira 3 colunas sem sangramento.

### FAQ

Acordeão em pills, um item aberto por vez, nenhum aberto no início. A altura da
resposta é animada por `grid-template-rows` (`0fr` → `1fr`), e `aria-expanded` +
`aria-controls` ligam o botão à resposta. Cada pergunta tem seu ícone.

### Footer

Mesmas camadas do hero, com o **mesmo** `LightBeam` — só muda a ancoragem da
faixa (`bottom-[-6%] h-[70%]` em vez de `top-[6%] h-[88%]`). Atrás dele, a
palavra da marca em corpo gigante: preenchimento transparente e contorno fino
(`-webkit-text-stroke`), com uma segunda cópia por cima que acende num pulso
lento (`animate-breathe`).

## Ajustar conteúdo

**Todo** o texto do site está em `src/data/content.ts`, exportado por seção
(`hero`, `services`, `faq`, `footer`). Nenhum componente tem texto embutido —
para mudar a copy, os itens do FAQ, os bullets dos cards ou os links do rodapé,
mexa só nesse arquivo.

## Tema

`src/index.css` concentra as decisões visuais no bloco `@theme`:

- **cores** — `hero-top/mid/bot` (gradiente do card), `frame` (preto do fundo),
  `ink` / `ink-bright` (texto), `surface` / `surface-raised` / `card` /
  `card-panel` (fundos), `accent-warm` / `accent-cool` / `accent-mint`
  (acentos por seção), `stroke` / `stroke-glow` (contorno do footer)
- **fontes** — `font-mono` no corpo, `font-serif` nos títulos
- **animação** — `animate-breathe`, o pulso da palavra do footer

Os utilitários próprios ficam fora do `@theme`, declarados com `@utility` para
que aceitem variantes (`md:mask-fade-x`): `mask-shapes-field` (máscara radial do
campo de hexágonos), `mask-fade-x` (fade lateral da grade do stack) e `bg-hatch`
(hachura diagonal dos tiles vazios).

## Estado atual

Todas as quatro seções estão construídas e responsivas (checadas em 1440px e
390px). O que ainda é placeholder e deve ser trocado antes de publicar:

- **a copy inteira é genérica** — textos, perguntas do FAQ e descrições de
  serviço foram escritos como ponto de partida
- **links sociais apontam para `#`** e o e-mail `oi@sopa.team` é fictício
- **os dados do `DeliveryChart` são sintéticos**, não refletem entregas reais
- não há analytics, formulário de contato, testes nem versão em inglês
