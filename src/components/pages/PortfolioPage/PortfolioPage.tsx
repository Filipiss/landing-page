import { useState, ReactNode } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Clock, Terminal, ArrowLeft } from 'lucide-react';
import ProjectCard from '../../molecules/ProjectCard/ProjectCard';
import './PortfolioPage.css';

interface ProjectsSectionList {
    id: string;
    tags: string[];
    icon: ReactNode;
    categoryType: 'fullstack' | 'ai' | 'enterprise';
}

export default function PortfolioPage() {
    const { t } = useLanguage();
    const [filter, setFilter] = useState<'all' | 'fullstack' | 'ai'>('all');

    const projectsList: ProjectsSectionList[] = [
        {
            id: 'time-tracker',
            tags: ['Python', 'Flask', 'PostgreSQL', 'React', 'TypeScript'],
            icon: <Clock size={28} className="project-card-cover-icon" />,
            categoryType: 'fullstack'
        },
        {
            id: 'ai-assistant-integrator',
            tags: ['Python', 'FastAPI', 'SSE Streaming', 'Gemini & OpenAI', 'React'],
            icon: <Terminal size={28} className="project-card-cover-icon" />,
            categoryType: 'ai'
        }
    ];

    const filteredProjects = filter === 'all'
        ? projectsList
        : projectsList.filter(p => p.categoryType === filter);

    const handleCardClick = (id: string) => {
        window.location.hash = `#/project/${id}`;
    };

    return (
        <div className="portfolio-page">
            <div className="container">
                <header className="portfolio-header">
                    <a href="#/" className="portfolio-back-btn font-mono">
                        <ArrowLeft size={16} />
                        Voltar para Home
                    </a>
                    <h1 className="portfolio-title font-display">Portfólio & Obras</h1>
                    <p className="portfolio-subtitle">
                        Sistemas reais construídos de ponta a ponta: APIs assíncronas em Python, plataformas corporativas e interfaces reativas.
                    </p>

                    {/* Category Filter Buttons */}
                    <div className="portfolio-filters font-mono">
                        <button
                            className={`portfolio-filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            Todos
                        </button>
                        <button
                            className={`portfolio-filter-btn ${filter === 'fullstack' ? 'active' : ''}`}
                            onClick={() => setFilter('fullstack')}
                        >
                            Full Stack
                        </button>
                        <button
                            className={`portfolio-filter-btn ${filter === 'ai' ? 'active' : ''}`}
                            onClick={() => setFilter('ai')}
                        >
                            IA & Streaming
                        </button>
                    </div>
                </header>

                <div className="projects-grid">
                    {filteredProjects.map((proj, index) => (
                        <ProjectCard
                            key={proj.id}
                            id={proj.id}
                            tags={proj.tags}
                            icon={proj.icon}
                            category={t(`projects.items.${proj.id}.category`)}
                            title={t(`projects.items.${proj.id}.title`)}
                            shortDesc={t(`projects.items.${proj.id}.short_desc`)}
                            viewProjectText={t('projects.view_project')}
                            onClick={() => handleCardClick(proj.id)}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
