import { useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, BookOpen, Settings, ShieldAlert, Award } from 'lucide-react';
import GithubIcon from '../../atoms/GithubIcon/GithubIcon';
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
            <div className="container text-center" style={{ padding: '80px 0' }}>
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
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px', height: '100%' }}>
                                    <div style={{ background: 'var(--border-glass)', borderRadius: '6px', padding: '8px' }}>
                                        <div style={{ width: '80%', height: '8px', background: 'var(--accent-primary)', marginBottom: '8px', borderRadius: '2px' }}></div>
                                        <div style={{ width: '60%', height: '6px', background: 'var(--text-muted)', marginBottom: '6px', borderRadius: '2px' }}></div>
                                        <div style={{ width: '40%', height: '6px', background: 'var(--text-muted)', marginBottom: '6px', borderRadius: '2px' }}></div>
                                    </div>
                                    <div style={{ background: 'var(--border-glass)', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '10px', color: 'var(--accent-secondary)', fontWeight: 'bold' }}>Março 2026</span>
                                            <span style={{ fontSize: '10px', color: 'var(--accent-primary)' }}>Total: 142 horas</span>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', flexGrow: 1 }}>
                                            {Array.from({ length: 28 }).map((_, i) => (
                                                <div key={i} style={{
                                                    background: i % 4 === 0 ? 'var(--accent-primary)' : i % 7 === 1 ? 'var(--accent-secondary)' : 'var(--bg-primary)',
                                                    borderRadius: '3px',
                                                    opacity: i % 5 === 0 ? 0.3 : 1
                                                }}></div>
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
                            <div className="mockup-screen-body" style={{ background: '#03001e', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ width: '120px', height: '120px', border: '1px dashed var(--accent-primary)', borderRadius: '50%', position: 'absolute' }}>
                                    <div style={{ width: '10px', height: '10px', background: 'var(--accent-secondary)', borderRadius: '50%', position: 'absolute', top: '10px', left: '10px', boxShadow: '0 0 10px var(--accent-secondary)' }}></div>
                                </div>
                                <div style={{ width: '50px', height: '50px', background: 'radial-gradient(circle, var(--accent-primary) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', boxShadow: '0 0 20px var(--accent-primary)' }}></div>
                                <div style={{ position: 'absolute', width: '150%', height: '150%', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 60%)', top: '-25%', left: '-25%' }}></div>
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
                            <div className="mockup-screen-body" style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div className="chat-bubble user" style={{
                                    background: 'var(--border-glass)',
                                    padding: '6px 10px',
                                    borderRadius: '12px 12px 2px 12px',
                                    alignSelf: 'flex-end',
                                    maxWidth: '80%',
                                    fontSize: '9px',
                                    border: '1px solid var(--border-glass)'
                                }}>
                                    Query: Explicar o que é Server-Sent Events.
                                </div>
                                <div className="chat-bubble ai" style={{
                                    background: 'var(--accent-glow)',
                                    padding: '8px 10px',
                                    borderRadius: '12px 12px 12px 2px',
                                    alignSelf: 'flex-start',
                                    maxWidth: '85%',
                                    fontSize: '9px',
                                    border: '1px solid rgba(var(--accent-primary-rgb), 0.2)',
                                    lineHeight: '1.4'
                                }}>
                                    <strong style={{ color: 'var(--accent-primary)' }}>AI Response:</strong> Server-Sent Events (SSE) permitem que um servidor envie atualizações em tempo real para o front-end via conexão HTTP persistente. Diferente de WebSockets...
                                </div>
                                <div style={{ display: 'flex', gap: '5px', marginTop: 'auto' }}>
                                    <div style={{ flexGrow: 1, height: '22px', background: 'var(--bg-primary)', border: '1px solid var(--border-glass)', borderRadius: '4px', padding: '4px', fontSize: '8px', color: 'var(--text-secondary)' }}>Fazer pergunta...</div>
                                    <div style={{ width: '22px', height: '22px', background: 'var(--accent-primary)', borderRadius: '4px' }}></div>
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
                    <a href="#/portfolio" className="project-detail-back-link">
                        <ArrowLeft size={16} style={{ marginRight: '6px' }} />
                        {t('projects.back_to_portfolio')}
                    </a>

                    <span className="project-detail-category">
                        {t(`projects.items.${projectId}.category`)}
                    </span>
                    <h1 className="project-detail-title">
                        {t(`projects.items.${projectId}.title`)}
                    </h1>
                    <p className="project-detail-subtitle">
                        {t(`projects.items.${projectId}.short_desc`)}
                    </p>

                    <div className="project-detail-actions">
                        <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            <ExternalLink size={18} style={{ marginRight: '8px' }} />
                            {t('projects.live_demo')}
                        </a>
                        <a href="https://github.com/filipidios" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                            <GithubIcon size={18} style={{ marginRight: '8px' }} />
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
                        <ArrowLeft size={18} style={{ marginRight: '8px' }} />
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
                        <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </a>
                </div>
            </footer>

        </article>
    );
}
