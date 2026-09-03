import { MouseEvent } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ChevronUp, Shield } from 'lucide-react';
import GithubIcon from '../../atoms/GithubIcon/GithubIcon';
import LinkedinIcon from '../../atoms/LinkedinIcon/LinkedinIcon';
import './Footer.css';

interface FooterProps {
    onOpenCookiesSettings: () => void;
}

export default function Footer({ onOpenCookiesSettings }: FooterProps) {
    const { t } = useLanguage();

    const handleBackToTop = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAnchorClick = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer-editorial">
            <div className="container footer-editorial-container">
                
                {/* Top Row: Brand & Quick Links */}
                <div className="footer-top-row">
                    <div className="footer-brand-column">
                        <div className="footer-logo">
                            <span className="footer-logo-badge">F</span>
                            <span className="footer-logo-text">Fillipe</span>
                        </div>
                        <p className="footer-brand-text">
                            {t('footer.brand_tagline')}
                        </p>
                    </div>

                    <div className="footer-links-column">
                        <h4 className="footer-column-heading">{t('footer.quick_links')}</h4>
                        <div className="footer-nav-list">
                            <span onClick={() => handleAnchorClick('home')} className="footer-nav-link">Home</span>
                            <span onClick={() => handleAnchorClick('about')} className="footer-nav-link">{t('nav.about')}</span>
                            <span onClick={() => handleAnchorClick('skills')} className="footer-nav-link">{t('nav.skills')}</span>
                            <span onClick={() => handleAnchorClick('projects')} className="footer-nav-link">{t('nav.projects')}</span>
                            <span onClick={() => handleAnchorClick('contact')} className="footer-nav-link">{t('nav.contact')}</span>
                        </div>
                    </div>

                    <div className="footer-social-column">
                        <h4 className="footer-column-heading">{t('footer.connect')}</h4>
                        <div className="footer-social-icons">
                            <a href="https://github.com/filipidios" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="GitHub">
                                <GithubIcon size={20} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                                <LinkedinIcon size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Rights, Cookies & Back to Top */}
                <div className="footer-bottom-row">
                    <div className="footer-rights">
                        <span>&copy; {new Date().getFullYear()} Fillipe (filipidios). {t('footer.rights')}</span>
                    </div>

                    <div className="footer-actions">
                        <button
                            type="button"
                            onClick={onOpenCookiesSettings}
                            className="footer-link-btn"
                        >
                            <Shield size={15} />
                            <span>{t('footer.cookies_settings')}</span>
                        </button>

                        <a
                            href="#top"
                            onClick={handleBackToTop}
                            className="footer-back-to-top"
                            aria-label={t('footer.back_to_top')}
                        >
                            <span>{t('footer.back_to_top')}</span>
                            <ChevronUp size={16} />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
