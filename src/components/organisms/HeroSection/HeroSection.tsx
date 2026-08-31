import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import GithubIcon from '../../atoms/GithubIcon/GithubIcon';
import LinkedinIcon from '../../atoms/LinkedinIcon/LinkedinIcon';
import './HeroSection.css';

export default function HeroSection() {
    const { t } = useLanguage();

    const handleCtaClick = (sectionId: string) => {
        if (sectionId === 'portfolio') {
            window.location.hash = '#/portfolio';
            return;
        }
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header id="home" className="hero section">
            <div className="hero-container container">
                <div className="hero-badge-wrapper">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="hero-badge"
                    >
                        <span className="hero-badge-dot"></span>
                        Open to work
                    </motion.div>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="hero-greeting"
                >
                    {t('hero.greeting')}{' '}
                    <span className="hero-name">Fillipe</span>
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="hero-role"
                >
                    {t('hero.role')}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="hero-tagline"
                >
                    {t('hero.tagline')}
                </motion.p>

                {/* Contacts Inline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="hero-contacts"
                >
                    <div className="hero-contact-item">
                        <MapPin size={18} className="color-accent" />
                        <span>São Paulo, Brazil</span>
                    </div>
                    <a href="mailto:contato@example.com" className="hero-contact-item hero-contact-link">
                        <Mail size={18} className="color-accent" />
                        <span>contato@example.com</span>
                    </a>
                </motion.div>

                {/* Actions CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="hero-actions"
                >
                    <button
                        onClick={() => handleCtaClick('portfolio')}
                        className="btn btn-primary"
                    >
                        {t('hero.cta_projects')}
                        <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </button>

                    <button
                        onClick={() => handleCtaClick('contact')}
                        className="btn btn-outline"
                    >
                        {t('hero.cta_contact')}
                    </button>
                </motion.div>

                {/* Social Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="hero-socials"
                >
                    <a href="https://github.com/filipidios" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="GitHub">
                        <GithubIcon size={22} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="LinkedIn">
                        <LinkedinIcon size={22} />
                    </a>
                </motion.div>
            </div>

            <div className="hero-scroll-down" onClick={() => handleCtaClick('about')}>
                <div className="hero-mouse">
                    <div className="hero-wheel"></div>
                </div>
            </div>
        </header>
    );
}
