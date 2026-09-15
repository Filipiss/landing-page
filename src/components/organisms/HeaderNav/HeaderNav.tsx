import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import './HeaderNav.css';

interface HeaderNavProps {
    currentProjectId?: string | null;
    onOpenCvModal?: () => void;
}

export default function HeaderNav({ currentProjectId, onOpenCvModal }: HeaderNavProps) {
    const { t, language, setLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Handle scroll border
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
        <header className={`studio-header ${scrolled ? 'is-scrolled' : ''}`}>
            <div className="container studio-header-container">
                {/* Brand Identity */}
                <div 
                    className="studio-brand" 
                    onClick={() => scrollToSection('home')}
                    role="button"
                    tabIndex={0}
                >
                    <div className="studio-brand-mark" aria-hidden="true">
                        <img src="/favicon.svg" alt="FS Logo" className="studio-brand-logo-img" />
                    </div>
                    <span className="studio-brand-name font-display">{t('nav.brand_name')}</span>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="studio-nav font-mono">
                    <button type="button" onClick={() => scrollToSection('experience')} className="studio-nav-link">
                        {t('nav.experience')}
                    </button>
                    <button type="button" onClick={() => scrollToSection('stack')} className="studio-nav-link">
                        {t('nav.stack')}
                    </button>
                    <button type="button" onClick={() => scrollToSection('about')} className="studio-nav-link">
                        {t('nav.about')}
                    </button>
                    <button type="button" onClick={() => scrollToSection('contact')} className="studio-nav-link">
                        {t('nav.contact')}
                    </button>
                    <button type="button" onClick={goToPortfolio} className="studio-nav-link">
                        {t('nav.portfolio')}
                    </button>
                    <button
                        type="button"
                        onClick={onOpenCvModal}
                        className="studio-nav-link studio-nav-cv font-mono"
                        title={t('cv_modal.title')}
                    >
                        <span>{t('nav.cv')}</span>
                        <ArrowUpRight size={13} className="kinetic-arrow" />
                    </button>
                </nav>

                {/* Utility Toggles */}
                <div className="studio-header-actions font-mono">
                    {/* Visible Language Segmented Toggle */}
                    <div className="studio-lang-segmented" role="group" aria-label="Idioma">
                        <button
                            type="button"
                            onClick={() => setLanguage('pt')}
                            className={`lang-segment-btn ${language === 'pt' ? 'is-active' : ''}`}
                            aria-pressed={language === 'pt'}
                        >
                            PT-BR
                        </button>
                        <button
                            type="button"
                            onClick={() => setLanguage('en')}
                            className={`lang-segment-btn ${language === 'en' ? 'is-active' : ''}`}
                            aria-pressed={language === 'en'}
                        >
                            EN
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="studio-util-btn studio-theme-btn"
                        title="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                    </button>

                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="studio-mobile-toggle"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
                <div className="studio-mobile-drawer">
                    <div className="container mobile-drawer-inner font-mono">
                        <div className="mobile-drawer-top-row">
                            <span className="mobile-drawer-tag">// NAVEGAÇÃO</span>
                            <div className="studio-lang-segmented mobile-drawer-lang" role="group" aria-label="Idioma">
                                <button
                                    type="button"
                                    onClick={() => setLanguage('pt')}
                                    className={`lang-segment-btn ${language === 'pt' ? 'is-active' : ''}`}
                                >
                                    PT-BR
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLanguage('en')}
                                    className={`lang-segment-btn ${language === 'en' ? 'is-active' : ''}`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>

                        <div className="mobile-nav-links-list">
                            <button type="button" onClick={() => scrollToSection('experience')} className="mobile-nav-link">
                                <span className="mobile-nav-num">01 //</span>
                                <span className="mobile-nav-label">{t('nav.experience')}</span>
                            </button>
                            <button type="button" onClick={() => scrollToSection('stack')} className="mobile-nav-link">
                                <span className="mobile-nav-num">02 //</span>
                                <span className="mobile-nav-label">{t('nav.stack')}</span>
                            </button>
                            <button type="button" onClick={() => scrollToSection('about')} className="mobile-nav-link">
                                <span className="mobile-nav-num">03 //</span>
                                <span className="mobile-nav-label">{t('nav.about')}</span>
                            </button>
                            <button type="button" onClick={() => scrollToSection('contact')} className="mobile-nav-link">
                                <span className="mobile-nav-num">04 //</span>
                                <span className="mobile-nav-label">{t('nav.contact')}</span>
                            </button>
                            <button type="button" onClick={goToPortfolio} className="mobile-nav-link">
                                <span className="mobile-nav-num">05 //</span>
                                <span className="mobile-nav-label">{t('nav.portfolio')}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    if (onOpenCvModal) onOpenCvModal();
                                }}
                                className="mobile-nav-link mobile-nav-cv"
                            >
                                <span className="mobile-nav-num">06 //</span>
                                <span className="mobile-nav-label">{t('nav.cv')}</span>
                                <ArrowUpRight size={14} className="kinetic-arrow" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
