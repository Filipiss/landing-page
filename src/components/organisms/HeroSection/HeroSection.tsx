import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection() {
    const { t } = useLanguage();

    const handleScrollToWork = () => {
        const element = document.getElementById('work');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero-monumental-section">
            <div className="container hero-monumental-container">
                {/* 1. Meta Top Kicker Line */}
                <div className="hero-top-meta-row font-mono">
                    <span className="hero-kicker-text">
                        {t('hero.kicker')}
                    </span>
                    <div className="hero-status-pill">
                        <span className="status-live-dot"></span>
                        <span className="status-live-label">{t('hero.status')}</span>
                    </div>
                </div>

                {/* 2. Monumental Typographic Headings (Masked Kinetic Reveal) */}
                <div className="hero-display-group">
                    <div className="hero-display-line-wrapper">
                        <motion.h1
                            initial={{ y: '105%' }}
                            animate={{ y: '0%' }}
                            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                            className="hero-display-title font-display"
                        >
                            {t('hero.title_line1')}
                        </motion.h1>
                    </div>

                    <div className="hero-display-line-wrapper">
                        <motion.h2
                            initial={{ y: '105%' }}
                            animate={{ y: '0%' }}
                            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="hero-display-subtitle font-display"
                        >
                            {t('hero.title_line2')}
                        </motion.h2>
                    </div>
                </div>

                {/* 3. Asymmetrical Manifesto & Navigation Strip */}
                <div className="hero-lower-grid">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="hero-manifesto-col"
                    >
                        <p className="hero-manifesto-statement">
                            "{t('hero.statement')}"
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="hero-action-col"
                    >
                        <div className="hero-specialty-strip font-mono">
                            <span className="specialty-label">{t('hero.meta_label')}</span>
                            <span className="specialty-techs">{t('hero.meta_stack')}</span>
                        </div>

                        <button
                            type="button"
                            onClick={handleScrollToWork}
                            className="hero-kinetic-cta font-mono"
                        >
                            <span>{t('hero.cta_work')}</span>
                            <span className="cta-arrow-slot">
                                <ArrowDown size={14} className="cta-down-arrow" />
                            </span>
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
