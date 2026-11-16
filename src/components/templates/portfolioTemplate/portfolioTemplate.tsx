import { useState, FC, ReactNode } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Clock, Terminal, MonitorCog, ArrowLeft } from 'lucide-react';
import ProjectCard from '../../molecules/ProjectCard/ProjectCard';
import { PROJECTS, ProjectCategory, ProjectIcon } from '../../../data/projects';
import './portfolioTemplate.css';

type Filter = 'all' | ProjectCategory;

const FILTERS: Filter[] = ['all', 'fullstack', 'ai', 'desktop'];

const ICONS: Record<ProjectIcon, ReactNode> = {
  clock: <Clock size={28} />,
  terminal: <Terminal size={28} />,
  monitor: <MonitorCog size={28} />,
};

const goToProject = (id: string) => {
  window.location.hash = `#/project/${id}`;
};

export const PortfolioTemplate: FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="l-portfolioTemplate">
      <div className="l-container">
        <header className="l-portfolioTemplate__header">
          <a href="#/" className="l-portfolioTemplate__backBtn u-fontMono">
            <ArrowLeft size={16} />
            {t('portfolio.back_to_home')}
          </a>
          <h1 className="l-portfolioTemplate__title u-fontDisplay">{t('portfolio.title')}</h1>
          <p className="l-portfolioTemplate__subtitle">{t('portfolio.subtitle')}</p>

          <div className="l-portfolioTemplate__filters u-fontMono" role="group" aria-label={t('portfolio.filter_label')}>
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`l-portfolioTemplate__filterBtn ${filter === f ? 'isActive' : ''}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {t(`portfolio.filter_${f}`)}
              </button>
            ))}
          </div>
        </header>

        <div className="l-portfolioTemplate__grid">
          {filteredProjects.map((proj, index) => (
            <ProjectCard
              key={proj.id}
              id={proj.id}
              tags={proj.tags}
              icon={ICONS[proj.icon]}
              category={t(`projects.items.${proj.id}.category`)}
              title={t(`projects.items.${proj.id}.title`)}
              shortDesc={t(`projects.items.${proj.id}.short_desc`)}
              viewProjectText={t('projects.view_project')}
              onClick={() => goToProject(proj.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioTemplate;
