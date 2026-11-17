import ttDashboard from '../assets/projects/time-tracker/timetracker__dashboard.webp';
import ttTimer from '../assets/projects/time-tracker/timetracker__timer.webp';
import ttTasks from '../assets/projects/time-tracker/timetracker__tasks.webp';
import ttCalendar from '../assets/projects/time-tracker/timetracker__calendar.webp';
import ttHistory from '../assets/projects/time-tracker/timetracker__history.webp';
import ttAdmin from '../assets/projects/time-tracker/timetracker__admin.webp';
import ttProfile from '../assets/projects/time-tracker/timetracker__profile.webp';
import ttWhiteTheme from '../assets/projects/time-tracker/timetracker__whitetheme.webp';
import ttSupport from '../assets/projects/time-tracker/timetracker__support.webp';

import aiGemini from '../assets/projects/ai-assistant-integrator/chatbot__gemini.webp';
import aiGroq from '../assets/projects/ai-assistant-integrator/chatbot__groq.webp';
import aiOzlo from '../assets/projects/ai-assistant-integrator/chatbot__ozlo.webp';
import aiStats from '../assets/projects/ai-assistant-integrator/chatbot__stats.webp';
import aiConfig from '../assets/projects/ai-assistant-integrator/chatbot__config.webp';
import aiLight from '../assets/projects/ai-assistant-integrator/chatbot__light.webp';
import aiAccessibility from '../assets/projects/ai-assistant-integrator/chatbot_accessibility.webp';

import cwuSpecs from '../assets/projects/cwu-app/cwu__specs.webp';
import cwuDrivers from '../assets/projects/cwu-app/cwu__drivers.webp';
import cwuSoftware from '../assets/projects/cwu-app/cwu__software.webp';
import cwuBoost from '../assets/projects/cwu-app/cwu__boost.webp';
import cwuCompetitive from '../assets/projects/cwu-app/cwu__competitive.webp';
import cwuMonitor from '../assets/projects/cwu-app/cwu__monitor.webp';
import cwuLogs from '../assets/projects/cwu-app/cwu__logs.webp';
import cwuVersions from '../assets/projects/cwu-app/cwu__versions.webp';
import cwuThemes from '../assets/projects/cwu-app/cwu__themes.webp';

export interface ScreenshotItem {
  id: string;
  tag: string;
  title: string;
  route: string;
  caption: string;
  src: string;
}

export const TIME_TRACKER_SCREENS: ScreenshotItem[] = [
  {
    id: 'dashboard',
    tag: 'MÉTRICAS',
    title: 'Painel Geral & Distribuição de Horas',
    route: 'time-trackerigena.vercel.app/dashboard',
    caption: 'Métricas analíticas em tempo real: proporção de horas por categoria (Empresa vs. Autônomo), gráfico semanal de produtividade e apuração de tempo por tarefa.',
    src: ttDashboard,
  },
  {
    id: 'timer',
    tag: 'PRODUTIVIDADE',
    title: 'Cronômetro Ativo & Sessões em Tempo Real',
    route: 'time-trackerigena.vercel.app/timer',
    caption: 'Interface de disparo com contagem precisa de horas, seleção rápida de categoria/projeto e persistência de sessão contra recarregamentos.',
    src: ttTimer,
  },
  {
    id: 'tasks',
    tag: 'FLUXO PRINCIPAL',
    title: 'Gerenciamento Modular de Projetos e Tarefas',
    route: 'time-trackerigena.vercel.app/tasks',
    caption: 'Cadastro de categorias, projetos e tarefas com parametrização de moedas (€ EUR / R$ BRL), valor por hora e horas orçadas.',
    src: ttTasks,
  },
  {
    id: 'calendar',
    tag: 'PLANEJAMENTO',
    title: 'Calendário de Compromissos & Prazos',
    route: 'time-trackerigena.vercel.app/calendar',
    caption: 'Visão mensal de entregas com tags semânticas coloridas: Aguardando Cliente, Em Andamento, Em Revisão, Prazo e Entregue.',
    src: ttCalendar,
  },
  {
    id: 'history',
    tag: 'FATURAMENTO',
    title: 'Histórico Detalhado & Registros de Sessões',
    route: 'time-trackerigena.vercel.app/history',
    caption: 'Tabela analítica com histórico cronológico de apontamentos, duração exata, notas de trabalho e separação por faturamento.',
    src: ttHistory,
  },
  {
    id: 'admin',
    tag: 'ADMINISTRAÇÃO',
    title: 'Painel de Administração & Gestão de Acessos',
    route: 'time-trackerigena.vercel.app/admin/users',
    caption: 'Controle de usuários com atribuição de papéis (Administrador / Membro), ativação de contas e auditoria do sistema.',
    src: ttAdmin,
  },
  {
    id: 'profile',
    tag: 'CONFIGURAÇÕES',
    title: 'Perfil do Operador & Credenciais de Segurança',
    route: 'time-trackerigena.vercel.app/profile',
    caption: 'Edição de identidade do desenvolvedor, envio de foto de perfil, dados de contato e fluxo seguro de redefinição de credenciais.',
    src: ttProfile,
  },
  {
    id: 'whitetheme',
    tag: 'ACESSIBILIDADE',
    title: 'Tema Claro & Menu de Acessibilidade Visual',
    route: 'time-trackerigena.vercel.app/tasks?theme=light',
    caption: 'Alternância completa para modo claro com alto contraste, zoom de texto ajustável (A- / A+), fonte alternativa e compatibilidade com leitores.',
    src: ttWhiteTheme,
  },
  {
    id: 'support',
    tag: 'SUPORTE TÉCNICO',
    title: 'Central de Suporte & Chamados Internos',
    route: 'time-trackerigena.vercel.app/admin/support',
    caption: 'Sistema integrado de tíquetes com fila de chamados (Novos, Em Andamento, Resolvidos) e mensageria direta com administradores.',
    src: ttSupport,
  },
];

