import { useState, useEffect, FC } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import './HeaderNav.css';

export interface HeaderNavProps {
  currentProjectId?: string | null;
  onOpenCvModal?: () => void;
}

export const HeaderNav: FC<HeaderNavProps> = ({ currentProjectId, onOpenCvModal }) => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);

    if (currentProjectId || window.location.hash.startsWith('#/project/') || window.location.hash === '#/portfolio') {
      window.location.hash = `#/${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToPortfolio = () => {
    setMobileMenuOpen(false);
    window.location.hash = '#/portfolio';
  };

  return (
    <header className={`c-headerNav ${scrolled ? 'isScrolled' : ''}`}>
      <div className="l-container c-headerNav__container">
        <div
          className="c-headerNav__brand"
          onClick={() => scrollToSection('home')}
          role="button"
          tabIndex={0}
        >
          <div className="c-headerNav__brandMark" aria-hidden="true">
            <img src="/favicon.svg" alt="FS Logo" className="c-headerNav__logoImg" />
          </div>
          <span className="c-headerNav__brandName u-fontDisplay">{t('nav.brand_name')}</span>
        </div>

        <nav className="c-headerNav__nav u-fontMono">
          <button type="button" onClick={() => scrollToSection('experience')} className="c-headerNav__navLink">
            {t('nav.experience')}
          </button>
          <button type="button" onClick={() => scrollToSection('stack')} className="c-headerNav__navLink">
            {t('nav.stack')}
          </button>
          <button type="button" onClick={() => scrollToSection('about')} className="c-headerNav__navLink">
            {t('nav.about')}
          </button>
          <button type="button" onClick={() => scrollToSection('contact')} className="c-headerNav__navLink">
            {t('nav.contact')}
          </button>
          <button type="button" onClick={goToPortfolio} className="c-headerNav__navLink">
            {t('nav.portfolio')}
          </button>
          <button
            type="button"
            onClick={onOpenCvModal}
            className="c-headerNav__navLink c-headerNav__navLink--cv u-fontMono"
            title={t('cv_modal.title')}
          >
            <span>{t('nav.cv')}</span>
            <ArrowUpRight size={13} />
          </button>
        </nav>

        <div className="c-headerNav__actions u-fontMono">
          <div className="c-headerNav__langSegmented" role="group" aria-label="Idioma">
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              className={`c-headerNav__langBtn ${language === 'pt' ? 'isActive' : ''}`}
              aria-pressed={language === 'pt'}
            >
              PT-BR
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`c-headerNav__langBtn ${language === 'en' ? 'isActive' : ''}`}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="c-headerNav__utilBtn"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="c-headerNav__mobileToggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="c-headerNav__mobileDrawer">
          <div className="l-container c-headerNav__mobileInner u-fontMono">
            <div className="c-headerNav__mobileTopRow">
              <span className="c-headerNav__mobileTag">// NAVEGAÇÃO</span>
              <div className="c-headerNav__langSegmented" role="group" aria-label="Idioma">
                <button
                  type="button"
                  onClick={() => setLanguage('pt')}
                  className={`c-headerNav__langBtn ${language === 'pt' ? 'isActive' : ''}`}
                >
                  PT-BR
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`c-headerNav__langBtn ${language === 'en' ? 'isActive' : ''}`}
                >
                  EN
                </button>
              </div>
            </div>

            <div className="c-headerNav__mobileLinksList">
              <button type="button" onClick={() => scrollToSection('experience')} className="c-headerNav__mobileLink">
                <span className="c-headerNav__mobileNum">01 //</span>
                <span className="c-headerNav__mobileLabel">{t('nav.experience')}</span>
              </button>
              <button type="button" onClick={() => scrollToSection('stack')} className="c-headerNav__mobileLink">
                <span className="c-headerNav__mobileNum">02 //</span>
                <span className="c-headerNav__mobileLabel">{t('nav.stack')}</span>
              </button>
              <button type="button" onClick={() => scrollToSection('about')} className="c-headerNav__mobileLink">
                <span className="c-headerNav__mobileNum">03 //</span>
                <span className="c-headerNav__mobileLabel">{t('nav.about')}</span>
              </button>
              <button type="button" onClick={() => scrollToSection('contact')} className="c-headerNav__mobileLink">
                <span className="c-headerNav__mobileNum">04 //</span>
                <span className="c-headerNav__mobileLabel">{t('nav.contact')}</span>
              </button>
              <button type="button" onClick={goToPortfolio} className="c-headerNav__mobileLink">
                <span className="c-headerNav__mobileNum">05 //</span>
                <span className="c-headerNav__mobileLabel">{t('nav.portfolio')}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCvModal) onOpenCvModal();
                }}
                className="c-headerNav__mobileLink c-headerNav__mobileLink--cv"
              >
                <span className="c-headerNav__mobileNum">06 //</span>
                <span className="c-headerNav__mobileLabel">{t('nav.cv')}</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
