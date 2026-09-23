import { MouseEvent, FC } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

export interface FooterProps {
  onOpenCookiesSettings: () => void;
}

export const Footer: FC<FooterProps> = ({ onOpenCookiesSettings }) => {
  const { t } = useLanguage();

  const handleBackToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="c-footer">
      <div className="l-container c-footer__container">
        <div className="c-footer__upperGrid">
          <div className="c-footer__identityCol">
            <span className="c-footer__brandTitle u-fontDisplay">FILIPI SOARES</span>
            <span className="c-footer__brandSub u-fontMono">{t('footer.role')}</span>
          </div>

          <div className="c-footer__linksCol u-fontMono">
            <span className="c-footer__linksHeader">// {t('footer.channels_header')}</span>
            <div className="c-footer__navStack">
              <a href="https://github.com/filipiss" target="_blank" rel="noopener noreferrer" className="c-footer__link">
                GITHUB ↗
              </a>
              <a href="https://www.linkedin.com/in/filipiss/" target="_blank" rel="noopener noreferrer" className="c-footer__link">
                LINKEDIN ↗
              </a>
              <a href="mailto:filipi.soares.silva@gmail.com" className="c-footer__link">
                EMAIL ↗
              </a>
              <button type="button" onClick={onOpenCookiesSettings} className="c-footer__linkBtn">
                {t('footer.cookies_settings')}
              </button>
            </div>
          </div>
        </div>

        <div className="c-footer__lowerStrip u-fontMono">
          <div className="c-footer__copyText">
            &copy; {new Date().getFullYear()}
          </div>

          <div className="c-footer__chicoSupervised">
            <span>{t('footer.supervised')}</span>
          </div>

          <a href="#top" onClick={handleBackToTop} className="c-footer__topAnchor" aria-label="Voltar ao topo">
            <span>{t('footer.back_to_top')}</span>
            <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
