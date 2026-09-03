import { useLanguage } from '../../../context/LanguageContext';
import { FileText, Cpu, Layout, Database, Users, Languages, Wrench, ArrowUpRight, Sparkles } from 'lucide-react';
import ProfileCard from '../../molecules/ProfileCard/ProfileCard';
import ScrollReveal from '../../atoms/ScrollReveal/ScrollReveal';
import StarBorder from '../../atoms/StarBorder/StarBorder';
import filipiImg from '../../../assets/filipi.jpg';
import chicoImg from '../../../assets/CHICO WAGNER.png';
import './AboutSection.css';

export default function AboutSection() {
    const { t } = useLanguage();

    const skillsData = [
        {
            key: 'ai',
            icon: <Cpu className="skills-category-icon" />,
            items: ['OpenAI / LLMs APIs', 'Prompt Engineering', 'RAG / Vector DBs', 'Python (Data Analysis)']
        },
        {
            key: 'front',
            icon: <Layout className="skills-category-icon" />,
            items: ['React (v19)', 'TypeScript', 'JavaScript (ES6+)', 'Framer Motion', 'HTML5 & Modern CSS']
        },
        {
            key: 'back',
            icon: <Database className="skills-category-icon" />,
            items: ['Flask (Python)', 'SQLAlchemy', 'PostgreSQL / SQL', 'Node.js & Express', 'RESTful APIs']
        },
        {
            key: 'soft',
            icon: <Users className="skills-category-icon" />,
            items: ['Proatividade', 'Comunicação Ágil', 'Resolução de Problemas', 'Arquitetura Limpa']
        },
        {
            key: 'languages',
            icon: <Languages className="skills-category-icon" />,
            items: ['Português (Nativo)', 'English (Fluent / C1)', 'Español (Intermediário)']
        },
        {
            key: 'tools',
            icon: <Wrench className="skills-category-icon" />,
            items: ['Git & GitHub', 'Vite / Bundlers', 'Figma (Design)', 'Oxlint / ESLint']
        }
    ];

    return (
        <section id="about" className="section about-section-editorial">
            <div className="container">

                {/* Section Header */}
                <div className="about-header text-center">
                    <span className="pretitle">
                        <Sparkles size={14} />
                        {t('about.title')}
                    </span>
                    <ScrollReveal
                        tag="h2"
                        containerClassName="section-title"
                        baseOpacity={0.2}
                        baseY={15}
                    >
                        {t('about.subtitle')}
                    </ScrollReveal>
                </div>

                {/* Two-Column Grid: Profiles & Bio */}
                <div className="about-grid">
                    
                    {/* Left Column: Profile Cards (Fillipe & Chico Wagner) */}
                    <ScrollReveal baseY={25} blurStrength={3} containerClassName="about-profiles-column">
                        {/* Owner Profile */}
                        <ProfileCard
                            avatar={
                                <img
                                    src={filipiImg}
                                    alt={t('about.filip_title')}
                                    className="profile-card-img"
                                />
                            }
                            title={t('about.filip_title')}
                            description={t('about.filip_desc')}
                        />

                        {/* Chico Wagner (Pet Dog Mascot) */}
                        <ProfileCard
                            avatar={
                                <img
                                    src={chicoImg}
                                    alt={t('about.chico_title')}
                                    className="profile-card-img"
                                />
                            }
                            title={t('about.chico_title')}
                            description={t('about.chico_desc')}
                        />
                    </ScrollReveal>

                    {/* Right Column: Bio & Action */}
                    <ScrollReveal baseY={25} blurStrength={3} containerClassName="about-bio-card-wrapper">
                        <StarBorder className="about-bio-star-border" innerClassName="about-bio-card" speed="6s">
                            <div className="about-bio-tag">Developer & Creator</div>
                            <p className="about-bio-p">{t('about.bio_p1')}</p>
                            <p className="about-bio-p">{t('about.bio_p2')}</p>
                            <p className="about-bio-p">{t('about.bio_p3')}</p>

                            <div className="about-cv-wrapper">
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        alert('Download do CV (Mock PDF)');
                                    }}
                                    className="btn btn-primary about-cv-btn"
                                >
                                    <FileText size={18} />
                                    <span>{t('about.cv_download')}</span>
                                    <ArrowUpRight size={16} />
                                </a>
                            </div>
                        </StarBorder>
                    </ScrollReveal>

                </div>

                {/* Skills Grid */}
                <div id="skills" className="skills-section-wrapper">
                    <div className="text-center skills-section-header">
                        <span className="pretitle">
                            <Sparkles size={14} />
                            {t('about.skills_title')}
                        </span>
                        <ScrollReveal
                            tag="h3"
                            containerClassName="section-title skills-section-subtitle"
                            baseOpacity={0.2}
                            baseY={15}
                        >
                            {t('about.skills_subtitle')}
                        </ScrollReveal>
                    </div>

                    <div className="skills-editorial-grid">
                        {skillsData.map((category) => (
                            <ScrollReveal key={category.key} baseY={20} blurStrength={2} containerClassName="skills-editorial-card-wrapper">
                                <StarBorder className="skills-star-border" innerClassName="skills-editorial-card" speed="5s">
                                    <div className="skills-card-header">
                                        <div className="skills-icon-badge">
                                            {category.icon}
                                        </div>
                                        <h4 className="skills-category-name">
                                            {t(`about.skills_categories.${category.key}`)}
                                        </h4>
                                    </div>
                                    <div className="skills-pills-list">
                                        {category.items.map((skill, index) => (
                                            <span key={index} className="skill-pill-item">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </StarBorder>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
