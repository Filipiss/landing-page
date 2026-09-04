import { MouseEvent } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ArrowUp } from 'lucide-react';
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

    return (
        <footer className="studio-colophon-footer">
            <div className="container footer-colophon-container">
                {/* 1. Upper Colophon Grid */}
                <div className="footer-upper-grid">
                    <div className="footer-identity-col">
                        <span className="footer-brand-title font-display">FILIPI SOARES</span>
                        <span className="footer-brand-sub font-mono">{t('footer.role')}</span>
                    </div>

                    <div className="footer-links-col font-mono">
                        <span className="links-col-header">// CANAIS & LINKS</span>
                        <div className="footer-nav-stack">
                            <a href="https://github.com/filipiss" target="_blank" rel="noopener noreferrer" className="colophon-link">
                                GITHUB ↗
                            </a>
                            <a href="https://www.linkedin.com/in/filipiss/" target="_blank" rel="noopener noreferrer" className="colophon-link">
                                LINKEDIN ↗
                            </a>
                            <a href="mailto:filipi.soares.silva@gmail.com" className="colophon-link">
                                EMAIL ↗
                            </a>
                            <button type="button" onClick={onOpenCookiesSettings} className="colophon-link-btn">
                                {t('footer.cookies_settings')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Lower Colophon Strip */}
                <div className="footer-lower-strip font-mono">
                    <div className="footer-copy-text">
                        &copy; {new Date().getFullYear()}
                    </div>

                    <div className="footer-chico-supervised">
                        <span>{t('footer.supervised')}</span>
                    </div>

                    <a href="#top" onClick={handleBackToTop} className="footer-top-anchor" aria-label="Voltar ao topo">
                        <span>{t('footer.back_to_top')}</span>
                        <ArrowUp size={12} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
