import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GithubIcon from '../../atoms/GithubIcon/GithubIcon';
import LinkedinIcon from '../../atoms/LinkedinIcon/LinkedinIcon';
import './HeaderNav.css';

interface HeaderNavProps {
    currentProjectId: string | null;
}

export default function HeaderNav({ currentProjectId }: HeaderNavProps) {
    const { t, language, setLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Detect scroll to collapse/dock nav to the top of viewport
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Automatically close mobile menu when viewport expands to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 820) {
                setMobileOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'pt' ? 'en' : 'pt');
    };

    const handleAnchorLink = (sectionId: string) => {
        setMobileOpen(false);

        if (sectionId === 'portfolio') {
            window.location.hash = '#/portfolio';
            return;
        }

        const hash = window.location.hash;
        const onHome = !currentProjectId && hash !== '#/portfolio';

        if (!onHome) {
            // Redirect back to home with anchor
            window.location.hash = `#/${sectionId}`;
            return;
        }

        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={`nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
            <nav className={`nav-capsule ${isScrolled ? 'scrolled' : ''}`}>
                {/* Brand Logo Identity */}
                <a href="#/" className="nav-brand" aria-label="Home">
                    <span className="nav-brand-badge">F</span>
                    <span className="nav-brand-text">Fillipe</span>
                </a>

                {/* 1. Navigation Links (Evenly distributed across the available capsule space) */}
                <div className="nav-menu">
                    <span onClick={() => handleAnchorLink('home')} className="nav-link">
                        Home
                    </span>
                    <span onClick={() => handleAnchorLink('about')} className="nav-link">
                        {t('nav.about')}
                    </span>
                    <span onClick={() => handleAnchorLink('skills')} className="nav-link">
                        {t('nav.skills')}
                    </span>
                    <span onClick={() => handleAnchorLink('contact')} className="nav-link">
                        {t('nav.contact')}
                    </span>
                    <span onClick={() => handleAnchorLink('portfolio')} className="nav-link nav-link-highlight">
                        {t('nav.portfolio')}
                    </span>
                </div>

                {/* 2. Top Toolbar Actions (Visible only on wide desktop > 1080px) */}
                <div className="nav-actions">
                    {/* Language Switch */}
                    <button
                        onClick={toggleLanguage}
                        className="nav-action-btn"
                        aria-label="Toggle language"
                        title="Alternar Idioma"
                    >
                        <Globe size={14} />
                        <span>{language.toUpperCase()}</span>
                    </button>

                    {/* Theme Switcher Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="nav-action-icon-btn"
                        aria-label="Toggle theme"
                        type="button"
                        title="Alternar Tema"
                    >
                        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                    </button>

                    <div className="nav-action-separator"></div>

                    {/* Social links */}
                    <a href="https://github.com/filipidios" target="_blank" rel="noopener noreferrer" className="nav-action-icon-btn" aria-label="GitHub">
                        <GithubIcon size={18} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="nav-action-icon-btn" aria-label="LinkedIn">
                        <LinkedinIcon size={18} />
                    </a>
                </div>

                {/* 3. Mobile Hamburger Indicator Trigger (Visible only on mobile <= 768px) */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="nav-mobile-toggle"
                    aria-label="Toggle Navigation Menu"
                    type="button"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* 4. Mobile Drawer Overlay Navigation Panel (Below 768px) */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="nav-mobile-drawer"
                    >
                        <div className="nav-mobile-links">
                            <span onClick={() => handleAnchorLink('home')} className="nav-mobile-item">
                                Home
                            </span>
                            <span onClick={() => handleAnchorLink('about')} className="nav-mobile-item">
                                {t('nav.about')}
                            </span>
                            <span onClick={() => handleAnchorLink('skills')} className="nav-mobile-item">
                                {t('nav.skills')}
                            </span>
                            <span onClick={() => handleAnchorLink('contact')} className="nav-mobile-item">
                                {t('nav.contact')}
                            </span>
                            <span onClick={() => handleAnchorLink('portfolio')} className="nav-mobile-item nav-mobile-portfolio">
                                {t('nav.portfolio')}
                            </span>

                            <div className="nav-mobile-divider"></div>

                            {/* Mobile Toolbar Controls */}
                            <div className="nav-mobile-controls">
                                <div className="nav-mobile-prefs">
                                    <button
                                        onClick={toggleLanguage}
                                        className="nav-action-btn"
                                    >
                                        <Globe size={14} />
                                        <span>{language.toUpperCase()}</span>
                                    </button>

                                    <button
                                        onClick={toggleTheme}
                                        className="nav-action-icon-btn"
                                        aria-label="Toggle theme"
                                        type="button"
                                    >
                                        {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
                                    </button>
                                </div>

                                <div className="nav-mobile-socials">
                                    <a href="https://github.com/filipidios" target="_blank" rel="noopener noreferrer" className="nav-action-icon-btn" aria-label="GitHub">
                                        <GithubIcon size={19} />
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="nav-action-icon-btn" aria-label="LinkedIn">
                                        <LinkedinIcon size={19} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
