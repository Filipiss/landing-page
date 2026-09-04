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
    const [liveTime, setLiveTime] = useState('');

    // Update Live Clock (Brazil / Florianópolis time UTC-3)
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString(language === 'pt' ? 'pt-BR' : 'en-US', {
                timeZone: 'America/Sao_Paulo',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            setLiveTime(timeStr);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, [language]);

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

    const toggleLanguage = () => {
        setLanguage(language === 'pt' ? 'en' : 'pt');
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
                    <span className="studio-brand-role font-mono">{t('nav.brand_role')}</span>
                </div>

                {/* Studio Live Location & Clock */}
                <div className="studio-header-center font-mono">
                    <span className="live-pulse-indicator"></span>
                    <span className="live-clock-text">FLN, BR [{liveTime} BRT]</span>
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
                    <button
                        type="button"
                        onClick={toggleLanguage}
                        className="studio-util-btn"
                        title="Switch Language"
                    >
                        {language.toUpperCase()}
                    </button>

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
                        <button type="button" onClick={() => scrollToSection('experience')} className="mobile-nav-link">
                            // 01 · {t('nav.experience')}
                        </button>
                        <button type="button" onClick={() => scrollToSection('stack')} className="mobile-nav-link">
                            // 02 · {t('nav.stack')}
                        </button>
                        <button type="button" onClick={() => scrollToSection('about')} className="mobile-nav-link">
                            // 03 · {t('nav.about')}
                        </button>
                        <button type="button" onClick={() => scrollToSection('contact')} className="mobile-nav-link">
                            // 04 · {t('nav.contact')}
                        </button>
                        <button type="button" onClick={goToPortfolio} className="mobile-nav-link">
                            // 05 · {t('nav.portfolio')}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setMobileMenuOpen(false);
                                if (onOpenCvModal) onOpenCvModal();
                            }}
                            className="mobile-nav-link mobile-nav-cv"
                        >
                            // 06 · {t('nav.cv')} ↗
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
