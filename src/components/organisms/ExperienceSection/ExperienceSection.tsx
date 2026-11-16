import { FC } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import './ExperienceSection.css';

interface ExperienceItemData {
  company: string;
  role: string;
  period: string;
  stack: string;
  desc: string;
}

export const ExperienceSection: FC = () => {
  const { t, tRaw } = useLanguage();
  const items = tRaw<ExperienceItemData[]>('experience.items') ?? [];

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
                <span className="c-experienceSection__stackLabel">{t('experience.stack_label')}</span>
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
