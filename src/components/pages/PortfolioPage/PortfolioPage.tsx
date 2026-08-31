import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Clock, Star, Terminal, ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';
import ProjectCard from '../../molecules/ProjectCard/ProjectCard';
import './PortfolioPage.css';

interface ProjectsSectionList {
    id: string;
    tags: string[];
    icon: ReactNode;
    gradient: string;
    categoryType: 'fullstack' | 'webgl' | 'ai';
}

export default function PortfolioPage() {
    const { t } = useLanguage();
    const [filter, setFilter] = useState<'all' | 'fullstack' | 'webgl' | 'ai'>('all');

    const projectsList: ProjectsSectionList[] = [
        {
            id: 'time-tracker',
            tags: ['React', 'Flask', 'PostgreSQL', 'SQLAlchemy'],
            icon: <Clock size={40} className="project-card-cover-icon" />,
            gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            categoryType: 'fullstack'
        },
        {
            id: 'space-portfolio',
            tags: ['React', 'CSS3', 'Framer Motion'],
            icon: <Star size={40} className="project-card-cover-icon" />,
            gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            categoryType: 'webgl'
        },
        {
            id: 'ai-assistant-integrator',
            tags: ['Node.js', 'Express', 'LLM API', 'Streaming'],
            icon: <Terminal size={40} className="project-card-cover-icon" />,
            gradient: 'linear-gradient(135deg, #111827 0%, #030712 100%)',
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
                    <a href="#/" className="portfolio-back-btn">
                        <ArrowLeft size={16} style={{ marginRight: '6px' }} />
                        Voltar para Home
                    </a>
                    <h1 className="portfolio-title">Portfólio Completo</h1>
                    <p className="portfolio-subtitle">
                        Explore todos os meus projetos e experimentos de desenvolvimento detalhadamente.
                    </p>

                    {/* Category Filter Buttons */}
                    <div className="portfolio-filters">
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
                            Fullstack
                        </button>
                        <button
                            className={`portfolio-filter-btn ${filter === 'webgl' ? 'active' : ''}`}
                            onClick={() => setFilter('webgl')}
                        >
                            WebGL / Frontend
                        </button>
                        <button
                            className={`portfolio-filter-btn ${filter === 'ai' ? 'active' : ''}`}
                            onClick={() => setFilter('ai')}
                        >
                            AI / Automação
                        </button>
                    </div>
                </header>

                <div className="projects-grid" style={{ paddingBottom: '80px' }}>
                    {filteredProjects.map((proj, index) => (
                        <ProjectCard
                            key={proj.id}
                            id={proj.id}
                            tags={proj.tags}
                            icon={proj.icon}
                            gradient={proj.gradient}
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
