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
    zoomStep: number;
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
        }
        return DEFAULT_SETTINGS;
    });

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

    useEffect(() => {
        const root = document.documentElement;

        const scalePercentage = 100 + (settings.zoomStep * 10);
        const scaleFactor = scalePercentage / 100;
        root.style.setProperty('--font-scale', `${scaleFactor}`);
        root.style.fontSize = `${scalePercentage}%`;

        if (settings.highContrast) {
            root.setAttribute('data-high-contrast', 'true');
        } else {
            root.removeAttribute('data-high-contrast');
        }

        if (settings.grayscale) {
            root.setAttribute('data-grayscale', 'true');
        } else {
            root.removeAttribute('data-grayscale');
        }

        if (settings.highlightLinks) {
            root.setAttribute('data-highlight-links', 'true');
        } else {
            root.removeAttribute('data-highlight-links');
        }

        if (settings.lineSpacing) {
            root.setAttribute('data-line-spacing', 'large');
        } else {
            root.removeAttribute('data-line-spacing');
        }

        if (settings.reduceMotion) {
            root.setAttribute('data-reduce-motion', 'true');
        } else {
            root.removeAttribute('data-reduce-motion');
        }

        try {
            localStorage.setItem('accessibility_settings', JSON.stringify(settings));
        } catch {
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
        <aside className="c-accessibilityWidget" aria-label="Painel de Acessibilidade">
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`c-accessibilityWidget__trigger ${isOpen ? 'isActive' : ''}`}
                aria-label={t('accessibility.btn_aria')}
                title={t('accessibility.title')}
                aria-expanded={isOpen}
            >
                <Accessibility size={22} className="c-accessibilityWidget__icon" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={panelRef}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="c-accessibilityWidget__panel"
                        role="dialog"
                        aria-modal="true"
                        aria-label={t('accessibility.title')}
                    >
                        <div className="c-accessibilityWidget__header">
                            <div className="c-accessibilityWidget__titleGroup">
                                <Accessibility size={16} className="u-colorAccent" />
                                <h3 className="c-accessibilityWidget__title">{t('accessibility.title')}</h3>
                                <span className="c-accessibilityWidget__badge u-fontMono">WCAG AA</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="c-accessibilityWidget__closeBtn"
                                aria-label={t('accessibility.close')}
                                title={t('accessibility.close')}
                            >
                                <X size={14} />
                            </button>
                        </div>

                        <div className="c-accessibilityWidget__body">
                            <div className="c-accessibilityWidget__group">
                                <div className="c-accessibilityWidget__groupHeader">
                                    <div className="c-accessibilityWidget__groupLabel">
                                        <Sparkles size={15} className="u-colorAccent" />
                                        <span>{t('accessibility.font_size')}</span>
                                    </div>
                                    <span className="c-accessibilityWidget__fontIndicator u-fontMono">
                                        {currentPercentage}%
                                    </span>
                                </div>

                                <div className="c-accessibilityWidget__fontStepper u-fontMono">
                                    <button
                                        type="button"
                                        onClick={handleZoomOut}
                                        disabled={settings.zoomStep <= -2}
                                        className="c-accessibilityWidget__stepperBtn"
                                        title="Diminuir tamanho da fonte (A-)"
                                    >
                                        <Minus size={13} />
                                        <span>A-</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleZoomReset}
                                        className={`c-accessibilityWidget__stepperBtn ${settings.zoomStep === 0 ? 'isActive' : ''}`}
                                        title="Restaurar tamanho padrão (100%)"
                                    >
                                        <span>{t('accessibility.font_normal')}</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleZoomIn}
                                        disabled={settings.zoomStep >= 4}
                                        className="c-accessibilityWidget__stepperBtn"
                                        title="Aumentar tamanho da fonte (A+)"
                                    >
                                        <Plus size={13} />
                                        <span>A+</span>
                                    </button>
                                </div>
                            </div>

                            <div className="c-accessibilityWidget__toggleItem">
                                <div className="c-accessibilityWidget__itemInfo">
                                    <Contrast size={16} />
                                    <span>{t('accessibility.high_contrast')}</span>
                                </div>
                                <label className="c-accessibilityWidget__switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.highContrast}
                                        onChange={(e) => setSettings(s => ({ ...s, highContrast: e.target.checked }))}
                                        aria-label={t('accessibility.high_contrast')}
                                    />
                                    <span className="c-accessibilityWidget__slider"></span>
                                </label>
                            </div>

                            <div className="c-accessibilityWidget__toggleItem">
                                <div className="c-accessibilityWidget__itemInfo">
                                    <SunMedium size={16} />
                                    <span>{t('accessibility.grayscale')}</span>
                                </div>
                                <label className="c-accessibilityWidget__switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.grayscale}
                                        onChange={(e) => setSettings(s => ({ ...s, grayscale: e.target.checked }))}
                                        aria-label={t('accessibility.grayscale')}
                                    />
                                    <span className="c-accessibilityWidget__slider"></span>
                                </label>
                            </div>

                            <div className="c-accessibilityWidget__toggleItem">
                                <div className="c-accessibilityWidget__itemInfo">
                                    <Link2 size={16} />
                                    <span>{t('accessibility.highlight_links')}</span>
                                </div>
                                <label className="c-accessibilityWidget__switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.highlightLinks}
                                        onChange={(e) => setSettings(s => ({ ...s, highlightLinks: e.target.checked }))}
                                        aria-label={t('accessibility.highlight_links')}
                                    />
                                    <span className="c-accessibilityWidget__slider"></span>
                                </label>
                            </div>

                            <div className="c-accessibilityWidget__toggleItem">
                                <div className="c-accessibilityWidget__itemInfo">
                                    <AlignJustify size={16} />
                                    <span>{t('accessibility.line_spacing')}</span>
                                </div>
                                <label className="c-accessibilityWidget__switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.lineSpacing}
                                        onChange={(e) => setSettings(s => ({ ...s, lineSpacing: e.target.checked }))}
                                        aria-label={t('accessibility.line_spacing')}
                                    />
                                    <span className="c-accessibilityWidget__slider"></span>
                                </label>
                            </div>
                        </div>

                        <div className="c-accessibilityWidget__footer">
                            <span className="c-accessibilityWidget__footerMeta u-fontMono">
                                {hasModifications ? 'MODOS ATIVOS' : 'PADRÃO'}
                            </span>
                            <button
                                type="button"
                                onClick={handleResetAll}
                                className="c-accessibilityWidget__resetBtn u-fontMono"
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
