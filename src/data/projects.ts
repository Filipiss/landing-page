/**
 * Lista única de projetos. Home, portfólio e página de detalhe leem daqui,
 * então um projeto novo só precisa entrar neste arquivo, nas traduções
 * (projects.items.<id>) e, se tiver prints, em projectsScreenshots.ts.
 */
export type ProjectCategory = 'fullstack' | 'ai' | 'desktop';
export type ProjectIcon = 'clock' | 'terminal' | 'monitor' | 'trophy';

export interface Project {
  id: string;
  category: ProjectCategory;
  icon: ProjectIcon;
  /** Tecnologias exibidas nos cards. */
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'cravada-fc',
    category: 'fullstack',
    icon: 'trophy',
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Express'],
  },
  {
    id: 'cwu-app',
    category: 'desktop',
    icon: 'monitor',
    tags: ['Electron', 'Node.js', 'PowerShell', 'Supabase', 'JavaScript'],
  },
  {
    id: 'time-tracker',
    category: 'fullstack',
    icon: 'clock',
    tags: ['Flask', 'PostgreSQL', 'React', 'TypeScript', 'Docker', 'Alembic'],
  },
  {
    id: 'ai-assistant-integrator',
    category: 'ai',
    icon: 'terminal',
    tags: ['FastAPI', 'Python 3.12', 'SSE Streaming', 'OpenAI & Gemini', 'React'],
  },
];

export const PROJECT_IDS = PROJECTS.map((p) => p.id);

/** Numeração "01", "02"... na ordem da lista. */
export const projectNumber = (id: string) =>
  String(PROJECT_IDS.indexOf(id) + 1).padStart(2, '0');
