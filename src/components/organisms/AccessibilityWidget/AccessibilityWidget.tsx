import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
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
    Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

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

    // Close on Escape or click outside
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                triggerRef.current?.focus();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (
                panelRef.current && 
                !panelRef.current.contains(e.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

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
    const hasModifications = 
        settings.highContrast || 
        settings.grayscale || 
        settings.highlightLinks || 
        settings.lineSpacing || 
        settings.zoomStep !== 0;

    return (
        <aside className="accessibility-widget-root" aria-label="Painel de Acessibilidade">

            {/* Universal Accessibility Button */}
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`accessibility-trigger-btn ${isOpen ? 'active' : ''}`}
                aria-label={t('accessibility.btn_aria')}
                title={t('accessibility.title')}
                aria-expanded={isOpen}
            >
                <Accessibility size={22} className="accessibility-icon" />
            </button>

            {/* Accessibility Popover Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={panelRef}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="accessibility-panel"
                        role="dialog"
                        aria-modal="true"
                        aria-label={t('accessibility.title')}
                    >
                        {/* Studio Header */}
                        <div className="accessibility-panel-header">
                            <div className="accessibility-panel-title">
                                <Accessibility size={16} className="color-accent" />
                                <h3>{t('accessibility.title')}</h3>
                                <span className="accessibility-panel-badge font-mono">WCAG AA</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="accessibility-close-btn"
                                aria-label={t('accessibility.close')}
                                title={t('accessibility.close')}
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Options List */}
                        <div className="accessibility-panel-body">
                            
                            {/* 1. Font Resizing Controls (A-, Padrão, A+) */}
                            <div className="accessibility-option-group">
                                <div className="accessibility-option-header">
                                    <div className="accessibility-option-label">
                                        <Sparkles size={15} className="color-accent" />
                                        <span>{t('accessibility.font_size')}</span>
                                    </div>
                                    <span className="accessibility-font-indicator font-mono">
                                        {currentPercentage}%
                                    </span>
                                </div>

                                <div className="accessibility-font-stepper font-mono">
                                    <button
                                        type="button"
                                        onClick={handleZoomOut}
                                        disabled={settings.zoomStep <= -2}
                                        className="font-stepper-btn"
                                        title="Diminuir tamanho da fonte (A-)"
                                    >
                                        <Minus size={13} />
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
                                        <Plus size={13} />
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
                                        aria-label={t('accessibility.high_contrast')}
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
                                        aria-label={t('accessibility.grayscale')}
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
                                        aria-label={t('accessibility.highlight_links')}
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
                                        aria-label={t('accessibility.line_spacing')}
                                    />
                                    <span className="accessibility-slider"></span>
                                </label>
                            </div>

                        </div>

                        {/* Studio Footer Reset */}
                        <div className="accessibility-panel-footer">
                            <span className="accessibility-footer-meta font-mono">
                                {hasModifications ? 'MODOS ATIVOS' : 'PADRÃO'}
                            </span>
                            <button
                                type="button"
                                onClick={handleResetAll}
                                className="accessibility-reset-btn font-mono"
                                title="Restaurar todas as opções padrão de acessibilidade"
                            >
                                <RotateCcw size={13} />
                                <span>{t('accessibility.reset')}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </aside>
    );
}
