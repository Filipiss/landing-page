import { useEffect, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { Download, X, ArrowUpRight, Globe } from 'lucide-react';
import './cvDownloadModal.css';

export interface CvDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvDownloadModal: FC<CvDownloadModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="c-cvModal__overlay"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="c-cvModal__card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="c-cvModal__intro">
              <div className="c-cvModal__topRow">
                <h3 id="cv-modal-title" className="c-cvModal__title u-fontDisplay">
                  {t('cv_modal.title')}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="c-cvModal__closeBtn"
                  aria-label={t('cv_modal.close_aria')}
                >
                  <X size={20} />
                </button>
              </div>
              <p className="c-cvModal__subtitle">
                {t('cv_modal.subtitle')}
              </p>
            </div>

            <div className="c-cvModal__optionsGrid">
              <a
                href="/curriculo-filipi-soares-pt.pdf"
                download="Curriculo_Filipi_Soares_PT.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="c-cvModal__optionCard"
                onClick={onClose}
              >
                <div className="c-cvModal__optionTop u-fontMono">
                  <span className="c-cvModal__langBadge">
                    <Globe size={13} />
                    {t('cv_modal.pt_tag')}
                  </span>
                </div>

                <div className="c-cvModal__optionBody">
                  <h4 className="c-cvModal__optionTitle u-fontDisplay">
                    {t('cv_modal.pt_title')}
                  </h4>
                </div>

                <div className="c-cvModal__optionAction u-fontMono">
                  <span>{t('cv_modal.download_btn')}</span>
                  <div className="c-cvModal__actionIconCircle">
                    <Download size={14} className="c-cvModal__downloadIcon" />
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </a>

              <a
                href="/resume-filipi-soares-en.pdf"
                download="Resume_Filipi_Soares_EN.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="c-cvModal__optionCard c-cvModal__optionCard--accent"
                onClick={onClose}
              >
                <div className="c-cvModal__optionTop u-fontMono">
                  <span className="c-cvModal__langBadge c-cvModal__langBadge--highlight">
                    <Globe size={13} />
                    {t('cv_modal.en_tag')}
                  </span>
                </div>

                <div className="c-cvModal__optionBody">
                  <h4 className="c-cvModal__optionTitle u-fontDisplay">
                    {t('cv_modal.en_title')}
                  </h4>
                </div>

                <div className="c-cvModal__optionAction u-fontMono">
                  <span>{t('cv_modal.download_btn')}</span>
                  <div className="c-cvModal__actionIconCircle">
                    <Download size={14} className="c-cvModal__downloadIcon" />
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CvDownloadModal;
