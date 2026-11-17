import { FC } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import filipiAvatar from '../../../assets/filipi_avatar.jpg';
import TechIcon from '../../atoms/TechIcons/TechIcons';
import './HeroSection.css';

const TECH_LIST = [
  'html5',
  'css3',
  'js',
  'ts',
  'react',
  'python',
  'fastapi',
  'flask',
  'docker',
  'postgresql',
  'tailwind',
  'git'
];

export const HeroSection: FC = () => {
  const { t, language } = useLanguage();

  const handleScrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCvModal = () => {
    window.dispatchEvent(new CustomEvent('open-cv-modal'));
  };

  return (
    <section id="home" className="c-heroSection">
      <div className="l-container c-heroSection__container">
        <div className="c-heroSection__layout">
          {/* Left Column: Info & Actions */}
          <div className="c-heroSection__leftCol">
            {/* Role Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="c-heroSection__badgeWrapper"
            >
              <div className="c-heroSection__roleBadge u-fontMono">
                <span className="c-heroSection__badgeDot" />
                <span>{t('hero.role_badge')}</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="c-heroSection__headingGroup"
            >
              <h1 className="c-heroSection__title u-fontDisplay">
                <span className="c-heroSection__greeting">{t('hero.greeting')} </span>
                <span className="c-heroSection__name">
                  {t('about.filipi_name')}
                </span>
                <br />
                <span className="c-heroSection__tagline">
                  {t('hero.headline_main')}
                </span>
              </h1>
            </motion.div>

            {/* 1-Sentence Summary Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="c-heroSection__bioText"
            >
              {t('hero.statement_print')}
            </motion.p>

            {/* Dual CTA Buttons (Matching print style with pill + circular icon) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="c-heroSection__actionsRow"
            >
              <button
                type="button"
                onClick={handleScrollToWork}
                className="c-heroSection__cta c-heroSection__cta--primary"
              >
                <span>{t('hero.cta_work')}</span>
                <span className="c-heroSection__ctaCircle">
                  <ArrowRight size={14} />
                </span>
              </button>

              <button
                type="button"
                onClick={handleOpenCvModal}
                className="c-heroSection__cta c-heroSection__cta--secondary"
              >
                <span>{t('hero.cta_cv')}</span>
                <span className="c-heroSection__ctaCircle c-heroSection__ctaCircle--secondary">
                  <Download size={14} />
                </span>
              </button>
            </motion.div>

            {/* Technologies Row with Hand-drawn Doodle Arrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="c-heroSection__techBlock"
            >
              <span className="c-heroSection__techLabel u-fontMono">
                {t('hero.meta_label')}
              </span>

              <div className="c-heroSection__techRowWrapper">
                <div className="c-heroSection__techIconsRow">
                  {TECH_LIST.slice(0, 7).map((tech) => (
                    <div key={tech} className="c-heroSection__techIconBox" title={tech.toUpperCase()}>
                      <TechIcon name={tech} size={26} />
                    </div>
                  ))}
                </div>

                {/* Hand-drawn curved doodle arrow pointing towards character */}
                <div className="c-heroSection__doodleArrowWrapper" aria-hidden="true">
                  <svg width="56" height="42" viewBox="0 0 60 45" fill="none" className="c-heroSection__doodleSvg">
                    <path
                      d="M 6 36 C 18 12, 38 10, 52 24"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 42 16 L 53 25 L 43 28"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Character Portrait + Glowing Circle Backdrop + Floating Code Card */}
          <div className="c-heroSection__rightCol">
            {/* Glowing Backdrop Circle with Dot Matrix */}
            <div className="c-heroSection__circleBackdrop">
              <div className="c-heroSection__dotGrid" aria-hidden="true" />
            </div>

            {/* Character Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="c-heroSection__portraitWrapper"
            >
              <img
                src={filipiAvatar}
                alt={t('about.filipi_name')}
                className="c-heroSection__portrait"
              />
            </motion.div>

            {/* Floating Code Card with Scaled Header */}
            <motion.div
              initial={{ opacity: 0, x: 25, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="c-heroSection__codeCard"
            >
              <div className="c-heroSection__codeHeader">
                <span className="c-heroSection__codeTag u-fontMono">
                  &lt;/&gt; {language === 'pt' ? 'Código' : 'Code'}
                </span>
                <span className="c-heroSection__codeDot" />
              </div>

              <pre className="c-heroSection__codePre u-fontMono">
                <code>
                  {language === 'pt' ? (
                    <>
                      <span className="tok-keyword">const</span> <span className="tok-var">desenvolvedor</span> = &#123;{'\n'}
                      {'  '}<span className="tok-prop">nome</span>: <span className="tok-str">"Filipi Soares"</span>,{'\n'}
                      {'  '}<span className="tok-prop">habilidades</span>: [<span className="tok-str">"React"</span>, <span className="tok-str">"TS"</span>, <span className="tok-str">"Python"</span>, <span className="tok-str">"Docker"</span>],{'\n'}
                      {'  '}<span className="tok-prop">missao</span>: <span className="tok-str">"Construir para a web"</span>{'\n'}
                      &#125;;
                    </>
                  ) : (
                    <>
                      <span className="tok-keyword">const</span> <span className="tok-var">developer</span> = &#123;{'\n'}
                      {'  '}<span className="tok-prop">name</span>: <span className="tok-str">"Filipi Soares"</span>,{'\n'}
                      {'  '}<span className="tok-prop">skills</span>: [<span className="tok-str">"React"</span>, <span className="tok-str">"TS"</span>, <span className="tok-str">"Python"</span>, <span className="tok-str">"Docker"</span>],{'\n'}
                      {'  '}<span className="tok-prop">passion</span>: <span className="tok-str">"Building for the web"</span>{'\n'}
                      &#125;;
                    </>
                  )}
                </code>
              </pre>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee with Technology Icons & Adaptable Light Theme */}
      <div className="c-heroSection__marquee">
        <div className="c-heroSection__marqueeTrack">
          {[...Array(4)].map((_, trackIdx) => (
            <div key={trackIdx} className="c-heroSection__marqueeContent" aria-hidden={trackIdx > 0}>
              {TECH_LIST.map((tech) => (
                <div key={tech} className="c-heroSection__marqueeIconItem" title={tech.toUpperCase()}>
                  <TechIcon name={tech} size={28} />
                  <span className="c-heroSection__marqueeTechName u-fontMono">
                    {tech.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
