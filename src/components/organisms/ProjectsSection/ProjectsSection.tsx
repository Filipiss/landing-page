import { ReactNode } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Clock, Star, ArrowRight } from 'lucide-react';
import ProjectCard from '../../molecules/ProjectCard/ProjectCard';
import './ProjectsSection.css';

interface ProjectsSectionList {
    id: string;
    tags: string[];
    icon: ReactNode;
    gradient: string;
}

export default function ProjectsSection() {
    const { t } = useLanguage();

    // Show a select subset (e.g., top 2 project demos) on the home page
    const projectsList: ProjectsSectionList[] = [
        {
            id: 'time-tracker',
            tags: ['React', 'Flask', 'PostgreSQL', 'SQLAlchemy'],
            icon: <Clock size={40} className="project-card-cover-icon" />,
            gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
        },
        {
            id: 'space-portfolio',
            tags: ['React', 'CSS3', 'Framer Motion'],
            icon: <Star size={40} className="project-card-cover-icon" />,
            gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
        }
    ];

    const handleCardClick = (id: string) => {
        window.location.hash = `#/project/${id}`;
    };

    const handleGoToPortfolio = () => {
        window.location.hash = '#/portfolio';
    };

    return (
        <section id="projects" className="section">
            <div className="container">
                <div className="text-center" style={{ marginBottom: '50px' }}>
                    <span className="pretitle">{t('projects.title')}</span>
                    <h2 className="section-title">{t('projects.subtitle')}</h2>
                </div>

                <div className="projects-grid">
                    {projectsList.map((proj, index) => (
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

                {/* Call-to-action button to view complete Portfolio page */}
                <div className="text-center" style={{ marginTop: '50px' }}>
                    <button
                        type="button"
                        onClick={handleGoToPortfolio}
                        className="btn btn-primary"
                        style={{ padding: '14px 32px', gap: '8px' }}
                    >
                        <span>Ver Portfólio Completo</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}
