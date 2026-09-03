import { useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, BookOpen, Settings, ShieldAlert, Award } from 'lucide-react';
import GithubIcon from '../../atoms/GithubIcon/GithubIcon';
import Folder from '../../atoms/Folder/Folder';
import './ProjectDetailPage.css';

const PROJECT_IDS = ['time-tracker', 'space-portfolio', 'ai-assistant-integrator'];

interface ProjectDetailPageProps {
    projectId: string;
}

export default function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
    const { t } = useLanguage();

    // Scroll to sub-section if sub-hash is present
    useEffect(() => {
        const handleSubHashScroll = () => {
            const hash = window.location.hash;
            const parts = hash.split('#');
            if (parts.length > 2) {
                const subSection = parts[2];
                const element = document.getElementById(`detail-${subSection}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        };

        // Initial check
        const timer = setTimeout(handleSubHashScroll, 100);

        window.addEventListener('hashchange', handleSubHashScroll);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('hashchange', handleSubHashScroll);
        };
    }, [projectId]);

    const currentIndex = PROJECT_IDS.indexOf(projectId);
    if (currentIndex === -1) {
        return (
            <div className="container text-center project-not-found">
                <h2>Project not found</h2>
                <a href="#/" className="btn btn-primary">Back Home</a>
            </div>
        );
    }

    const prevId = PROJECT_IDS[(currentIndex - 1 + PROJECT_IDS.length) % PROJECT_IDS.length];
    const nextId = PROJECT_IDS[(currentIndex + 1) % PROJECT_IDS.length];

    const handleSubLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        window.location.hash = `#/project/${projectId}#${sectionId}`;
    };

    const getMockupScreen = () => {
        switch (projectId) {
            case 'time-tracker':
                return (
                    <div className="mockup-screengrid">
                        <div className="mockup-screen">
                            <div className="mockup-screen-header">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                                <span className="title">Time Trackerígena - Dashboard</span>
                            </div>
                            <div className="mockup-screen-body">
                                <div className="tt-mockup-layout">
                                    <div className="tt-mockup-sidebar">
                                        <div className="tt-bar-primary"></div>
                                        <div className="tt-bar-secondary"></div>
                                        <div className="tt-bar-tertiary"></div>
                                    </div>
                                    <div className="tt-mockup-calendar">
                                        <div className="tt-calendar-header">
                                            <span className="tt-month-label">Março 2026</span>
                                            <span className="tt-total-label">Total: 142 horas</span>
                                        </div>
                                        <div className="tt-calendar-grid">
                                            {Array.from({ length: 28 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`tt-calendar-cell ${
                                                        i % 4 === 0
                                                            ? 'tt-cell-primary'
                                                            : i % 7 === 1
                                                            ? 'tt-cell-secondary'
                                                            : 'tt-cell-default'
                                                    } ${i % 5 === 0 ? 'tt-cell-faded' : ''}`}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'space-portfolio':
                return (
                    <div className="mockup-screengrid">
                        <div className="mockup-screen">
                            <div className="mockup-screen-header">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                                <span className="title">Space Portfolio - Simulation</span>
                            </div>
                            <div className="mockup-screen-body space-mockup-body">
                                <div className="space-orbit-ring">
                                    <div className="space-orbit-planet"></div>
                                </div>
                                <div className="space-sun-core"></div>
                                <div className="space-nebula-glow"></div>
                            </div>
                        </div>
                    </div>
                );
            case 'ai-assistant-integrator':
                return (
                    <div className="mockup-screengrid">
                        <div className="mockup-screen">
                            <div className="mockup-screen-header">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                                <span className="title">AI Integrator - Chat Interface</span>
                            </div>
                            <div className="mockup-screen-body ai-mockup-body">
                                <div className="chat-bubble user chat-bubble-user">
                                    Query: Explicar o que é Server-Sent Events.
                                </div>
                                <div className="chat-bubble ai chat-bubble-ai">
                                    <strong className="chat-ai-label">AI Response:</strong> Server-Sent Events (SSE) permitem que um servidor envie atualizações em tempo real para o front-end via conexão HTTP persistente. Diferente de WebSockets...
                                </div>
                                <div className="chat-input-row">
                                    <div className="chat-input-placeholder">Fazer pergunta...</div>
                                    <div className="chat-send-btn"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <article className="project-detail">

            {/* Hero Header */}
            <header className="project-detail-hero">
                <motion.div
                    className="container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="project-detail-top-nav">
                        <a href="#/portfolio" className="project-detail-back-link">
                            <ArrowLeft size={16} />
                            <span>{t('projects.back_to_portfolio')}</span>
                            <Folder
                                size={0.22}
                                color="#2563eb"
                                className="project-detail-folder"
                            />
                        </a>
                    </div>

                    <div className="project-detail-title-row">
                        <h1 className="project-detail-title">
                            {t(`projects.items.${projectId}.title`)}
                        </h1>
                        <span className="project-detail-category">
                            {t(`projects.items.${projectId}.category`)}
                        </span>
                    </div>

                    <p className="project-detail-subtitle">
                        {t(`projects.items.${projectId}.short_desc`)}
                    </p>

                    <div className="project-detail-actions">
                        <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            <ExternalLink size={18} />
                            {t('projects.live_demo')}
                        </a>
                        <a href="https://github.com/filipidios" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                            <GithubIcon size={18} />
                            {t('projects.github_repo')}
                        </a>
                    </div>
                </motion.div>
            </header>

            {/* Internal Hash Sub-Navigation Anchor List */}
            <motion.nav
                className="project-detail-subnav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="container project-detail-subnav-container">
                    <a href={`#/project/${projectId}#intro`} onClick={(e) => handleSubLinkClick(e, 'intro')} className="project-detail-subnav-link">
                        {t('projects.nav_what_is')}
                    </a>
                    <a href={`#/project/${projectId}#stack`} onClick={(e) => handleSubLinkClick(e, 'stack')} className="project-detail-subnav-link">
                        {t('projects.nav_how_i_did')}
                    </a>
                    <a href={`#/project/${projectId}#architecture`} onClick={(e) => handleSubLinkClick(e, 'architecture')} className="project-detail-subnav-link">
                        {t('projects.nav_why_design')}
                    </a>
                    <a href={`#/project/${projectId}#challenges`} onClick={(e) => handleSubLinkClick(e, 'challenges')} className="project-detail-subnav-link">
                        {t('projects.nav_challenges')}
                    </a>
                    <a href={`#/project/${projectId}#screenshots`} onClick={(e) => handleSubLinkClick(e, 'screenshots')} className="project-detail-subnav-link">
                        Screenshots
                    </a>
                </div>
            </motion.nav>

            {/* Content Sections */}
            <motion.div
                className="container project-detail-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >

                {/* SECTION 1: Intro */}
                <section id="detail-intro" className="project-detail-section">
                    <div className="project-detail-section-header">
                        <BookOpen size={24} className="color-accent" />
                        <h2>{t('projects.nav_what_is')}</h2>
                    </div>
                    <p>{t(`projects.items.${projectId}.what_is`)}</p>
                </section>

                {/* SECTION 2: Stack of tech & execution */}
                <section id="detail-stack" className="project-detail-section">
                    <div className="project-detail-section-header">
                        <Settings size={24} className="color-accent" />
                        <h2>{t('projects.nav_how_i_did')}</h2>
                    </div>
                    <p>{t(`projects.items.${projectId}.how_i_did`)}</p>
                </section>

                {/* SECTION 3: Architectural decisions */}
                <section id="detail-architecture" className="project-detail-section">
                    <div className="project-detail-section-header">
                        <Award size={24} className="color-accent" />
                        <h2>{t('projects.nav_why_design')}</h2>
                    </div>
                    <p>{t(`projects.items.${projectId}.why_design`)}</p>
                </section>

                {/* SECTION 4: Challenges & Solutions */}
                <section id="detail-challenges" className="project-detail-section">
                    <div className="project-detail-section-header">
                        <ShieldAlert size={24} className="color-accent" />
                        <h2>{t('projects.nav_challenges')}</h2>
                    </div>
                    <p>{t(`projects.items.${projectId}.challenges`)}</p>
                </section>

                {/* SECTION 5: Screenshots */}
                <section id="detail-screenshots" className="project-detail-section">
                    <div className="project-detail-section-header">
                        <ExternalLink size={24} className="color-accent" />
                        <h2>Screenshots</h2>
                    </div>
                    <div className="project-detail-gallery">
                        {getMockupScreen()}
                    </div>
                </section>

            </motion.div>

            {/* Footer Navigation (Prev / Next project) */}
            <footer className="project-detail-nav">
                <div className="container project-detail-nav-container">
                    <a href={`#/project/${prevId}`} className="project-detail-nav-btn">
                        <ArrowLeft size={18} />
                        <span>
                            <small>{t('projects.prev_project')}</small>
                            <strong>{t(`projects.items.${prevId}.title`)}</strong>
                        </span>
                    </a>

                    <a href={`#/project/${nextId}`} className="project-detail-nav-btn project-detail-nav-btn-next">
                        <span>
                            <small>{t('projects.next_project')}</small>
                            <strong>{t(`projects.items.${nextId}.title`)}</strong>
                        </span>
                        <ArrowRight size={18} />
                    </a>
                </div>
            </footer>

        </article>
    );
}
