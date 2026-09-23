import { FC } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import './experienceSection.css';

interface ExperienceItemData {
  company: string;
  role: string;
  period: string;
  stack: string;
  desc: string;
}

export const ExperienceSection: FC = () => {
  const { t } = useLanguage();
  const itemsRaw = t('experience.items');
  const items: ExperienceItemData[] = Array.isArray(itemsRaw) ? itemsRaw : [
    {
      company: 'Projetos Freelance',
      role: 'Frontend / Creative Developer',
      period: 'Irlanda (Remoto)',
      stack: 'React · TypeScript · UI/UX Design · Performance · Web & App Solutions',
      desc: 'Projetos internacionais focados em entregar soluções web, aplicativos e produtos digitais que impulsionam o crescimento de negócios. Atuação no desenvolvimento de interfaces interativas de alto impacto visual, design de produto e experiências digitais modernas.'
    },
    {
      company: 'Eitree',
      role: 'Full Stack Developer',
      period: '2025 — 2026',
      stack: 'Python · Flask · SQLAlchemy · React · TypeScript · Docker',
      desc: 'Desenvolvimento e manutenção de aplicações web full stack, modelagem de banco de dados relacional, criação de APIs RESTful e construção de interfaces interativas com rigor em clareza de código e arquitetura modular.'
    }
  ];

  return (
    <section id="experience" className="l-section c-experienceSection">
      <div className="l-container">
        <div className="c-experienceSection__kicker u-fontMono">
          <span className="c-experienceSection__kickerNum">02 //</span>
          <span>{t('experience.kicker').replace(/^[0-9]+\s*\/\/\s*/, '')}</span>
        </div>

        <h2 className="c-experienceSection__heading u-fontDisplay">{t('experience.title')}</h2>

        <div className="c-experienceSection__list">
          {items.map((exp, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
              className="c-experienceSection__row"
            >
              <div className="c-experienceSection__timelineCol u-fontMono">
                <span className="c-experienceSection__periodBadge">{exp.period}</span>
                <span className="c-experienceSection__indexBadge">0{index + 1} //</span>
              </div>

              <div className="c-experienceSection__narrativeCol">
                <div className="c-experienceSection__titleRow">
                  <h3 className="c-experienceSection__companyHeading u-fontDisplay">{exp.company}</h3>
                  <span className="c-experienceSection__roleTag u-fontMono">{exp.role}</span>
                </div>

                <p className="c-experienceSection__narrativeText">{exp.desc}</p>
              </div>

              <div className="c-experienceSection__stackCol u-fontMono">
                <span className="c-experienceSection__stackLabel">{t('experience.stack_label') || 'STACK & PRÁTICAS //'}</span>
                <span className="c-experienceSection__stackContent">{exp.stack}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