export const AI_ASSISTANT_SCREENS: ScreenshotItem[] = [
  {
    id: 'gemini',
    tag: 'TRANSMISSÃO SSE',
    title: 'Interface de Conversação & Transmissão Gemini',
    route: 'chatbot-ia-rose.vercel.app/?provider=gemini',
    caption: 'Chat interativo com consumo contínuo de dados via Server-Sent Events (SSE) da API Google Gemini, com renderização reativa de Markdown e destaque de sintaxe.',
    src: aiGemini,
  },
  {
    id: 'groq',
    tag: 'ALTA VELOCIDADE',
    title: 'Inferência Ultrarrápida com Groq Llama',
    route: 'chatbot-ia-rose.vercel.app/?provider=groq',
    caption: 'Orquestração de modelos com o motor de inferência Groq Llama, operando em alta cadência de tokens/segundo com monitoramento de latência em tempo real.',
    src: aiGroq,
  },
  {
    id: 'ozlo',
    tag: 'IA RESIDENTE',
    title: 'Ozlo: Chatbot Orgânico & Contingência Resiliente',
    route: 'chatbot-ia-rose.vercel.app/?provider=ozlo',
    caption: 'Assistente residente autônomo acionado de forma inteligente via mecanismo de contingência em caso de instabilidade de rede ou esgotamento de cota em APIs externas.',
    src: aiOzlo,
  },
  {
    id: 'stats',
    tag: 'TELEMETRIA',
    title: 'Painel de Métricas & Monitor de Latência',
    route: 'chatbot-ia-rose.vercel.app/analytics',
    caption: 'Telemetria em tempo real: Tempo até Primeiro Token, contagem de tokens por segundo gerados, gráfico de latência comparativa e registros analíticos.',
    src: aiStats,
  },
  {
    id: 'config',
    tag: 'GOVERNANÇA',
    title: 'Painel de Configuração & Chaves de API',
    route: 'chatbot-ia-rose.vercel.app/settings',
    caption: 'Gerenciamento seguro de provedores de IA, seleção de temperatura, modelos dinâmicos e persistência segura em armazenamento local.',
    src: aiConfig,
  },
  {
    id: 'light',
    tag: 'SISTEMA VISUAL',
    title: 'Modo Claro & Refinamento Cromático',
    route: 'chatbot-ia-rose.vercel.app/?theme=light',
    caption: 'Sistema visual adaptativo em tema claro com bordas finas, paleta Studio Noir e contraste conforme diretrizes WCAG AA.',
    src: aiLight,
  },
  {
    id: 'accessibility',
    tag: 'ACESSIBILIDADE',
    title: 'Menu de Acessibilidade & Suporte Auditivo/Visual',
    route: 'chatbot-ia-rose.vercel.app/?a11y=open',
    caption: 'Controles dedicados de acessibilidade: ajuste tipográfico, modo alto contraste, conversão texto-para-fala e navegação estruturada via teclado.',
    src: aiAccessibility,
  },
];

