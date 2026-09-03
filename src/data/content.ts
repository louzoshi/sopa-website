/**
 * Camada de conteúdo — toda a copy do site mora aqui.
 * Texto genérico de partida: ajuste à vontade sem tocar nos componentes.
 */

export const hero = {
  corner: [
    '// flywheel',
    'ideia vira produto > produto vira dado',
    'dado vira decisão > decisão vira próxima ideia',
    '// e o círculo se abre',
  ],
  title: ['Tecnologia com', 'temperatura humana'],
  actions: {
    primary: '▦ Agendar conversa',
    secondary: '⇥ Ver trabalhos',
  },
  subtitle: [
    'A SOPA é um estúdio de criação e engenharia que mistura estratégia, design e código.',
    'Cada entrega alimenta a próxima.',
  ],
  /** Narrativa que atravessa o card enquanto o hero fica preso na viewport. */
  story: {
    paragraphs: [
      'Bons produtos não saem de uma disciplina só. Design sem engenharia vira maquete. Engenharia sem estratégia vira ferramenta sem dono.',
      'Por isso juntamos tudo na mesma panela: pesquisa, marca, interface, código e infraestrutura trabalhando no mesmo ritmo, desde a primeira conversa.',
      'Times pequenos e diretos, com quem decide sentado à mesa. Sem camadas de intermediação, sem entrega jogada por cima do muro.',
      'O que sai daqui é feito para rodar em produção, ser medido e melhorar na semana seguinte.',
    ],
    cta: { label: '▦ Agendar conversa', href: '#contato' },
  },
}

export const services = {
  eyebrow: '02 — serviços',
  title: ['Criação com método.', 'Engenharia sem atalho.'],
  description:
    'Duas frentes que andam juntas desde a primeira conversa: uma decide o que o produto é, a outra coloca ele em produção — medido e fácil de manter.',
  cards: [
    {
      id: 'criacao',
      accent: 'warm',
      icon: 'compass',
      label: 'Criação',
      headline: 'Marca, produto e interface que as pessoas entendem sem manual.',
      bullets: [
        { icon: 'target', lead: 'Estratégia', rest: 'de posicionamento, narrativa e identidade' },
        { icon: 'layers', lead: 'Design', rest: 'de produto, do fluxo ao design system' },
        { icon: 'sparkle', lead: 'Protótipos', rest: 'validados antes de virar código' },
      ],
      cta: 'Agendar conversa',
      visual: 'chart',
    },
    {
      id: 'engenharia',
      accent: 'cool',
      icon: 'code',
      label: 'Engenharia',
      headline: 'Código em produção, com métrica, teste e manutenção previsível.',
      bullets: [
        { icon: 'bolt', lead: 'Front-end', rest: 'moderno, rápido e acessível' },
        { icon: 'cube', lead: 'Back-end e infra', rest: 'integrações sem gambiarra' },
        { icon: 'sparkle', lead: 'Web3 e IA', rest: 'aplicados quando fazem sentido' },
      ],
      cta: 'Ver como trabalhamos',
      visual: 'stack',
    },
  ],
  chart: {
    legend: [
      { label: 'entregue', tone: 'accent' },
      { label: 'planejado', tone: 'dim' },
    ],
    months: ['jan', 'mar', 'mai', 'jul', 'set', 'nov'],
  },
  stack: {
    items: [
      { monogram: 'TS', label: 'typescript' },
      { monogram: 'RE', label: 'react' },
      { monogram: 'NO', label: 'node' },
      { monogram: 'PG', label: 'postgres' },
      { monogram: 'SO', label: 'solidity' },
      { monogram: 'FI', label: 'figma' },
    ],
  },
} as const

export const faq = {
  eyebrow: 'faq',
  title: ['Perguntas', 'frequentes'],
  description: 'Respostas rápidas sobre escopo, prazo, custo e o que acontece depois do lançamento.',
  items: [
    {
      icon: 'compass',
      question: 'Como começa um projeto com a SOPA?',
      answer:
        'Começa com uma conversa de mais ou menos uma hora para entender contexto, prazo e orçamento. Em seguida enviamos uma proposta com escopo, etapas e valores. Aprovada a proposta, o time entra na semana seguinte.',
    },
    {
      icon: 'clock',
      question: 'Quanto tempo leva uma entrega?',
      answer:
        'Um site institucional costuma levar de 4 a 6 semanas. Produtos digitais mais completos ficam entre 3 e 6 meses, divididos em ciclos curtos com entregas visíveis a cada duas semanas.',
    },
    {
      icon: 'doc',
      question: 'Vocês trabalham com projeto fechado ou por retainer?',
      answer:
        'Os dois. Projetos com escopo bem definido saem por valor fechado. Quando a demanda é contínua, um retainer mensal com time dedicado costuma sair mais barato e mais rápido.',
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
        'Um canal direto no Slack ou WhatsApp, uma call semanal de acompanhamento e um board público com o que está em andamento. Sem intermediário entre quem decide e quem executa.',
    },
    {
      icon: 'cube',
      question: 'Vocês assumem projeto que já está no meio do caminho?',
      answer:
        'Sim. Começamos com uma leitura do código e do design existentes, apontamos o que dá para aproveitar e o que precisa ser refeito, e só então propomos um plano.',
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
  cta: { label: '▦ Agendar conversa', href: 'mailto:oi@sopa.team' },
  links: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'GitHub', href: '#' },
  ],
  legal: `© SOPA · ${new Date().getFullYear()}`,
  policies: [
    { label: 'Termos', href: '#' },
    { label: 'Privacidade', href: '#' },
  ],
} as const
