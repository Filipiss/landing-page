import { ReactNode } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Clock, Orbit, Bot, ArrowUpRight, Sparkles } from 'lucide-react';
import ProjectCard from '../../molecules/ProjectCard/ProjectCard';
import './ProjectsSection.css';

interface ProjectsSectionList {
    id: string;
    tags: string[];
    icon: ReactNode;
}

export default function ProjectsSection() {
    const { t } = useLanguage();

    const projectsList: ProjectsSectionList[] = [
        {
            id: 'time-tracker',
            tags: ['React 19', 'Flask', 'PostgreSQL', 'Fullstack'],
            icon: <Clock size={36} />
        },
        {
            id: 'space-portfolio',
            tags: ['Three.js', 'Framer Motion', 'Interactive 3D'],
            icon: <Orbit size={36} />
        },
        {
            id: 'ai-assistant-integrator',
            tags: ['Node.js', 'LLMs APIs', 'Vector RAG', 'Streaming'],
            icon: <Bot size={36} />
        }
    ];

    const handleCardClick = (id: string) => {
        window.location.hash = `#/project/${id}`;
    };

    const handleGoToPortfolio = () => {
        window.location.hash = '#/portfolio';
    };

    return (
        <section id="projects" className="section projects-section-editorial">
            <div className="container">
                {/* Header with Title & "View All" Button */}
                <div className="projects-editorial-header">
                    <div className="projects-header-text">
                        <span className="pretitle">
                            <Sparkles size={14} />
                            Portfólio
                        </span>
                        <h2 className="section-title">
                            {t('projects.title')}{' '}
                            <span className="highlight">{t('projects.title_highlight')}</span>
                        </h2>
                        <p className="section-subtitle">
                            {t('projects.subtitle')}
                        </p>
                    </div>

                    <div className="projects-header-action">
                        <button
                            type="button"
                            onClick={handleGoToPortfolio}
                            className="btn btn-primary"
                        >
                            <span>{t('projects.view_all')}</span>
                            <ArrowUpRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Projects Cards Grid */}
                <div className="projects-editorial-grid">
                    {projectsList.map((proj, index) => (
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
        </section>
    );
}
