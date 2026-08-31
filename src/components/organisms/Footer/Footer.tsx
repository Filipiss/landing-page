import { MouseEvent } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ChevronUp, Shield } from 'lucide-react';
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
        <footer className="footer">
            <div className="container footer-container">

                {/* Copyright info */}
                <div className="footer-rights">
                    <span>&copy; {new Date().getFullYear()} Fillipe (filipidios). {t('footer.rights')}</span>
                </div>

                {/* Action controls */}
                <div className="footer-actions">

                    {/* Cookies settings trigger */}
                    <button
                        type="button"
                        onClick={onOpenCookiesSettings}
                        className="footer-link-btn"
                    >
                        <Shield size={16} />
                        <span>{t('footer.cookies_settings')}</span>
                    </button>

                    {/* Back to top scroll button */}
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
        </footer>
    );
}
