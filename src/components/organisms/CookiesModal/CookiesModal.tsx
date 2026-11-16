import { useState, useEffect, FC } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonCta } from '../../atoms/buttonCta/buttonCta';
import { safeStorage } from '../../../utils/safeStorage';
import './CookiesModal.css';

export interface CookiesModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const CONSENT_KEY = 'cookie_consent';

/**
 * O site só usa armazenamento local essencial (tema, idioma e acessibilidade).
 * Não há analytics nem cookies de terceiros, então não existem categorias
 * opcionais para o visitante ligar ou desligar: o painel apenas informa.
 */
export const CookiesModal: FC<CookiesModalProps> = ({ isOpen, onOpen, onClose }) => {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(() => !safeStorage.get(CONSENT_KEY));

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleAcknowledge = () => {
    safeStorage.set(CONSENT_KEY, 'essential');
    setShowBanner(false);
    if (isOpen) onClose();
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
            role="region"
            aria-label={t('footer.cookies_title')}
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
                onClick={onOpen}
              >
                {t('footer.cookies_settings')}
              </ButtonCta>
              <ButtonCta
                variant="primary"
                size="sm"
                onClick={handleAcknowledge}
              >
                {t('footer.cookies_accept')}
              </ButtonCta>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="c-cookiesModal__overlay" onClick={onClose}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="c-cookiesModal__dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookies-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="c-cookiesModal__header">
                <div className="c-cookiesModal__title">
                  <ShieldCheck size={22} />
                  <h3 id="cookies-modal-title">{t('footer.cookies_title')}</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="c-cookiesModal__closeBtn"
                  aria-label={t('footer.cookies_close')}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="c-cookiesModal__body">
                <p className="c-cookiesModal__description">
                  {t('footer.cookies_panel_desc')}
                </p>

                <div className="c-cookiesModal__option">
                  <div className="c-cookiesModal__optionInfo">
                    <strong>{t('footer.cookies_essential_title')}</strong>
                    <p>{t('footer.cookies_essential_desc')}</p>
                  </div>
                  <div className="c-cookiesModal__optionControl">
                    <input
                      type="checkbox"
                      checked
                      disabled
                      readOnly
                      aria-label={t('footer.cookies_essential_title')}
                    />
                    <span className="c-cookiesModal__badge">{t('footer.cookies_always_on')}</span>
                  </div>
                </div>

                <div className="c-cookiesModal__option">
                  <div className="c-cookiesModal__optionInfo">
                    <strong>{t('footer.cookies_tracking_title')}</strong>
                    <p>{t('footer.cookies_tracking_desc')}</p>
                  </div>
                </div>
              </div>

              <div className="c-cookiesModal__footer">
                <ButtonCta
                  variant="primary"
                  size="md"
                  onClick={handleAcknowledge}
                >
                  {t('footer.cookies_accept')}
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
