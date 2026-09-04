import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECT_SCREENS_MAP } from '../../../data/projectsScreenshots';
import './ProjectsSection.css';

interface ProjectItem {
    id: string;
    num: string;
    techTags: string[];
}

const EMPTY_SCREENS: any[] = [];

export default function ProjectsSection() {
    const { t } = useLanguage();
    const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const projects: ProjectItem[] = [
        {
            id: 'time-tracker',
            num: '01',
            techTags: ['React', 'TypeScript', 'Flask', 'SQLAlchemy', 'PostgreSQL']
        },
        {
            id: 'ai-assistant-integrator',
            num: '02',
            techTags: ['FastAPI', 'Python', 'SSE Streaming', 'Gemini & OpenAI API', 'React']
        }
    ];

    const handleProjectClick = (id: string) => {
        window.location.hash = `#/project/${id}`;
    };

    const handleGoToPortfolio = () => {
        window.location.hash = '#/portfolio';
    };

    const activeProject = projects.find(p => p.id === hoveredProjectId) || projects[0];
    const projectScreens = PROJECT_SCREENS_MAP[activeProject.id] || EMPTY_SCREENS;

    const [prevActiveProjectId, setPrevActiveProjectId] = useState(activeProject.id);

    // Reset carousel index immediately if active project changes
    if (activeProject.id !== prevActiveProjectId) {
        setPrevActiveProjectId(activeProject.id);
        setCurrentImageIndex(0);
    }

    // 5-second automatic image transition, without manual navigation controls
    useEffect(() => {
        if (!projectScreens || projectScreens.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % projectScreens.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [activeProject.id, projectScreens.length]);

    return (
        <section id="work" className="section studio-projects-section">
            <div className="container">
                {/* 1. Header with Kicker & Title */}
                <div className="studio-work-header">
                    <div className="section-kicker">
                        <span className="section-kicker-num">01 //</span>
                        <span>{t('projects.kicker').replace(/^[0-9]+\s*\/\/\s*/, '')}</span>
                    </div>

                    <div className="studio-work-title-row">
                        <div>
                            <h2 className="section-heading">{t('projects.title')}</h2>
                            <p className="section-subheading">{t('projects.subtitle')}</p>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoToPortfolio}
                            className="btn-link studio-archive-link font-mono"
                        >
                            <span>{t('projects.view_all')}</span>
                            <ArrowUpRight size={14} className="kinetic-arrow" />
                        </button>
                    </div>
                </div>

                {/* 2. Interactive Showcase (Split: List on Left, Dynamic Preview on Right) */}
                <div className="studio-showcase-grid">
                    {/* Left: Interactive Project Rows */}
                    <div className="studio-projects-list">
                        {projects.map((item) => {
                            const title = t(`projects.items.${item.id}.title`);
                            const category = t(`projects.items.${item.id}.category`);
                            const shortDesc = t(`projects.items.${item.id}.short_desc`);
                            const year = t(`projects.items.${item.id}.year`) || '2026';
                            const tagline = t(`projects.items.${item.id}.tagline`);
                            const isHovered = hoveredProjectId === item.id;

                            return (
                                <article
                                    key={item.id}
                                    onMouseEnter={() => setHoveredProjectId(item.id)}
                                    onMouseLeave={() => setHoveredProjectId(null)}
                                    onClick={() => handleProjectClick(item.id)}
                                    className={`studio-project-row ${isHovered ? 'is-active' : ''}`}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Ver case study ${title}`}
                                >
                                    <div className="project-row-topline font-mono">
                                        <span className="project-num-badge">{item.num} //</span>
                                        <span className="project-category-badge">{category}</span>
                                        <span className="project-year-badge">{year}</span>
                                    </div>

                                    <div className="project-row-main">
                                        <h3 className="project-headline font-display">
                                            {title}
                                        </h3>
                                        <p className="project-desc-line">
                                            {shortDesc}
                                        </p>
                                    </div>

                                    <div className="project-row-footer font-mono">
                                        <div className="project-tags-group">
                                            {item.techTags.map((tag, idx) => (
                                                <span key={idx} className="project-tech-chip">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="project-action-slot">
                                            <span className="project-cta-text">{t('projects.view_project')}</span>
                                            <span className="project-cta-arrow">
                                                <ArrowUpRight size={16} />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Mobile-only inline visual preview strip */}
                                    <div className="mobile-project-visual-strip">
                                        <div className={`mobile-preview-canvas preview-bg-${item.id}`}>
                                            <div className="mobile-preview-overlay">
                                                <span className="font-mono mobile-tagline">{tagline}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* Right: Studio Floating Preview Window (Desktop) */}
                    <div className="studio-preview-column" aria-hidden="true">
                        <div className="studio-preview-sticky-frame">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeProject.id}
                                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                    className={`studio-preview-card preview-theme-${activeProject.id}`}
                                    onClick={() => handleProjectClick(activeProject.id)}
                                >
                                    <div className="preview-top-bar font-mono">
                                        <span className="preview-status-tag">CASE PREVIEW // {activeProject.num}</span>
                                        {projectScreens.length > 0 && (
                                            <span className="preview-index-counter font-mono">
                                                {String(currentImageIndex + 1).padStart(2, '0')} / {String(projectScreens.length).padStart(2, '0')}
                                            </span>
                                        )}
                                        <span className="preview-action-hint font-mono">{t('projects.view_project')} ↗</span>
                                    </div>

                                    <div className="preview-artwork-area">
                                        <AnimatePresence mode="wait">
                                            {projectScreens[currentImageIndex] && (
                                                <motion.img
                                                    key={`${activeProject.id}-${currentImageIndex}`}
                                                    src={projectScreens[currentImageIndex].src}
                                                    alt={projectScreens[currentImageIndex].title}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                                                    className="preview-artwork-img"
                                                    draggable={false}
                                                />
                                            )}
                                        </AnimatePresence>
                                        <div className="preview-artwork-gradient-overlay"></div>
                                        <div className="preview-auto-progress-bar">
                                            <motion.div
                                                key={`${activeProject.id}-${currentImageIndex}`}
                                                className="preview-auto-progress-fill"
                                                initial={{ width: '0%' }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 5, ease: 'linear' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="preview-bottom-caption">
                                        {projectScreens[currentImageIndex]?.tag && (
                                            <span className="preview-caption-tag font-mono">
                                                {projectScreens[currentImageIndex].tag}
                                            </span>
                                        )}
                                        <h4 className="preview-caption-title font-display">
                                            {projectScreens[currentImageIndex]?.title || t(`projects.items.${activeProject.id}.title`)}
                                        </h4>
                                        <p className="preview-caption-tagline font-mono">
                                            {projectScreens[currentImageIndex]?.caption || t(`projects.items.${activeProject.id}.tagline`)}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
