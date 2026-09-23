import { useState, useEffect, FC } from 'react';
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

export const ProjectsSection: FC = () => {
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

  if (activeProject.id !== prevActiveProjectId) {
    setPrevActiveProjectId(activeProject.id);
    setCurrentImageIndex(0);
  }

  useEffect(() => {
    if (!projectScreens || projectScreens.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % projectScreens.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeProject.id, projectScreens.length]);

  return (
    <section id="work" className="l-section c-projectsSection">
      <div className="l-container">
        <div className="c-projectsSection__header">
          <div className="c-projectsSection__kicker u-fontMono">
            <span className="c-projectsSection__kickerNum">01 //</span>
            <span>{t('projects.kicker').replace(/^[0-9]+\s*\/\/\s*/, '')}</span>
          </div>

          <div className="c-projectsSection__titleRow">
            <div>
              <h2 className="c-projectsSection__heading u-fontDisplay">{t('projects.title')}</h2>
              <p className="c-projectsSection__subheading">{t('projects.subtitle')}</p>
            </div>

            <button
              type="button"
              onClick={handleGoToPortfolio}
              className="c-projectsSection__archiveLink u-fontMono"
            >
              <span>{t('projects.view_all')}</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        <div className="c-projectsSection__grid">
          <div className="c-projectsSection__list">
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
                  className={`c-projectsSection__row ${isHovered ? 'isActive' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver case study ${title}`}
                >
                  <div className="c-projectsSection__rowTopline u-fontMono">
                    <span className="c-projectsSection__numBadge">{item.num} //</span>
                    <span className="c-projectsSection__categoryBadge">{category}</span>
                    <span className="c-projectsSection__yearBadge">{year}</span>
                  </div>

                  <div className="c-projectsSection__rowMain">
                    <h3 className="c-projectsSection__headline u-fontDisplay">
                      {title}
                    </h3>
                    <p className="c-projectsSection__descLine">
                      {shortDesc}
                    </p>
                  </div>

                  <div className="c-projectsSection__rowFooter u-fontMono">
                    <div className="c-projectsSection__tagsGroup">
                      {item.techTags.map((tag, idx) => (
                        <span key={idx} className="c-projectsSection__techChip">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="c-projectsSection__actionSlot">
                      <span className="c-projectsSection__ctaText">{t('projects.view_project')}</span>
                      <span className="c-projectsSection__ctaArrow">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>

                  <div className="c-projectsSection__mobileStrip">
                    <div className="c-projectsSection__mobileCanvas">
                      <span className="u-fontMono c-projectsSection__mobileTagline">{tagline}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="c-projectsSection__previewColumn" aria-hidden="true">
            <div className="c-projectsSection__stickyFrame">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className={`c-projectsSection__previewCard c-projectsSection__previewCard--${activeProject.id}`}
                  onClick={() => handleProjectClick(activeProject.id)}
                >
                  <div className="c-projectsSection__previewTopBar u-fontMono">
                    <span className="c-projectsSection__previewStatusTag">CASE PREVIEW // {activeProject.num}</span>
                    {projectScreens.length > 0 && (
                      <span className="c-projectsSection__previewCounter u-fontMono">
                        {String(currentImageIndex + 1).padStart(2, '0')} / {String(projectScreens.length).padStart(2, '0')}
                      </span>
                    )}
                    <span className="c-projectsSection__previewActionHint u-fontMono">{t('projects.view_project')} ↗</span>
                  </div>

                  <div className="c-projectsSection__artworkArea">
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
                          className="c-projectsSection__artworkImg"
                          draggable={false}
                        />
                      )}
                    </AnimatePresence>
                    <div className="c-projectsSection__artworkOverlay" />
                    <div className="c-projectsSection__progressBar">
                      <motion.div
                        key={`${activeProject.id}-${currentImageIndex}`}
                        className="c-projectsSection__progressFill"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                      />
                    </div>
                  </div>

                  <div className="c-projectsSection__bottomCaption">
                    {projectScreens[currentImageIndex]?.tag && (
                      <span className="c-projectsSection__captionTag u-fontMono">
                        {projectScreens[currentImageIndex].tag}
                      </span>
                    )}
                    <h4 className="c-projectsSection__captionTitle u-fontDisplay">
                      {projectScreens[currentImageIndex]?.title || t(`projects.items.${activeProject.id}.title`)}
                    </h4>
                    <p className="c-projectsSection__captionTagline u-fontMono">
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
};

export default ProjectsSection;
