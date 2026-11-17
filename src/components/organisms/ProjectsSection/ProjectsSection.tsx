import { useState, FC, MouseEvent } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ExternalLink } from 'lucide-react';
import { PROJECT_SCREENS_MAP, EMPTY_SCREENS } from '../../../data/projectsScreenshots';
import { PROJECTS, projectNumber } from '../../../data/projects';
import './ProjectsSection.css';

/** Tags que mudam com o idioma; as demais são nomes de tecnologia e ficam iguais. */
const TAG_PT: Record<string, string> = {
  'SSE Streaming': 'Transmissão SSE',
};

const handleOpenCaseStudy = (id: string, e?: MouseEvent) => {
  if (e) e.stopPropagation();
  window.location.hash = `#/project/${id}`;
};

const handleGoToPortfolio = () => {
  window.location.hash = '#/portfolio';
};

export const ProjectsSection: FC = () => {
  const { t, tOptional, language } = useLanguage();
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" className="l-section c-projectsSection">
      <div className="l-container">
        {/* Section Header Row matching reference */}
        <div className="c-projectsSection__header">
          <div className="c-projectsSection__titleCol">
            <div className="c-projectsSection__kickerBadge u-fontMono">
              <span className="c-projectsSection__kickerDot" />
              <span>{t('projects.kicker').replace(/^[0-9]+\s*\/\/\s*/, '')}</span>
            </div>

            <h2 className="c-projectsSection__heading u-fontDisplay">
              {t('projects.title').split('&')[0]} &{' '}
              <span className="c-projectsSection__headingAccent">
                {t('projects.title').split('&')[1] || 'Obras'}
              </span>
            </h2>

            <p className="c-projectsSection__subheading">{t('projects.subtitle')}</p>
          </div>

          <div className="c-projectsSection__actionCol">
            <button
              type="button"
              onClick={handleGoToPortfolio}
              className="c-projectsSection__viewAllBtn"
            >
              <span>{t('projects.view_all')}</span>
              <span className="c-projectsSection__viewAllCircle">
                <ArrowRight size={13} />
              </span>
            </button>
          </div>
        </div>

        {/* Notched Cyber Cards List */}
        <div className="c-projectsSection__list">
          {PROJECTS.map((project) => {
            const isExpanded = activeProjectId === project.id;
            const num = projectNumber(project.id);
            const title = t(`projects.items.${project.id}.title`);
            const category = t(`projects.items.${project.id}.category`);
            const shortDesc = t(`projects.items.${project.id}.short_desc`);
            const metric = tOptional(`projects.items.${project.id}.metric_highlight`);
            const liveUrl = tOptional(`projects.items.${project.id}.live_url`);
            const liveLabel = tOptional(`projects.items.${project.id}.live_label`) ?? t('projects.live_demo');
            const screens = PROJECT_SCREENS_MAP[project.id] || EMPTY_SCREENS;

            return (
              <motion.div
                key={project.id}
                layout
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`c-projectsSection__card ${isExpanded ? 'isExpanded' : 'isCollapsed'}`}
                onClick={() => setActiveProjectId(project.id)}
              >
                {/* Collapsed Bar State */}
                {!isExpanded && (
                  <div className="c-projectsSection__collapsedBar">
                    <div className="c-projectsSection__collapsedLeft">
                      <span className="c-projectsSection__numBadge u-fontMono">{num}.</span>
                      <h3 className="c-projectsSection__collapsedTitle u-fontDisplay">{title}</h3>
                      <span className="c-projectsSection__categoryPill u-fontMono">{category}</span>
                    </div>

                    <button
                      type="button"
                      className="c-projectsSection__arrowBtn"
                      aria-label={`${t('projects.expand_aria')}: ${title}`}
                      aria-expanded={false}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                )}

                {/* Expanded State with Notched Cyber Geometry */}
                {isExpanded && (
                  <div className="c-projectsSection__expandedContent">
                    <div className="c-projectsSection__expandedTopRow">
                      <div className="c-projectsSection__titleGroup">
                        <div className="c-projectsSection__numRow u-fontMono">
                          <span className="c-projectsSection__expandedNum">{num}.</span>
                          <span className="c-projectsSection__categoryBadge">{category}</span>
                        </div>
                        <h3 className="c-projectsSection__expandedTitle u-fontDisplay">{title}</h3>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleOpenCaseStudy(project.id, e)}
                        className="c-projectsSection__arrowBtn c-projectsSection__arrowBtn--active"
                        title={t('projects.view_project')}
                        aria-label={`${t('projects.view_project')}: ${title}`}
                      >
                        <ArrowUpRight size={20} />
                      </button>
                    </div>

                    {/* Skill / Tech Tags */}
                    <div className="c-projectsSection__tagsRow">
                      {project.tags.map((tag) => (
                        <span key={tag} className="c-projectsSection__techTag u-fontMono">
                          {language === 'pt' ? TAG_PT[tag] ?? tag : tag}
                        </span>
                      ))}
                    </div>

                    {/* Description Paragraph */}
                    <p className="c-projectsSection__desc">{shortDesc}</p>

                    {/* Highlight Metric Strip */}
                    {metric && (
                      <div className="c-projectsSection__metricBanner u-fontMono">
                        <span className="c-projectsSection__metricDot" />
                        <span className="c-projectsSection__metricText">{metric}</span>
                      </div>
                    )}

                    {/* Preview Screenshot & Interactive Actions */}
                    <div className="c-projectsSection__bottomRow">
                      <div className="c-projectsSection__actionsGroup">
                        <button
                          type="button"
                          onClick={(e) => handleOpenCaseStudy(project.id, e)}
                          className="c-projectsSection__primaryAction"
                        >
                          <span>{t('projects.view_project')}</span>
                          <span className="c-projectsSection__actionCircle">
                            <ArrowRight size={13} />
                          </span>
                        </button>

                        {liveUrl && (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="c-projectsSection__secondaryAction"
                          >
                            <span>{liveLabel}</span>
                            <span className="c-projectsSection__secondaryCircle">
                              <ExternalLink size={13} />
                            </span>
                          </a>
                        )}
                      </div>

                      {/* Small visual thumbnail indicator */}
                      {screens.length > 0 && (
                        <div
                          className="c-projectsSection__thumbPreview"
                          onClick={(e) => handleOpenCaseStudy(project.id, e)}
                          title={t('projects.open_case_hint')}
                        >
                          <img
                            src={screens[0].src}
                            alt={screens[0].title}
                            className="c-projectsSection__thumbImg"
                          />
                          <div className="c-projectsSection__thumbOverlay">
                            <span className="u-fontMono">{screens.length} {t('projects.screens_label')} ↗</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
