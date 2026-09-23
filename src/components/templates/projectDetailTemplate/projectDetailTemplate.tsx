import { useState, useEffect, useMemo, FC } from 'react';
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
import GithubIcon from '../../atoms/githubIcon/githubIcon';
import Folder from '../../atoms/folder/folder';
import DepthCarousel from '../../atoms/depthCarousel/depthCarousel';
import ButtonCta from '../../atoms/buttonCta/buttonCta';
import { 
  PROJECT_SCREENS_MAP as SCREENS_BY_PROJECT, 
  ScreenshotItem 
} from '../../../data/projectsScreenshots';
import './projectDetailTemplate.css';

const PROJECT_IDS = ['time-tracker', 'ai-assistant-integrator'];
const EMPTY_SCREENS: ScreenshotItem[] = [];

interface ProjectDetailTemplateProps {
  projectId: string;
}

export const ProjectDetailTemplate: FC<ProjectDetailTemplateProps> = ({ projectId }) => {
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
      <div className="l-container u-textCenter" style={{ padding: '100px 0' }}>
        <h2>Projeto não encontrado</h2>
        <ButtonCta href="#/" variant="primary" style={{ marginTop: '24px' }}>
          Voltar para Home
        </ButtonCta>
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
      <div className="c-mockupScreen">
        <div className="c-mockupScreen__header">
          <div className="c-mockupScreen__dots">
            <span className="c-mockupScreen__dot c-mockupScreen__dot--red" />
            <span className="c-mockupScreen__dot c-mockupScreen__dot--yellow" />
            <span className="c-mockupScreen__dot c-mockupScreen__dot--green" />
          </div>
          <div className="c-mockupScreen__browserBar u-fontMono">
            <span>🔒</span>
            <span>{activeScreen.route}</span>
          </div>
          <div className="c-mockupScreen__actions">
            {t(`projects.items.${projectId}.live_url`) && (
              <a 
                href={t(`projects.items.${projectId}.live_url`)}
                target="_blank" 
                rel="noopener noreferrer" 
                className="c-mockupScreen__actionBtn u-fontMono"
              >
                <ExternalLink size={12} />
                <span>{t('project_detail.live_app_btn') || 'APP AO VIVO ↗'}</span>
              </a>
            )}
            <button 
              type="button" 
              className="c-mockupScreen__actionBtn u-fontMono"
              onClick={() => setLightboxOpen(true)}
            >
              <Maximize2 size={13} />
              <span>{t('project_detail.expand_btn') || 'EXPANDIR'}</span>
            </button>
          </div>
        </div>

        <div className="c-mockupScreen__stageContainer">
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

          <div className="c-mockupScreen__hint u-fontMono">
            <Maximize2 size={12} />
            <span>CLIQUE NO CARD PARA AMPLIAR</span>
          </div>
        </div>

        <div className="c-mockupScreen__footer">
          <div className="c-mockupScreen__metaRow">
            <div className="c-mockupScreen__titleBlock">
              <span className="c-mockupScreen__tag u-fontMono">{activeScreen.tag}</span>
              <h3 className="c-mockupScreen__screenTitle u-fontDisplay">{activeScreen.title}</h3>
            </div>
            <span className="c-mockupScreen__counter u-fontMono">
              {String(activeScreenIndex + 1).padStart(2, '0')} // {String(currentScreens.length).padStart(2, '0')}
            </span>
          </div>
          <p className="c-mockupScreen__caption">{activeScreen.caption}</p>
        </div>

        <AnimatePresence>
          {lightboxOpen && (
            <motion.div 
              className="c-lightboxBackdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxOpen(false)}
            >
              <div 
                className="c-lightboxModal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="c-lightboxModal__header u-fontMono">
                  <div className="c-lightboxModal__headerLeft">
                    <span className="c-mockupScreen__tag">{activeScreen.tag}</span>
                    <span>{activeScreen.title}</span>
                  </div>
                  <div className="c-lightboxModal__headerRight">
                    <span>
                      {String(activeScreenIndex + 1).padStart(2, '0')} / {String(currentScreens.length).padStart(2, '0')}
                    </span>
                    <button 
                      type="button" 
                      className="c-lightboxModal__closeBtn"
                      onClick={() => setLightboxOpen(false)}
                      aria-label="Fechar modal"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="c-lightboxModal__stage">
                  <img 
                    src={activeScreen.src} 
                    alt={activeScreen.title} 
                    className="c-lightboxModal__img"
                  />

                  <button
                    type="button"
                    className="c-lightboxModal__navBtn c-lightboxModal__navBtn--prev"
                    onClick={() => setActiveScreenIndex((prev) => (prev - 1 + currentScreens.length) % currentScreens.length)}
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    type="button"
                    className="c-lightboxModal__navBtn c-lightboxModal__navBtn--next"
                    onClick={() => setActiveScreenIndex((prev) => (prev + 1) % currentScreens.length)}
                    aria-label="Próximo"
                  >
                    <ChevronRight size={28} />
                  </button>
                </div>

                <div className="c-lightboxModal__captionBar">
                  <div className="c-lightboxModal__captionRoute u-fontMono">
                    <span>URL:</span> {activeScreen.route}
                  </div>
                  <p className="c-lightboxModal__captionDesc">{activeScreen.caption}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <article className="l-projectDetailTemplate">
      <header className="l-projectDetailTemplate__hero">
        <motion.div
          className="l-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="l-projectDetailTemplate__topNav">
            <a href="#/portfolio" className="l-projectDetailTemplate__backLink">
              <ArrowLeft size={16} />
              <span>{t('projects.back_to_portfolio') || 'Voltar para Portfólio'}</span>
              <Folder
                size={0.22}
                color="#3B82F6"
                className="l-projectDetailTemplate__folder"
              />
            </a>
          </div>

          <div className="l-projectDetailTemplate__titleRow">
            <h1 className="l-projectDetailTemplate__title u-fontDisplay">
              {t(`projects.items.${projectId}.title`)}
            </h1>
            <span className="l-projectDetailTemplate__category">
              {t(`projects.items.${projectId}.category`)}
            </span>
          </div>

          <p className="l-projectDetailTemplate__subtitle">
            {t(`projects.items.${projectId}.short_desc`)}
          </p>

          {t(`projects.items.${projectId}.metric_highlight`) && (
            <div className="l-projectDetailTemplate__metricBar">
              <div>
                <span className="l-projectDetailTemplate__metricTag">
                  {t('project_detail.metric_label') || 'ENGENHARIA & IMPACTO // MÉTRICA DE PRODUÇÃO'}
                </span>
                <p className="l-projectDetailTemplate__metricText">
                  {t(`projects.items.${projectId}.metric_highlight`)}
                </p>
              </div>
            </div>
          )}

          <div className="l-projectDetailTemplate__actions">
            {t(`projects.items.${projectId}.live_url`) && (
              <ButtonCta 
                href={t(`projects.items.${projectId}.live_url`)} 
                target="_blank" 
                rel="noopener noreferrer" 
                variant="primary"
                icon={<ExternalLink size={16} />}
              >
                <span>{t('projects.live_demo') || 'Aplicação ao Vivo'} ↗</span>
              </ButtonCta>
            )}
            <ButtonCta 
              href={t(`projects.items.${projectId}.repo_url`) || 'https://github.com/Filipiss'} 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="outline"
              icon={<GithubIcon size={18} />}
            >
              <span>{t(`projects.items.${projectId}.repo_type`) || 'Repositório GitHub'} ↗</span>
            </ButtonCta>
          </div>
        </motion.div>
      </header>

      <motion.nav
        className="l-projectDetailTemplate__subnav"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="l-container l-projectDetailTemplate__subnavContainer">
          <a href={`#/project/${projectId}#intro`} onClick={(e) => handleSubLinkClick(e, 'intro')} className="l-projectDetailTemplate__subnavLink">
            {t('project_detail.subnav_overview') || 'Visão Geral'}
          </a>
          <a href={`#/project/${projectId}#stack`} onClick={(e) => handleSubLinkClick(e, 'stack')} className="l-projectDetailTemplate__subnavLink">
            {t('project_detail.subnav_stack') || 'Tecnologias'}
          </a>
          <a href={`#/project/${projectId}#architecture`} onClick={(e) => handleSubLinkClick(e, 'architecture')} className="l-projectDetailTemplate__subnavLink">
            {t('project_detail.subnav_architecture') || 'Arquitetura'}
          </a>
          <a href={`#/project/${projectId}#challenges`} onClick={(e) => handleSubLinkClick(e, 'challenges')} className="l-projectDetailTemplate__subnavLink">
            {t('project_detail.subnav_challenges') || 'Desafios & Soluções'}
          </a>
          <a href={`#/project/${projectId}#screenshots`} onClick={(e) => handleSubLinkClick(e, 'screenshots')} className="l-projectDetailTemplate__subnavLink">
            {t('project_detail.subnav_visual') || 'Interface / Telas'}
          </a>
        </div>
      </motion.nav>

      <motion.div
        className="l-container l-projectDetailTemplate__content"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <section id="detail-intro" className="l-projectDetailTemplate__section">
          <div className="l-projectDetailTemplate__sectionHeader">
            <BookOpen size={22} className="u-colorAccent" />
            <h2>{t('project_detail.overview_title') || 'Visão Geral do Projeto'}</h2>
          </div>
          <p>{t(`projects.items.${projectId}.overview`) || t(`projects.items.${projectId}.short_desc`)}</p>
        </section>

        <section id="detail-stack" className="l-projectDetailTemplate__section">
          <div className="l-projectDetailTemplate__sectionHeader">
            <Settings size={22} className="u-colorAccent" />
            <h2>{t('project_detail.stack_title') || 'Tecnologias & Execução'}</h2>
          </div>
          <p>
            {t(`projects.items.${projectId}.stack_text`) || 'Construído com foco em código limpo, tipagem estrita com TypeScript, arquitetura desacoplada e alta velocidade de resposta tanto no servidor quanto na interface.'}
          </p>
        </section>

        <section id="detail-architecture" className="l-projectDetailTemplate__section">
          <div className="l-projectDetailTemplate__sectionHeader">
            <Award size={22} className="u-colorAccent" />
            <h2>{t('project_detail.architecture_title') || 'Decisões Arquiteturais'}</h2>
          </div>
          <p>
            {t(`projects.items.${projectId}.architecture_text`) || 'Adoção de padrões modulares com separação clara entre camada de apresentação, cliente HTTP e lógica de negócios.'}
          </p>
        </section>

        <section id="detail-challenges" className="l-projectDetailTemplate__section">
          <div className="l-projectDetailTemplate__sectionHeader">
            <ShieldAlert size={22} className="u-colorAccent" />
            <h2>{t('project_detail.challenges_title') || 'Desafios Superados'}</h2>
          </div>
          <p>
            {t(`projects.items.${projectId}.challenges_text`) || 'Garantia de consistência no estado reativo, persistência relacional sem gargalos e interface acessível com performance sólida em todas as resoluções.'}
          </p>
        </section>

        <section id="detail-screenshots" className="l-projectDetailTemplate__section">
          <div className="l-projectDetailTemplate__sectionHeader">
            <ExternalLink size={22} className="u-colorAccent" />
            <h2>{t('project_detail.visual_title') || 'Arquitetura Visual'}</h2>
          </div>
          <div className="l-projectDetailTemplate__gallery">
            {renderScreenshotsSection()}
          </div>
        </section>
      </motion.div>

      <footer className="l-projectDetailTemplate__nav">
        <div className="l-container l-projectDetailTemplate__navContainer">
          <a href={`#/project/${prevId}`} className="l-projectDetailTemplate__navBtn">
            <ArrowLeft size={18} />
            <span>
              <small>{t('project_detail.prev_project') || 'PROJETO ANTERIOR'}</small>
              <strong>{t(`projects.items.${prevId}.title`)}</strong>
            </span>
          </a>

          <a href={`#/project/${nextId}`} className="l-projectDetailTemplate__navBtn l-projectDetailTemplate__navBtn--next">
            <span>
              <small>{t('project_detail.next_project') || 'PRÓXIMO PROJETO'}</small>
              <strong>{t(`projects.items.${nextId}.title`)}</strong>
            </span>
            <ArrowRight size={18} />
          </a>
        </div>
      </footer>
    </article>
  );
};

export default ProjectDetailTemplate;
