import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import filipiImg from '../../../assets/filipi.jpg';
import chicoImg from '../../../assets/CHICO WAGNER.png';
import './AboutSection.css';

export default function AboutSection() {
    const { t } = useLanguage();

    return (
        <section id="about" className="section studio-about-section">
            <div className="container">
                {/* 1. Kicker */}
                <div className="section-kicker">
                    <span className="section-kicker-num">04 //</span>
                    <span>{t('about.kicker').replace(/^[0-9]+\s*\/\/\s*/, '')}</span>
                </div>

                {/* 2. Asymmetric Studio Grid */}
                <div className="studio-about-grid">
                    {/* Left: Philosophy & Manifest */}
                    <div className="about-manifesto-column">
                        <h2 className="section-heading about-main-heading font-display">
                            {t('about.title')}
                        </h2>

                        <div className="about-narrative-flow">
                            <p className="about-narrative-paragraph">
                                {t('about.bio_p1')}
                            </p>
                            <p className="about-narrative-paragraph">
                                {t('about.bio_p2')}
                            </p>
                            <p className="about-narrative-paragraph">
                                {t('about.bio_p3')}
                            </p>
                        </div>
                    </div>

                    {/* Right: Studio Architectural Frames (Filipi & Chico Wagner) */}
                    <div className="about-artefacts-column">
                        {/* Frame 1: Filipi Soares Portrait */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35 }}
                            className="studio-portrait-frame"
                        >
                            <div className="portrait-meta-top font-mono">
                                <span>{t('about.meta_camera')}</span>
                            </div>

                            <div className="portrait-main-body">
                                <div className="portrait-image-wrapper" title="Filipi Soares">
                                    <img
                                        src={filipiImg}
                                        alt={t('about.filipi_name')}
                                        className="portrait-img"
                                    />
                                </div>
                                <div className="portrait-info-block">
                                    <h3 className="portrait-name font-display">{t('about.filipi_name')}</h3>
                                    <span className="portrait-handle font-mono">{t('about.filipi_handle')}</span>
                                    <span className="portrait-role font-mono">{t('about.filipi_role')}</span>
                                </div>
                            </div>

                            <p className="portrait-short-bio">{t('about.filipi_desc')}</p>

                            <div className="portrait-meta-bottom font-mono">
                                <span className="meta-tag">{t('about.status_location')}</span>
                                <span className="meta-tag tag-accent">{t('about.status_availability')}</span>
                            </div>
                        </motion.div>

                        {/* Frame 2: Chico Wagner Executive Credential (Easter Egg) */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: 0.1 }}
                            className="chico-executive-credential"
                        >
                            <div className="chico-card-header font-mono">
                                <span className="chico-badge-kicker">{t('about.chico_kicker')}</span>
                                <span className="chico-official-stamp">{t('about.chico_badge')}</span>
                            </div>

                            <div className="chico-card-core">
                                <div className="chico-photo-frame" title="Chico Wagner (CEO)">
                                    <img
                                        src={chicoImg}
                                        alt={t('about.chico_name')}
                                        className="chico-photo"
                                    />
                                </div>
                                <div className="chico-identity-slot">
                                    <h4 className="chico-display-name font-display">{t('about.chico_name')}</h4>
                                    <span className="chico-executive-role font-mono">{t('about.chico_role')}</span>
                                </div>
                            </div>

                            <p className="chico-mandate-text">{t('about.chico_desc')}</p>

                            <div className="chico-quote-strip font-mono">
                                <span>"{t('about.chico_note')}"</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
