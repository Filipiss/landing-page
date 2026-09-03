import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, Quote, Sparkles } from 'lucide-react';
import filipiAvatar from '../../../assets/filipi_avatar.jpg';
import SplitText from '../../atoms/SplitText/SplitText';
import StarBorder from '../../atoms/StarBorder/StarBorder';
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
        <section id="home" className="hero-editorial">
            <div className="hero-editorial-container container">
                
                {/* 1. Hello Badge with Doodle Spark */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="hero-badge-pill"
                >
                    <span className="hero-badge-spark">✨</span>
                    <span>{t('hero.badge_hello')}</span>
                    <span className="hero-badge-live-dot"></span>
                </motion.div>

                {/* 2. Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="hero-title"
                >
                    <span className="hero-title-greeting">
                        {t('hero.greeting')}{' '}
                        <span className="hero-title-name">Fillipe,</span>
                    </span>
                    <br />
                    <SplitText
                        key={t('hero.role')}
                        text={t('hero.role')}
                        tag="span"
                        className="hero-title-role"
                        delay={30}
                        duration={0.7}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 30 }}
                        to={{ opacity: 1, y: 0 }}
                    />
                </motion.h1>

                {/* 3. Central Visual with Orange Arch and Floating Stat Cards */}
                <div className="hero-stage">
                    
                    {/* Left Floating Stat Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="hero-card-left-wrapper"
                    >
                        <StarBorder className="hero-star-border" innerClassName="hero-card-left" speed="6s">
                            <Quote size={28} className="hero-quote-icon" />
                            <p className="hero-quote-text">
                                "{t('hero.stat_quote')}"
                            </p>
                            <div className="hero-stat-block">
                                <span className="hero-stat-number">{t('hero.stat_projects_count')}</span>
                                <span className="hero-stat-label">{t('hero.stat_projects_label')}</span>
                            </div>
                        </StarBorder>
                    </motion.div>

                    {/* Central Arch & Developer Character */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="hero-arch-wrapper"
                    >
                        {/* Dotted pattern deco */}
                        <div className="hero-dots-deco hero-dots-top-right"></div>
                        <div className="hero-dots-deco hero-dots-bottom-left"></div>

                        {/* Orange Arch */}
                        <div className="hero-arch-bg">
                            <img
                                src={filipiAvatar}
                                alt="Fillipe Avatar"
                                className="hero-avatar-img"
                            />
                        </div>

                        {/* Action Button at Arch Base */}
                        <div className="hero-arch-actions">
                            <button
                                onClick={() => handleCtaClick('portfolio')}
                                className="btn btn-primary hero-btn-main"
                            >
                                <span>{t('hero.cta_projects')}</span>
                                <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Floating Stat Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="hero-card-right-wrapper"
                    >
                        <StarBorder className="hero-star-border" innerClassName="hero-card-right" speed="6s">
                            <div className="hero-stars-row">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={18} fill="var(--accent-primary)" color="var(--accent-primary)" />
                                ))}
                            </div>
                            <div className="hero-stat-block">
                                <span className="hero-stat-number">{t('hero.stat_exp_count')}</span>
                                <span className="hero-stat-label">{t('hero.stat_exp_label')}</span>
                            </div>
                            <div className="hero-rating-badge">
                                <Sparkles size={14} className="color-accent" />
                                <span>{t('hero.stat_rating_score')} {t('hero.stat_rating_label')}</span>
                            </div>
                        </StarBorder>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
