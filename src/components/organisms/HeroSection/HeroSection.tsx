import { FC } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import './heroSection.css';

export const HeroSection: FC = () => {
  const { t } = useLanguage();

  const handleScrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="c-heroSection">
      <div className="l-container c-heroSection__container">
        <div className="c-heroSection__metaRow u-fontMono">
          <span className="c-heroSection__kicker">
            {t('hero.kicker')}
          </span>
          <div className="c-heroSection__statusPill">
            <span className="c-heroSection__statusDot" />
            <span>{t('hero.status')}</span>
          </div>
        </div>

        <div className="c-heroSection__displayGroup">
          <div className="c-heroSection__lineWrapper">
            <motion.h1
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="c-heroSection__title u-fontDisplay"
            >
              {t('hero.title_line1')}
            </motion.h1>
          </div>

          <div className="c-heroSection__lineWrapper">
            <motion.h2
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="c-heroSection__subtitle u-fontDisplay"
            >
              {t('hero.title_line2')}
            </motion.h2>
          </div>
        </div>

        <div className="c-heroSection__lowerGrid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="c-heroSection__manifestoCol"
          >
            <p className="c-heroSection__statement">
              "{t('hero.statement')}"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="c-heroSection__actionCol"
          >
            <div className="c-heroSection__specialtyStrip u-fontMono">
              <span className="c-heroSection__specialtyLabel">{t('hero.meta_label')}</span>
              <span className="c-heroSection__specialtyTechs">{t('hero.meta_stack')}</span>
            </div>

            <button
              type="button"
              onClick={handleScrollToWork}
              className="c-heroSection__cta u-fontMono"
            >
              <span>{t('hero.cta_work')}</span>
              <span className="c-heroSection__ctaArrowSlot">
                <ArrowDown size={14} />
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
