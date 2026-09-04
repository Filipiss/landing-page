import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';
import { Download, X, ArrowUpRight, Globe } from 'lucide-react';
import './CvDownloadModal.css';

interface CvDownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CvDownloadModal({ isOpen, onClose }: CvDownloadModalProps) {
    const { t } = useLanguage();

    // Close on Escape key press
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
                    className="cv-modal-overlay"
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
                        className="cv-modal-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Title Row with Close Button */}
                        <div className="cv-modal-intro">
                            <div className="cv-modal-top-row">
                                <h3 id="cv-modal-title" className="cv-modal-title font-display">
                                    {t('cv_modal.title')}
                                </h3>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="cv-modal-close-btn"
                                    aria-label={t('cv_modal.close_aria')}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <p className="cv-modal-subtitle">
                                {t('cv_modal.subtitle')}
                            </p>
                        </div>

                        {/* Language Selection Grid */}
                        <div className="cv-modal-options-grid">
                            {/* Option 1: Portuguese */}
                            <a
                                href="/curriculo-filipi-soares-pt.pdf"
                                download="Curriculo_Filipi_Soares_PT.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cv-option-card"
                                onClick={onClose}
                            >
                                <div className="cv-option-top font-mono">
                                    <span className="cv-lang-badge">
                                        <Globe size={13} />
                                        {t('cv_modal.pt_tag')}
                                    </span>
                                </div>

                                <div className="cv-option-body">
                                    <h4 className="cv-option-title font-display">
                                        {t('cv_modal.pt_title')}
                                    </h4>
                                </div>

                                <div className="cv-option-action font-mono">
                                    <span className="action-text">{t('cv_modal.download_btn')}</span>
                                    <div className="action-icon-circle">
                                        <Download size={14} className="download-icon" />
                                        <ArrowUpRight size={14} className="arrow-icon" />
                                    </div>
                                </div>
                            </a>

                            {/* Option 2: English */}
                            <a
                                href="/resume-filipi-soares-en.pdf"
                                download="Resume_Filipi_Soares_EN.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cv-option-card cv-option-accent"
                                onClick={onClose}
                            >
                                <div className="cv-option-top font-mono">
                                    <span className="cv-lang-badge cv-badge-highlight">
                                        <Globe size={13} />
                                        {t('cv_modal.en_tag')}
                                    </span>
                                </div>

                                <div className="cv-option-body">
                                    <h4 className="cv-option-title font-display">
                                        {t('cv_modal.en_title')}
                                    </h4>
                                </div>

                                <div className="cv-option-action font-mono">
                                    <span className="action-text">{t('cv_modal.download_btn')}</span>
                                    <div className="action-icon-circle">
                                        <Download size={14} className="download-icon" />
                                        <ArrowUpRight size={14} className="arrow-icon" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
