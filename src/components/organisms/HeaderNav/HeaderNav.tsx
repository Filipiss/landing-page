import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
import { Menu, X, Sun, Moon, Globe, Terminal } from 'lucide-react';
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
        <nav className="nav">
            <div className="container nav-container">

                {/* Brand Logo Identity */}
                <a href="#/" className="nav-logo" aria-label="Home">
                    <Terminal size={22} className="nav-logo-icon" />
                    <span>filipidios</span>
                </a>

                {/* 1. Desktop Navigation Anchors */}
                <div className="nav-links hidden-mobile">
                    <span onClick={() => handleAnchorLink('about')} className="nav-item">
                        {t('nav.about')}
                    </span>
                    <span onClick={() => handleAnchorLink('projects')} className="nav-item">
                        {t('nav.projects')}
                    </span>
                    <span onClick={() => handleAnchorLink('contact')} className="nav-item">
                        {t('nav.contact')}
                    </span>
                    <span onClick={() => handleAnchorLink('portfolio')} className="nav-portfolio-link">
                        {language === 'pt' ? 'Portfólio' : 'Portfolio'}
                    </span>
                </div>

                {/* 2. Toolbar Tools (Language, Theme, Secondary External Link) */}
                <div className="nav-toolbar hidden-mobile">
                    {/* Language Switch */}
                    <button
                        onClick={toggleLanguage}
                        className="nav-toolbar-btn"
                        aria-label="Toggle language"
                    >
                        <Globe size={16} />
                        <span>{language.toUpperCase()}</span>
                    </button>

                    {/* Theme Switcher Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="nav-toolbar-icon"
                        aria-label="Toggle theme"
                        type="button"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <div className="nav-divider"></div>

                    {/* Social links */}
                    <a href="https://github.com/filipidios" target="_blank" rel="noopener noreferrer" className="nav-toolbar-icon" aria-label="GitHub">
                        <GithubIcon size={20} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="nav-toolbar-icon" aria-label="LinkedIn">
                        <LinkedinIcon size={20} />
                    </a>
                </div>

                {/* 3. Mobile Hamburger Indicator Trigger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="nav-menu-toggle hidden-desktop"
                    aria-label="Toggle Navigation Menu"
                    type="button"
                >
                    {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                </button>

            </div>

            {/* 4. Mobile Drawer Overlay Navigation Panel (Framer Motion Drawer) */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="nav-mobile-drawer hidden-desktop"
                    >
                        <div className="nav-mobile-links">
                            <span onClick={() => handleAnchorLink('about')} className="nav-mobile-item">
                                {t('nav.about')}
                            </span>
                            <span onClick={() => handleAnchorLink('projects')} className="nav-mobile-item">
                                {t('nav.projects')}
                            </span>
                            <span onClick={() => handleAnchorLink('contact')} className="nav-mobile-item">
                                {t('nav.contact')}
                            </span>
                            <span onClick={() => handleAnchorLink('portfolio')} className="nav-mobile-portfolio-link">
                                {language === 'pt' ? 'Portfólio' : 'Portfolio'}
                            </span>
                            <div className="nav-mobile-divider"></div>

                            {/* Mobile Toolbar Controls */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <button
                                    onClick={toggleLanguage}
                                    className="nav-toolbar-btn"
                                >
                                    <Globe size={16} />
                                    <span>{language.toUpperCase()}</span>
                                </button>

                                <button
                                    onClick={toggleTheme}
                                    className="nav-toolbar-icon"
                                    aria-label="Toggle theme"
                                    type="button"
                                    style={{ transform: 'none', padding: '8px' }}
                                >
                                    {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                                </button>
                            </div>

                            <div className="nav-mobile-divider"></div>

                            {/* Mobile Social Drawer References */}
                            <div className="nav-mobile-socials">
                                <a href="https://github.com/filipidios" target="_blank" rel="noopener noreferrer" className="nav-mobile-social-icon" aria-label="GitHub">
                                    <GithubIcon size={24} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="nav-mobile-social-icon" aria-label="LinkedIn">
                                    <LinkedinIcon size={24} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </nav>
    );
}
