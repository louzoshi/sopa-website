/**
 * Camada de conteúdo — toda a copy do site mora aqui.
 * Texto genérico de partida: ajuste à vontade sem tocar nos componentes.
 */

/**
 * Contato — todo botão de "entre em contato" do site sai daqui.
 * `whatsapp` é só dígitos, no formato internacional: 55 + DDD + número.
 */
export const contact = {
  // número de teste — trocar pelo da SOPA antes de publicar
  whatsapp: '5521999123641',
  message: 'Oi! Vim pelo site da SOPA e quero conversar sobre um projeto.',
} as const

/** Link pronto do WhatsApp, com a mensagem já digitada na conversa. */
export const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  contact.message,
)}`

export const hero = {
  corner: [
    '// flywheel',
    'ideia vira produto > produto vira dado',
    'dado vira decisão > decisão vira próxima ideia',
    '// e o círculo se abre',
  ],
  title: ['Sopa', 'Agency'],
  actions: {
    primary: 'Entre em contato',
    secondary: '⇥ Ver trabalhos',
  },
  subtitle: [
    'A SOPA é um estúdio de criação e engenharia que mistura estratégia, design e código.',
    'Cada entrega alimenta a próxima.',
  ],
  /** Texto único que atravessa o card enquanto o hero fica preso na viewport. */
  story: {
    body:
      'A SOPA é um estúdio de criação e engenharia: pesquisa, marca, interface, ' +
      'código e infraestrutura na mesma equipe, do primeiro rascunho ao que entra ' +
      'em produção. Times pequenos, contato direto com quem decide e entregas que ' +
      'são medidas e melhoradas na semana seguinte.',
    cta: { label: 'Entre em contato', href: whatsappUrl },
  },
}

export const services = {
  eyebrow: '02 — serviços',
  title: ['Criação com método.', 'Automação sem atalho.'],
  description:
    'Duas frentes que andam juntas desde a primeira conversa: uma coloca seu negócio de pé na internet, a outra faz o atendimento acontecer sozinho no WhatsApp.',
  /** Rótulos do botão que abre e fecha a lista de serviços de cada card. */
  toggle: { open: 'Ver os serviços', close: 'Fechar' },
  cards: [
    {
      id: 'criacao',
      accent: 'warm',
      icon: 'compass',
      label: 'Criação',
      headline: 'Site, loja e marca que explicam seu negócio sem precisar de manual.',
      bullets: [
        { icon: 'globe', lead: 'Sites', rest: 'institucionais, landing pages e lojas' },
        { icon: 'target', lead: 'Marca', rest: 'do posicionamento à identidade visual' },
        { icon: 'layers', lead: 'Design', rest: 'de produto, do fluxo ao design system' },
      ],
      /** Lista que aparece quando o card é aberto. */
      services: [
        {
          name: 'Landing page',
          detail:
            'Uma página só, feita para converter: oferta, prova e um caminho claro até o contato.',
        },
        {
          name: 'Site institucional',
          detail:
            'Quem você é, o que faz e como te encontram — no ar rápido e fácil de atualizar depois.',
        },
        {
          name: 'Loja virtual',
          detail: 'Catálogo, carrinho e checkout ligados ao seu meio de pagamento e ao estoque.',
        },
        {
          name: 'Identidade visual',
          detail: 'Logo, cores, tipografia e um manual curto para o time usar sem errar.',
        },
        {
          name: 'Design de produto',
          detail: 'Fluxo, telas e protótipo navegável validados antes de virar código.',
        },
      ],
      cta: 'Entre em contato',
      ctaIcon: 'whatsapp',
      visual: 'works',
    },
    {
      id: 'automacao',
      accent: 'cool',
      icon: 'shuffle',
      label: 'Automação',
      headline: 'Seu WhatsApp respondendo, qualificando e vendendo sem você por perto.',
      bullets: [
        { icon: 'bolt', lead: 'Atendimento', rest: 'que responde em segundos, 24 horas' },
        { icon: 'sparkle', lead: 'Agente de IA', rest: 'treinado no seu negócio e no seu tom' },
        { icon: 'cube', lead: 'Integração', rest: 'com CRM, ERP e o que você já usa' },
      ],
      services: [
        {
          name: 'Atendimento automático',
          detail:
            'As perguntas que mais se repetem já saem respondidas, a qualquer hora do dia.',
        },
        {
          name: 'Agente de IA',
          detail:
            'Lê o que o cliente escreveu, responde no seu tom e chama uma pessoa quando trava.',
        },
        {
          name: 'Qualificação de lead',
          detail:
            'A conversa faz as perguntas certas e entrega o contato pronto para o vendedor.',
        },
        {
          name: 'Disparo em massa',
          detail: 'Campanhas e avisos pela API oficial do WhatsApp, sem risco de bloqueio.',
        },
        {
          name: 'Integração com seus sistemas',
          detail: 'O que acontece na conversa cai sozinho no CRM, no ERP ou na planilha.',
        },
        {
          name: 'Follow-up automático',
          detail: 'Carrinho abandonado, lembrete de consulta, cobrança e pesquisa pós-venda.',
        },
      ],
      cta: 'Entre em contato',
      ctaIcon: 'whatsapp',
      visual: 'integrations',
    },
  ],
  /**
   * Trabalhos no ar, mostrados no card de Criação.
   *
   * O print é opcional: enquanto não existir, o slot aparece como placeholder
   * hachurado com o domínio escrito. Para publicar um, salve a imagem em
   * `src/assets/trabalhos/<slug>.png` (webp e jpg também servem) — o componente
   * acha o arquivo pelo slug sozinho, sem precisar mexer aqui.
   */
  works: [
    { slug: 'nogglesboard', name: 'Noggles Board', href: 'https://www.nogglesboard.wtf/' },
    { slug: 'gnars', name: 'Gnars', href: 'https://gnars.com/' },
    { slug: 'swaps', name: 'Swaps', href: 'https://www.swaps.pro/' },
    { slug: 'slop', name: 'Slop', href: 'https://www.slop.fi/' },
  ],
  /**
   * Integrações do card de Automação: ferramentas que o cliente reconhece e já
   * usa, não a stack de quem constrói. Três por fileira — as pontas de cada
   * fileira sangram para fora do painel, sugerindo que a lista não acaba aqui.
   */
  integrations: [
    { monogram: 'WA', label: 'whatsapp' },
    { monogram: 'IG', label: 'instagram' },
    { monogram: 'RD', label: 'rd station' },
    { monogram: 'HS', label: 'hubspot' },
    { monogram: 'PD', label: 'pipedrive' },
    { monogram: 'BL', label: 'bling' },
    { monogram: 'OM', label: 'omie' },
    { monogram: 'GS', label: 'planilhas' },
    { monogram: 'GC', label: 'agenda' },
  ],
} as const

export const faq = {
  eyebrow: 'faq',
  title: ['Perguntas', 'frequentes'],
  description:
    'O que costumam perguntar antes de fechar: como começa, quanto tempo leva, como é o contrato e quem toca o projeto depois que ele entra no ar.',
  items: [
    {
      icon: 'compass',
      question: 'Como começa um projeto com a SOPA?',
      answer:
        'Começa com uma conversa de mais ou menos 20 minutos para apresentar o preview do projeto e alinhar prazo e orçamento. Aprovada a proposta, o time produz o que falta e envia o projeto no mesmo dia.',
    },
    {
      icon: 'clock',
      question: 'Quanto tempo leva uma entrega?',
      answer:
        'Um site institucional costuma levar algumas horas. Produtos digitais mais robustos ficam prontos em até um dia, sempre a partir do preview aprovado na conversa inicial.',
    },
    {
      icon: 'doc',
      question: 'Dá para contratar por projeto ou o time fica comigo todo mês?',
      answer:
        'Os dois. Escopo definido sai por valor fechado, entregue de uma vez. Quando a demanda é contínua, existe um plano mensal com time à disposição — você manda a prioridade da semana e ela entra na fila.',
    },
    {
      icon: 'sparkle',
      question: 'Preciso ter a marca pronta antes de chamar vocês?',
      answer:
        'Não. Se já existe, trabalhamos em cima do que está de pé. Se não existe, a frente de estratégia e marca cuida disso antes do design de produto começar.',
    },
    {
      icon: 'shuffle',
      question: 'Quem cuida do site depois que ele entra no ar?',
      answer:
        'Você decide. Entregamos o código documentado para o seu time assumir, ou seguimos com um plano de manutenção e evolução contínua.',
    },
    {
      icon: 'globe',
      question: 'Vocês atendem fora do Brasil?',
      answer:
        'Sim. O time é remoto e já atendeu clientes em outros fusos. Reuniões em português ou inglês, sem problema.',
    },
    {
      icon: 'users',
      question: 'Como funciona o dia a dia com o time de vocês?',
      answer:
        'Um canal direto no WhatsApp para o dia a dia e uma call no Google Meet a cada entrega, para alinhar prioridades e mostrar o que já está de pé. Sem intermediário entre quem decide e quem executa.',
    },
    {
      icon: 'cube',
      question: 'Vocês assumem projeto que já está no meio do caminho?',
      answer:
        'Sim. Começamos com uma leitura do código e do design que já existem e alinhamos com você o que está e o que não está de acordo. Daí sai um plano claro: o que dá para aproveitar, o que precisa ser refeito e um prazo tão curto quanto o de um projeto começado do zero.',
    },
  ],
} as const

export const footer = {
  /** Palavra gigante em contorno, ancorada no rodapé. */
  wordmark: 'SOPA',
  title: ['Bom trabalho', 'continua rendendo'],
  lede: [
    'A SOPA transforma estratégia, design e código em produtos que podem ser',
    'medidos, mantidos e melhorados com o tempo.',
  ],
  cta: { label: 'Entre em contato', href: whatsappUrl },
  /** Links externos (href com http) abrem em outra aba; '#' fica como placeholder. */
  links: [
    // sem perfil ainda: manda pro Instagram e pronto
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/sopa-agency/?viewAsMember=true' },
    { label: 'GitHub', href: 'https://github.com/sopa-agency' },
  ],
  legal: `© SOPA · ${new Date().getFullYear()}`,
  /** '#' = ainda sem página: o rótulo aparece como texto, sem virar link. */
  policies: [
    { label: 'Termos', href: '#' },
    { label: 'Privacidade', href: '#' },
  ],
} as const
