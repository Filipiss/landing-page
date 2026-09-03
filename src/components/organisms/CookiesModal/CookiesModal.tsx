import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './CookiesModal.css';

interface CookiesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CookiesModal({ isOpen, onClose }: CookiesModalProps) {
    const { t } = useLanguage();
    const [showBanner, setShowBanner] = useState(false);

    // Mock options state for settings
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
            {/* 1. Bottom Consent Banner */}
            <AnimatePresence>
                {showBanner && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className="cookies-banner"
                    >
                        <div className="cookies-banner-content">
                            <ShieldCheck size={24} className="color-accent cookies-banner-icon" />
                            <p className="cookies-banner-text">
                                {t('footer.cookies_desc')}
                            </p>
                        </div>
                        <div className="cookies-banner-actions">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-outline btn-sm"
                            >
                                {t('footer.cookies_settings')}
                            </button>
                            <button
                                type="button"
                                onClick={handleAcceptAll}
                                className="btn btn-primary btn-sm"
                            >
                                {t('footer.cookies_accept')}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. Detailed Settings Preference Modal Dialog */}
            <AnimatePresence>
                {isOpen && (
                    <div className="modal-overlay">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="modal"
                        >
                            <div className="modal-header">
                                <div className="modal-header-title">
                                    <ShieldCheck size={22} className="color-accent" />
                                    <h3>{t('footer.cookies_title')}</h3>
                                </div>
                                <button onClick={onClose} className="modal-close-btn" aria-label="Close">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="modal-body">
                                <p className="modal-description">
                                    {t('footer.cookies_panel_desc')}
                                </p>

                                {/* Cookie Option 1: Functional */}
                                <div className="cookie-option">
                                    <div className="cookie-option-info">
                                        <strong>Necessários & Funcionais</strong>
                                        <p>Armazena seu tema visual (Dark/Light) e a preferência de tradução de linguagem (PT/EN).</p>
                                    </div>
                                    <div className="cookie-option-control">
                                        <input type="checkbox" checked={preferences.functional} disabled readOnly />
                                        <span className="cookie-option-status-badge">Ativo</span>
                                    </div>
                                </div>

                                {/* Cookie Option 2: Performance */}
                                <div className="cookie-option">
                                    <div className="cookie-option-info">
                                        <strong>Performance da Engine</strong>
                                        <p>Habilita caches de renderização e controle de taxa de quadro adaptativos.</p>
                                    </div>
                                    <div className="cookie-option-control">
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.performance}
                                                onChange={(e) => setPreferences({ ...preferences, performance: e.target.checked })}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>

                                {/* Cookie Option 3: Analytics */}
                                <div className="cookie-option">
                                    <div className="cookie-option-info">
                                        <strong>Estatísticas Anônimas</strong>
                                        <p>Ajuda-nos a entender o tráfego do portfólio de forma totalmente agregada e anônima.</p>
                                    </div>
                                    <div className="cookie-option-control">
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.analytics}
                                                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    onClick={handleAcceptAll}
                                    className="btn btn-outline"
                                >
                                    Aceitar Todos
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSavePreferences}
                                    className="btn btn-primary"
                                >
                                    {t('footer.cookies_save')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
