import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, 
    ArrowRight, 
    ExternalLink, 
    BookOpen, 
    Settings, 
    ShieldAlert, 
    Award, 
    Maximize2, 
    X, 
    ChevronLeft, 
    ChevronRight 
} from 'lucide-react';
import GithubIcon from '../../atoms/GithubIcon/GithubIcon';
import Folder from '../../atoms/Folder/Folder';
import DepthCarousel from '../../atoms/DepthCarousel/DepthCarousel';

import { 
    PROJECT_SCREENS_MAP as SCREENS_BY_PROJECT, 
    ScreenshotItem 
} from '../../../data/projectsScreenshots';
import './ProjectDetailPage.css';

const PROJECT_IDS = ['time-tracker', 'ai-assistant-integrator'];

const EMPTY_SCREENS: ScreenshotItem[] = [];

interface ProjectDetailPageProps {
    projectId: string;
}

export default function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
    const { t } = useLanguage();
    const [activeScreenIndex, setActiveScreenIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [prevProjectId, setPrevProjectId] = useState(projectId);

    if (projectId !== prevProjectId) {
        setPrevProjectId(projectId);
        setActiveScreenIndex(0);
        setLightboxOpen(false);
    }

    const currentScreens = SCREENS_BY_PROJECT[projectId] ?? EMPTY_SCREENS;

    const carouselItems = useMemo(() => {
        return currentScreens.map((s) => ({
            image: s.src,
            alt: s.title,
        }));
    }, [currentScreens]);

    // Keyboard navigation for Lightbox
    useEffect(() => {
        if (!lightboxOpen || currentScreens.length === 0) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setLightboxOpen(false);
            } else if (e.key === 'ArrowRight') {
                setActiveScreenIndex((prev) => (prev + 1) % currentScreens.length);
            } else if (e.key === 'ArrowLeft') {
                setActiveScreenIndex((prev) => (prev - 1 + currentScreens.length) % currentScreens.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, currentScreens.length]);

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
                <h2>Projeto não encontrado</h2>
                <a href="#/" className="btn btn-primary">Voltar para Home</a>
            </div>
        );
    }

    const prevId = PROJECT_IDS[(currentIndex - 1 + PROJECT_IDS.length) % PROJECT_IDS.length];
    const nextId = PROJECT_IDS[(currentIndex + 1) % PROJECT_IDS.length];

    const handleSubLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        window.location.hash = `#/project/${projectId}#${sectionId}`;
    };

    const activeScreen = currentScreens[activeScreenIndex] || currentScreens[0];

    const renderScreenshotsSection = () => {
        if (!activeScreen || currentScreens.length === 0) {
            return null;
        }

        return (
            <div className="project-gallery-system">
                {/* Featured Mockup Screen Showcase with 3D Depth Carousel */}
                <div className="mockup-screen interactive-mockup-screen">
                    <div className="mockup-screen-header">
                        <div className="mockup-dots">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <div className="mockup-browser-bar font-mono">
                            <span className="mockup-lock-icon">🔒</span>
                            <span className="mockup-url-text">{activeScreen.route}</span>
                        </div>
                        <div className="mockup-header-actions">
                            {t(`projects.items.${projectId}.live_url`) && (
                                <a 
                                    href={t(`projects.items.${projectId}.live_url`)}
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="mockup-action-btn font-mono"
                                    title="Abrir Aplicação ao Vivo"
                                >
                                    <ExternalLink size={12} />
                                    <span className="mockup-action-text">APP AO VIVO ↗</span>
                                </a>
                            )}
                            <button 
                                type="button" 
                                className="mockup-action-btn font-mono"
                                onClick={() => setLightboxOpen(true)}
                                title="Expandir em Tela Cheia"
                            >
                                <Maximize2 size={13} />
                                <span className="mockup-action-text">EXPANDIR</span>
                            </button>
                        </div>
                    </div>

                    {/* 3D Depth Carousel Stage Container */}
                    <div className="depth-carousel-stage-container">
                        <DepthCarousel
                            items={carouselItems}
                            focusIndex={activeScreenIndex}
                            cardWidth={1000}
                            cardHeight={562}
                            radius={8}
                            tint="#090C10"
                            depth={210}
                            spread={90}
                            tilt={16}
                            tiltDirection="right"
                            perspective={1600}
                            visibleCards={4}
                            falloff={0.24}
                            blur={5}
                            duration={800}
                            ease="power2.out"
                            autoplay={true}
                            autoplayDelay={4200}
                            loop={true}
                            showControls={true}
                            showIndicators={true}
                            onChange={(index) => setActiveScreenIndex(index)}
                            onActiveCardClick={() => setLightboxOpen(true)}
                        />

                        <div className="viewport-zoom-hint font-mono">
                            <Maximize2 size={12} />
                            <span>CLIQUE NO CARD PARA AMPLIAR</span>
                        </div>
                    </div>

                    {/* Technical Metadata Footer */}
                    <div className="mockup-meta-footer">
                        <div className="mockup-meta-title-row">
                            <div className="mockup-title-block">
                                <span className="mockup-tag-badge font-mono">{activeScreen.tag}</span>
                                <h3 className="mockup-screen-title font-display">{activeScreen.title}</h3>
                            </div>
                            <span className="mockup-counter font-mono">
                                {String(activeScreenIndex + 1).padStart(2, '0')} // {String(currentScreens.length).padStart(2, '0')}
                            </span>
                        </div>
                        <p className="mockup-caption-text">{activeScreen.caption}</p>
                    </div>
                </div>

                {/* Fullscreen Lightbox Modal */}
                <AnimatePresence>
                    {lightboxOpen && (
                        <motion.div 
                            className="screenshot-lightbox-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setLightboxOpen(false)}
                        >
                            <div 
                                className="screenshot-lightbox-modal"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="lightbox-header font-mono">
                                    <div className="lightbox-header-left">
                                        <span className="lightbox-tag-badge">{activeScreen.tag}</span>
                                        <span className="lightbox-screen-title">{activeScreen.title}</span>
                                    </div>
                                    <div className="lightbox-header-right">
                                        <span className="lightbox-counter">
                                            {String(activeScreenIndex + 1).padStart(2, '0')} / {String(currentScreens.length).padStart(2, '0')}
                                        </span>
                                        <button 
                                            type="button" 
                                            className="lightbox-close-btn"
                                            onClick={() => setLightboxOpen(false)}
                                            aria-label="Fechar modal"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="lightbox-image-stage">
                                    <img 
                                        src={activeScreen.src} 
                                        alt={activeScreen.title} 
                                        className="lightbox-stage-img"
                                    />

                                    <button
                                        type="button"
                                        className="lightbox-nav-btn lightbox-nav-prev"
                                        onClick={() => setActiveScreenIndex((prev) => (prev - 1 + currentScreens.length) % currentScreens.length)}
                                        aria-label="Anterior"
                                    >
                                        <ChevronLeft size={28} />
                                    </button>
                                    <button
                                        type="button"
                                        className="lightbox-nav-btn lightbox-nav-next"
                                        onClick={() => setActiveScreenIndex((prev) => (prev + 1) % currentScreens.length)}
                                        aria-label="Próximo"
                                    >
                                        <ChevronRight size={28} />
                                    </button>
                                </div>

                                <div className="lightbox-caption-bar">
                                    <div className="lightbox-caption-route font-mono">
                                        <span>URL:</span> {activeScreen.route}
                                    </div>
                                    <p className="lightbox-caption-desc">{activeScreen.caption}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <article className="project-detail">
            {/* Hero Header */}
            <header className="project-detail-hero">
                <motion.div
                    className="container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="project-detail-top-nav">
                        <a href="#/portfolio" className="project-detail-back-link">
                            <ArrowLeft size={16} />
                            <span>{t('projects.back_to_portfolio') || 'Voltar para Portfólio'}</span>
                            <Folder
                                size={0.22}
                                color="#3B82F6"
                                className="project-detail-folder"
                            />
                        </a>
                    </div>

                    <div className="project-detail-title-row">
                        <h1 className="project-detail-title font-display">
                            {t(`projects.items.${projectId}.title`)}
                        </h1>
                        <span className="project-detail-category">
                            {t(`projects.items.${projectId}.category`)}
                        </span>
                    </div>

                    <p className="project-detail-subtitle">
                        {t(`projects.items.${projectId}.short_desc`)}
                    </p>

                    {/* Technical Metric Highlight Banner */}
                    {t(`projects.items.${projectId}.metric_highlight`) && (
                        <div className="project-detail-metric-bar">
                            <div>
                                <span className="project-detail-metric-tag font-mono">ENGENHARIA & IMPACTO // MÉTRICA DE PRODUÇÃO</span>
                                <p className="project-detail-metric-text font-mono">
                                    {t(`projects.items.${projectId}.metric_highlight`)}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="project-detail-actions">
                        {t(`projects.items.${projectId}.live_url`) && (
                            <a 
                                href={t(`projects.items.${projectId}.live_url`)} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-primary"
                            >
                                <ExternalLink size={16} />
                                <span>{t('projects.live_demo') || 'Aplicação ao Vivo'} ↗</span>
                            </a>
                        )}
                        <a 
                            href={t(`projects.items.${projectId}.repo_url`) || 'https://github.com/Filipiss'} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-outline"
                        >
                            <GithubIcon size={18} />
                            <span>{t(`projects.items.${projectId}.repo_type`) || 'Repositório GitHub'} ↗</span>
                        </a>
                    </div>
                </motion.div>
            </header>

            {/* Internal Hash Sub-Navigation Anchor List */}
            <motion.nav
                className="project-detail-subnav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="container project-detail-subnav-container">
                    <a href={`#/project/${projectId}#intro`} onClick={(e) => handleSubLinkClick(e, 'intro')} className="project-detail-subnav-link">
                        Visão Geral
                    </a>
                    <a href={`#/project/${projectId}#stack`} onClick={(e) => handleSubLinkClick(e, 'stack')} className="project-detail-subnav-link">
                        Tecnologias
                    </a>
                    <a href={`#/project/${projectId}#architecture`} onClick={(e) => handleSubLinkClick(e, 'architecture')} className="project-detail-subnav-link">
                        Arquitetura
                    </a>
                    <a href={`#/project/${projectId}#challenges`} onClick={(e) => handleSubLinkClick(e, 'challenges')} className="project-detail-subnav-link">
                        Desafios & Soluções
                    </a>
                    <a href={`#/project/${projectId}#screenshots`} onClick={(e) => handleSubLinkClick(e, 'screenshots')} className="project-detail-subnav-link">
                        Interface / Telas
                    </a>
                </div>
            </motion.nav>

            {/* Content Sections */}
            <motion.div
                className="container project-detail-content"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {/* SECTION 1: Intro */}
                <section id="detail-intro" className="project-detail-section">
                    <div className="project-detail-section-header">
                        <BookOpen size={22} className="color-accent" />
                        <h2>Visão Geral do Projeto</h2>
                    </div>
                    <p>{t(`projects.items.${projectId}.overview`) || t(`projects.items.${projectId}.short_desc`)}</p>
                </section>

                {/* SECTION 2: Stack of tech & execution */}
                <section id="detail-stack" className="project-detail-section">
                    <div className="project-detail-section-header">
                        <Settings size={22} className="color-accent" />
                        <h2>Tecnologias & Execução</h2>
                    </div>
                    <p>
                        {t(`projects.items.${projectId}.stack_text`) || 'Construído com foco em código limpo, tipagem estrita com TypeScript, arquitetura desacoplada e alta velocidade de resposta tanto no servidor quanto na interface.'}
                    </p>
                </section>

                {/* SECTION 3: Architectural decisions */}
                <section id="detail-architecture" className="project-detail-section">
                    <div className="project-detail-section-header">
                        <Award size={22} className="color-accent" />
                        <h2>Decisões Arquiteturais</h2>
                    </div>
                    <p>
                        {t(`projects.items.${projectId}.architecture_text`) || 'Adoção de padrões modulares com separação clara entre camada de apresentação, cliente HTTP e lógica de negócios.'}
                    </p>
                </section>

                {/* SECTION 4: Challenges & Solutions */}
                <section id="detail-challenges" className="project-detail-section">
                    <div className="project-detail-section-header">
                        <ShieldAlert size={22} className="color-accent" />
                        <h2>Desafios Superados</h2>
                    </div>
                    <p>
                        {t(`projects.items.${projectId}.challenges_text`) || 'Garantia de consistência no estado reativo, persistência relacional sem gargalos e interface acessível com performance sólida em todas as resoluções.'}
                    </p>
                </section>

                {/* SECTION 5: Screenshots */}
                <section id="detail-screenshots" className="project-detail-section">
                    <div className="project-detail-section-header">
                        <ExternalLink size={22} className="color-accent" />
                        <h2>Arquitetura Visual</h2>
                    </div>
                    <div className="project-detail-gallery">
                        {renderScreenshotsSection()}
                    </div>
                </section>
            </motion.div>

            {/* Footer Navigation (Prev / Next project) */}
            <footer className="project-detail-nav">
                <div className="container project-detail-nav-container">
                    <a href={`#/project/${prevId}`} className="project-detail-nav-btn">
                        <ArrowLeft size={18} />
                        <span>
                            <small>PROJETO ANTERIOR</small>
                            <strong>{t(`projects.items.${prevId}.title`)}</strong>
                        </span>
                    </a>

                    <a href={`#/project/${nextId}`} className="project-detail-nav-btn project-detail-nav-btn-next">
                        <span>
                            <small>PRÓXIMO PROJETO</small>
                            <strong>{t(`projects.items.${nextId}.title`)}</strong>
                        </span>
                        <ArrowRight size={18} />
                    </a>
                </div>
            </footer>
        </article>
    );
}
