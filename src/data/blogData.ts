export type BlogCategory = 'specialization' | 'course' | 'certification';
export type BlogStatus = 'completed' | 'in_progress' | 'planned';

export interface BlogPostProject {
    title: { pt: string; en: string };
    description: { pt: string; en: string };
    techStack: string[];
    repoUrl?: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: { pt: string; en: string };
    kicker: { pt: string; en: string };
    institution?: string;
    category: BlogCategory;
    status: BlogStatus;
    progress: number; // 0 to 100
    period: string;
    workload: string;
    readTime: string;
    excerpt: { pt: string; en: string };
    tags: string[];
    credentialUrl?: string;
    syllabus: { pt: string[]; en: string[] };
    keyLearnings: { pt: string[]; en: string[] };
    practicalProjects: BlogPostProject[];
    overview: { pt: string; en: string };
    verdict: { pt: string; en: string };
    featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'docker-containers-devops-in-progress',
        slug: 'docker-containers-devops-in-progress',
        title: {
            pt: 'Formação Docker & Ambientes de Containers: Do Zero ao Avançado',
            en: 'Docker & Containerized Environments: From Zero to Advanced'
        },
        kicker: {
            pt: 'CURSO EM ANDAMENTO // DEVOPS & INFRAESTRUTURA',
            en: 'IN-PROGRESS COURSE // DEVOPS & INFRASTRUCTURE'
        },
        category: 'course',
        status: 'in_progress',
        progress: 25,
        period: '2026 — Presente',
        workload: '45h',
        readTime: '4 min read',
        featured: true,
        excerpt: {
            pt: 'Registro prático do meu curso atual de Docker: virtualização em nível de SO, namespaces, cgroups, criação de Dockerfiles eficientes, persistência de dados com volumes e orquestração multi-serviços com Docker Compose.',
            en: 'Practical log of my current Docker course: OS-level virtualization, namespaces, cgroups, crafting optimized Dockerfiles, persistent volume storage, and multi-service orchestration with Docker Compose.'
        },
        tags: ['Docker', 'Docker Compose', 'Containers', 'Linux', 'DevOps', 'CI/CD'],
        syllabus: {
            pt: [
                'Introdução à conteinerização: diferenças conceituais entre Máquinas Virtuais e Containers',
                'Arquitetura interna do Docker: Docker Engine, Daemon, Client CLI e Registries',
                'Ciclo de vida e manipulação de containers: execução em background, mapeamento de portas e logs',
                'Construção de imagens com Dockerfile: camadas de imagem, boas práticas de cache e builds multi-stage',
                'Gerenciamento de dados e persistência: Anonymous Volumes, Named Volumes e Bind Mounts',
                'Comunicação de rede entre containers: criação e isolamento de Networks customizadas (Bridge e Host)',
                'Orquestração local com Docker Compose para ecossistemas multi-serviços (Aplicação + Banco de Dados + Cache)'
            ],
            en: [
                'Introduction to containerization: conceptual differences between Virtual Machines and Containers',
                'Docker internal architecture: Docker Engine, Daemon, Client CLI, and Registries',
                'Container lifecycle & operations: detached mode execution, port forwarding, and inspection logs',
                'Building container images with Dockerfile: image layers, caching best practices, and multi-stage builds',
                'Data persistence & storage management: Anonymous Volumes, Named Volumes, and Bind Mounts',
                'Inter-container network communication: custom Network topology and isolation (Bridge & Host)',
                'Local orchestration using Docker Compose for multi-service environments (App + Relational DB + Cache)'
            ]
        },
        keyLearnings: {
            pt: [
                'Entendimento prático da anatomia de um container e isolamento de processos no kernel do Linux',
                'Padronização total do ambiente de desenvolvimento sem necessidade de instalar runtimes ou bancos na máquina host',
                'Otimização do tempo de build organizando as instruções do Dockerfile de forma estratégica para aproveitar o cache',
                'Próximo objetivo no curso: conteinerizar por completo a stack do Time Trackerígena (Flask + PostgreSQL + React) com hot-reload'
            ],
            en: [
                'Practical grasp of container internals and process isolation mechanisms within the Linux kernel',
                'Total standardization of development environments without cluttering the host system with runtimes and databases',
                'Build-time optimization through strategic instruction ordering inside Dockerfiles to maximize layer caching',
                'Next milestone in the course: fully containerizing the Time Trackerígena stack (Flask + PostgreSQL + React) with live hot-reload'
            ]
        },
        practicalProjects: [
            {
                title: {
                    pt: 'Ambiente Conteinerizado com Docker Compose',
                    en: 'Containerized Environment with Docker Compose'
                },
                description: {
                    pt: 'Estruturação de ambiente de desenvolvimento com Docker Compose unificando backend Flask, banco de dados PostgreSQL persistido em volume dedicado e interface React com hot reload ativo.',
                    en: 'Setting up a unified dev environment with Docker Compose linking a Flask backend, a volume-persisted PostgreSQL database, and a hot-reloading React frontend.'
                },
                techStack: ['Docker', 'Docker Compose', 'PostgreSQL', 'Flask', 'React'],
                repoUrl: 'https://github.com/Filipiss'
            }
        ],
        overview: {
            pt: 'Iniciei este curso com o objetivo claro de dominar a conteinerização e a reprodutibilidade de aplicações de ponta a ponta. Como desenvolvedor full stack trabalhando ativamente com Python, React e bancos relacionais, poder subir ambientes completos e idênticos com um simples comando é um salto tremendo de produtividade e segurança técnica.',
            en: 'I started this course to master containerization and ensure end-to-end application reproducibility. As a full stack developer actively engineering with Python, React, and relational databases, spinning up identical, production-aligned topologies with a single command is a massive boost in developer velocity and reliability.'
        },
        verdict: {
            pt: 'Os estudos estão no início, mas já transformaram a forma como encaro o ciclo de vida do software. Eliminar a dependência de configurações manuais na máquina local e ter certeza de que o software se comportará de forma idêntica em qualquer ambiente é essencial para a qualidade da engenharia.',
            en: 'The coursework is currently in its opening chapters, but has already transformed how I approach the software development lifecycle. Eliminating manual configuration on local workstations and guaranteeing identical runtime behavior everywhere is foundational to great engineering.'
        }
    }
];

export const BLOG_CATEGORIES: { id: BlogCategory | 'all'; label: { pt: string; en: string } }[] = [
    { id: 'all', label: { pt: 'Todos os Conteúdos', en: 'All Records' } },
    { id: 'specialization', label: { pt: 'Especializações', en: 'Specializations' } },
    { id: 'course', label: { pt: 'Cursos & Imersões', en: 'Courses & Deep Dives' } },
    { id: 'certification', label: { pt: 'Certificações', en: 'Certifications' } }
];

export const BLOG_STATUSES: { id: BlogStatus | 'all'; label: { pt: string; en: string } }[] = [
    { id: 'all', label: { pt: 'Todos os Status', en: 'All Statuses' } },
    { id: 'completed', label: { pt: 'Concluídos', en: 'Completed' } },
    { id: 'in_progress', label: { pt: 'Em Andamento', en: 'In Progress' } }
];