export const CWU_APP_SCREENS: ScreenshotItem[] = [
  {
    id: 'specs',
    tag: 'DIAGNÓSTICO',
    title: 'System Specs & Nota do PC',
    route: 'cwu-app://system-specs',
    caption: 'Leitura real de CPU, GPU, RAM e discos com nota de 0 a 10 por componente e vida útil de cada SSD, NVMe e HD pelos contadores SMART do Windows.',
    src: cwuSpecs,
  },
  {
    id: 'drivers',
    tag: 'DRIVERS',
    title: 'Scanner de Drivers com Atualizações Reais',
    route: 'cwu-app://scan-drivers',
    caption: 'Dispositivos com erro, drivers genéricos e atualizações conferidas no Windows Update e no serviço oficial da NVIDIA, em tabela ordenável e com links diretos do fabricante.',
    src: cwuDrivers,
  },
  {
    id: 'software',
    tag: 'PÓS-FORMATAÇÃO',
    title: 'Catálogo de Programas & Instalação em Lote',
    route: 'cwu-app://post-format-software',
    caption: 'Sugestões de programas pós-formatação já marcadas, detecção do que está instalado e instalação de vários de uma vez pelo winget.',
    src: cwuSoftware,
  },
  {
    id: 'boost',
    tag: 'BOOST GAMER',
    title: 'Otimizações Explicadas e Reversíveis',
    route: 'cwu-app://gamer-boost',
    caption: 'Baixa latência NVIDIA/AMD, limpeza de memória e plano de energia, cada ajuste com o passo a passo do que faz. Toda alteração fica registrada para ser desfeita.',
    src: cwuBoost,
  },
  {
    id: 'competitive',
    tag: 'INPUT LAG',
    title: 'Modo Competitivo: Monitor, Mouse & Energia',
    route: 'cwu-app://gamer-boost/competitive',
    caption: 'Taxa máxima do monitor, aceleração e velocidade 1:1 do mouse, teste de polling rate, overlays em execução e economia de energia de CPU e USB.',
    src: cwuCompetitive,
  },
  {
    id: 'monitor',
    tag: 'TEMPO REAL',
    title: 'Monitor de Desempenho & Temperaturas',
    route: 'cwu-app://performance',
    caption: 'Uso de CPU, GPU, RAM e disco com gráfico ao vivo, temperatura de processador, placa de vídeo e cada disco, e os processos que mais consomem. Tudo vem de um único processo PowerShell contínuo, para não pesar o PC.',
    src: cwuMonitor,
  },
  {
    id: 'logs',
    tag: 'TEMA NÉVOA',
    title: 'Histórico de Alterações com Reverter',
    route: 'cwu-app://logs',
    caption: 'Cada mudança feita pelo app aparece por categoria, com botão para reverter e criação de ponto de restauração, aqui no tema claro Névoa.',
    src: cwuLogs,
  },
  {
    id: 'versions',
    tag: 'ATUALIZAÇÕES',
    title: 'Novas Versões & Atualização Automática',
    route: 'cwu-app://versions',
    caption: 'Consulta a última release no GitHub, baixa e confere a atualização por SHA-512 e mostra o histórico de mudanças de cada versão.',
    src: cwuVersions,
  },
  {
    id: 'themes',
    tag: 'TEMA ÍNDIGO',
    title: 'Três Temas: Grafite, Névoa e Índigo',
    route: 'cwu-app://settings/themes',
    caption: 'Escolha entre o escuro Grafite, o claro Névoa e o novo Índigo, azul-marinho com cartões de vidro, aplicado também à sobreposição de FPS.',
    src: cwuThemes,
  },
];

export const PROJECT_SCREENS_MAP: Record<string, ScreenshotItem[]> = {
  'time-tracker': TIME_TRACKER_SCREENS,
  'ai-assistant-integrator': AI_ASSISTANT_SCREENS,
  'cwu-app': CWU_APP_SCREENS,
};

export const EMPTY_SCREENS: ScreenshotItem[] = [];
