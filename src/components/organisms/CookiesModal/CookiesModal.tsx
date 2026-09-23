import { useState, useEffect, FC } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonCta } from '../../atoms/buttonCta/buttonCta';
import './CookiesModal.css';

export interface CookiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookiesModal: FC<CookiesModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);

  const [preferences, setPreferences] = useState({
    functional: true,
    performance: false,
    analytics: true
  });

  useEffect(() => {
    const isConsentGiven = localStorage.getItem('cookie_consent');
    if (!isConsentGiven) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
    if (isOpen) onClose();
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie_consent', 'custom');
    localStorage.setItem('cookie_preferences', JSON.stringify(preferences));
    setShowBanner(false);
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="c-cookiesBanner"
          >
            <div className="c-cookiesBanner__content">
              <ShieldCheck size={24} className="c-cookiesBanner__icon" />
              <p className="c-cookiesBanner__text">
                {t('footer.cookies_desc')}
              </p>
            </div>
            <div className="c-cookiesBanner__actions">
              <ButtonCta
                variant="secondary"
                size="sm"
                onClick={onClose}
              >
                {t('footer.cookies_settings')}
              </ButtonCta>
              <ButtonCta
                variant="primary"
                size="sm"
                onClick={handleAcceptAll}
              >
                {t('footer.cookies_accept')}
              </ButtonCta>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="c-cookiesModal__overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="c-cookiesModal__dialog"
            >
              <div className="c-cookiesModal__header">
                <div className="c-cookiesModal__title">
                  <ShieldCheck size={22} />
                  <h3>{t('footer.cookies_title')}</h3>
                </div>
                <button onClick={onClose} className="c-cookiesModal__closeBtn" aria-label="Close">
                  <X size={20} />
                </button>
              </div>

              <div className="c-cookiesModal__body">
                <p className="c-cookiesModal__description">
                  {t('footer.cookies_panel_desc')}
                </p>

                <div className="c-cookiesModal__option">
                  <div className="c-cookiesModal__optionInfo">
                    <strong>Necessários & Funcionais</strong>
                    <p>Armazena seu tema visual (Dark/Light) e a preferência de tradução de linguagem (PT/EN).</p>
                  </div>
                  <div className="c-cookiesModal__optionControl">
                    <input type="checkbox" checked={preferences.functional} disabled readOnly />
                    <span className="c-cookiesModal__badge">Ativo</span>
                  </div>
                </div>

                <div className="c-cookiesModal__option">
                  <div className="c-cookiesModal__optionInfo">
                    <strong>Performance da Engine</strong>
                    <p>Habilita caches de renderização e controle de taxa de quadro adaptativos.</p>
                  </div>
                  <div className="c-cookiesModal__optionControl">
                    <label className="c-cookiesModal__switch">
                      <input
                        type="checkbox"
                        checked={preferences.performance}
                        onChange={(e) => setPreferences({ ...preferences, performance: e.target.checked })}
                      />
                      <span className="c-cookiesModal__slider" />
                    </label>
                  </div>
                </div>

                <div className="c-cookiesModal__option">
                  <div className="c-cookiesModal__optionInfo">
                    <strong>Estatísticas Anônimas</strong>
                    <p>Ajuda-nos a entender o tráfego do portfólio de forma totalmente agregada e anônima.</p>
                  </div>
                  <div className="c-cookiesModal__optionControl">
                    <label className="c-cookiesModal__switch">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      />
                      <span className="c-cookiesModal__slider" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="c-cookiesModal__footer">
                <ButtonCta
                  variant="secondary"
                  size="md"
                  onClick={handleAcceptAll}
                >
                  {t('footer.cookies_accept_all')}
                </ButtonCta>
                <ButtonCta
                  variant="primary"
                  size="md"
                  onClick={handleSavePreferences}
                >
                  {t('footer.cookies_save')}
                </ButtonCta>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookiesModal;
