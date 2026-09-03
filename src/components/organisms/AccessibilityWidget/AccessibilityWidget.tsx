import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { 
    Accessibility, 
    X, 
    Minus, 
    Plus, 
    RotateCcw, 
    Contrast, 
    SunMedium, 
    Link2, 
    AlignJustify, 
    Sparkles,
    Sun,
    Moon,
    Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GithubIcon from '../../atoms/GithubIcon/GithubIcon';
import LinkedinIcon from '../../atoms/LinkedinIcon/LinkedinIcon';
import './AccessibilityWidget.css';

interface AccessibilitySettings {
    zoomStep: number; // -2 to +4 (-2 = 80%, 0 = 100%, +4 = 140%)
    highContrast: boolean;
    grayscale: boolean;
    highlightLinks: boolean;
    lineSpacing: boolean;
    reduceMotion: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
    zoomStep: 0,
    highContrast: false,
    grayscale: false,
    highlightLinks: false,
    lineSpacing: false,
    reduceMotion: false
};

export default function AccessibilityWidget() {
    const { t, language, setLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState<AccessibilitySettings>(() => {
        try {
            const saved = localStorage.getItem('accessibility_settings');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch {
            // fallback
        }
        return DEFAULT_SETTINGS;
    });

    const toggleLanguage = () => {
        setLanguage(language === 'pt' ? 'en' : 'pt');
    };

    // Apply settings directly to HTML document
    useEffect(() => {
        const root = document.documentElement;

        // Font scaling from 80% to 140%
        const scalePercentage = 100 + (settings.zoomStep * 10);
        const scaleFactor = scalePercentage / 100;
        root.style.setProperty('--font-scale', `${scaleFactor}`);
        root.style.fontSize = `${scalePercentage}%`;

        // High Contrast
        if (settings.highContrast) {
            root.setAttribute('data-high-contrast', 'true');
        } else {
            root.removeAttribute('data-high-contrast');
        }

        // Grayscale
        if (settings.grayscale) {
            root.setAttribute('data-grayscale', 'true');
        } else {
            root.removeAttribute('data-grayscale');
        }

        // Highlight Links
        if (settings.highlightLinks) {
            root.setAttribute('data-highlight-links', 'true');
        } else {
            root.removeAttribute('data-highlight-links');
        }

        // Line Spacing
        if (settings.lineSpacing) {
            root.setAttribute('data-line-spacing', 'large');
        } else {
            root.removeAttribute('data-line-spacing');
        }

        // Reduce Motion
        if (settings.reduceMotion) {
            root.setAttribute('data-reduce-motion', 'true');
        } else {
            root.removeAttribute('data-reduce-motion');
        }

        try {
            localStorage.setItem('accessibility_settings', JSON.stringify(settings));
        } catch {
            // ignore
        }
    }, [settings]);

    const handleZoomIn = () => {
        setSettings(s => ({ ...s, zoomStep: Math.min(s.zoomStep + 1, 4) }));
    };

    const handleZoomOut = () => {
        setSettings(s => ({ ...s, zoomStep: Math.max(s.zoomStep - 1, -2) }));
    };

    const handleZoomReset = () => {
        setSettings(s => ({ ...s, zoomStep: 0 }));
    };

    const handleResetAll = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    const currentPercentage = 100 + (settings.zoomStep * 10);

    return (
        <aside className="accessibility-widget-root" aria-label="Painel de Acessibilidade">
            {/* Companion Toolbar displayed ONLY on intermediate screens (769px to 1080px) alongside accessibility */}
            <div className="floating-companion-tools">
                <button
                    onClick={toggleLanguage}
                    className="floating-companion-btn"
                    aria-label="Toggle language"
                    title="Alternar Idioma"
                >
                    <Globe size={14} />
                    <span>{language.toUpperCase()}</span>
                </button>

                <button
                    onClick={toggleTheme}
                    className="floating-companion-icon-btn"
                    aria-label="Toggle theme"
                    type="button"
                    title="Alternar Tema"
                >
                    {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                </button>

                <a href="https://github.com/filipidios" target="_blank" rel="noopener noreferrer" className="floating-companion-icon-btn" aria-label="GitHub">
                    <GithubIcon size={18} />
                </a>

                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="floating-companion-icon-btn" aria-label="LinkedIn">
                    <LinkedinIcon size={18} />
                </a>
            </div>

            {/* Universal Accessibility Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`accessibility-trigger-btn ${isOpen ? 'active' : ''}`}
                aria-label={t('accessibility.btn_aria')}
                title={t('accessibility.title')}
            >
                <Accessibility size={24} className="accessibility-icon" />
            </button>

            {/* Accessibility Popover Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="accessibility-panel"
                    >
                        {/* Header */}
                        <div className="accessibility-panel-header">
                            <div className="accessibility-panel-title">
                                <Accessibility size={18} className="color-accent" />
                                <h3>{t('accessibility.title')}</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="accessibility-close-btn"
                                aria-label={t('accessibility.close')}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Options List */}
                        <div className="accessibility-panel-body">
                            
                            {/* 1. Font Resizing Controls (A-, Padrão, A+) */}
                            <div className="accessibility-option-group">
                                <div className="accessibility-option-header">
                                    <div className="accessibility-option-label">
                                        <Sparkles size={16} className="color-accent" />
                                        <span>{t('accessibility.font_size')}</span>
                                    </div>
                                    <span className="accessibility-font-indicator">
                                        {currentPercentage}%
                                    </span>
                                </div>

                                <div className="accessibility-font-stepper">
                                    <button
                                        type="button"
                                        onClick={handleZoomOut}
                                        disabled={settings.zoomStep <= -2}
                                        className="font-stepper-btn"
                                        title="Diminuir tamanho da fonte (A-)"
                                    >
                                        <Minus size={14} />
                                        <span>A-</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleZoomReset}
                                        className={`font-stepper-btn font-stepper-reset ${settings.zoomStep === 0 ? 'active' : ''}`}
                                        title="Restaurar tamanho padrão (100%)"
                                    >
                                        <span>{t('accessibility.font_normal')}</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleZoomIn}
                                        disabled={settings.zoomStep >= 4}
                                        className="font-stepper-btn"
                                        title="Aumentar tamanho da fonte (A+)"
                                    >
                                        <Plus size={14} />
                                        <span>A+</span>
                                    </button>
                                </div>
                            </div>

                            {/* 2. High Contrast */}
                            <div className="accessibility-toggle-item">
                                <div className="accessibility-item-info">
                                    <Contrast size={16} />
                                    <span>{t('accessibility.high_contrast')}</span>
                                </div>
                                <label className="accessibility-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.highContrast}
                                        onChange={(e) => setSettings(s => ({ ...s, highContrast: e.target.checked }))}
                                    />
                                    <span className="accessibility-slider"></span>
                                </label>
                            </div>

                            {/* 3. Grayscale Mode */}
                            <div className="accessibility-toggle-item">
                                <div className="accessibility-item-info">
                                    <SunMedium size={16} />
                                    <span>{t('accessibility.grayscale')}</span>
                                </div>
                                <label className="accessibility-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.grayscale}
                                        onChange={(e) => setSettings(s => ({ ...s, grayscale: e.target.checked }))}
                                    />
                                    <span className="accessibility-slider"></span>
                                </label>
                            </div>

                            {/* 4. Highlight Links */}
                            <div className="accessibility-toggle-item">
                                <div className="accessibility-item-info">
                                    <Link2 size={16} />
                                    <span>{t('accessibility.highlight_links')}</span>
                                </div>
                                <label className="accessibility-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.highlightLinks}
                                        onChange={(e) => setSettings(s => ({ ...s, highlightLinks: e.target.checked }))}
                                    />
                                    <span className="accessibility-slider"></span>
                                </label>
                            </div>

                            {/* 5. Line Spacing */}
                            <div className="accessibility-toggle-item">
                                <div className="accessibility-item-info">
                                    <AlignJustify size={16} />
                                    <span>{t('accessibility.line_spacing')}</span>
                                </div>
                                <label className="accessibility-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.lineSpacing}
                                        onChange={(e) => setSettings(s => ({ ...s, lineSpacing: e.target.checked }))}
                                    />
                                    <span className="accessibility-slider"></span>
                                </label>
                            </div>

                        </div>

                        {/* Footer Reset */}
                        <div className="accessibility-panel-footer">
                            <button
                                type="button"
                                onClick={handleResetAll}
                                className="accessibility-reset-btn"
                            >
                                <RotateCcw size={14} />
                                <span>{t('accessibility.reset')}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </aside>
    );
}
