import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import './ExperienceSection.css';

interface ExperienceItemData {
    company: string;
    role: string;
    period: string;
    stack: string;
    desc: string;
}

export default function ExperienceSection() {
    const { t } = useLanguage();
    const itemsRaw = t('experience.items');
    const items: ExperienceItemData[] = Array.isArray(itemsRaw) ? itemsRaw : [
        {
            company: 'Loco',
            role: 'Frontend / Creative Developer',
            period: 'Digital Agency Dublin',
            stack: 'React · TypeScript · UI/UX Design · Performance · Web & App Solutions',
            desc: 'Agência digital criativa em Dublin focada em entregar soluções web, aplicativos e produtos digitais que impulsionam o crescimento de negócios. Atuação no desenvolvimento de interfaces interativas de alto impacto visual, design de produto e experiências digitais modernas.'
        },
        {
            company: 'Eitree',
            role: 'Full Stack Developer',
            period: '2025 — 2026',
            stack: 'Python · Flask · SQLAlchemy · React · TypeScript · Docker',
            desc: 'Desenvolvimento e manutenção de aplicações web full stack, modelagem de banco de dados relacional, criação de APIs RESTful e construção de interfaces interativas com rigor em clareza de código e arquitetura modular.'
        }
    ];

    return (
        <section id="experience" className="section studio-experience-section">
            <div className="container">
                {/* 1. Kicker */}
                <div className="section-kicker">
                    <span className="section-kicker-num">02 //</span>
                    <span>{t('experience.kicker').replace(/^[0-9]+\s*\/\/\s*/, '')}</span>
                </div>

                <h2 className="section-heading font-display">{t('experience.title')}</h2>

                {/* 2. Chronological Grid */}
                <div className="studio-experience-list">
                    {items.map((exp, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: index * 0.1 }}
                            className="studio-experience-row"
                        >
                            <div className="exp-timeline-col font-mono">
                                <span className="exp-period-badge">{exp.period}</span>
                                <span className="exp-index-badge">0{index + 1} //</span>
                            </div>

                            <div className="exp-narrative-col">
                                <div className="exp-title-row">
                                    <h3 className="exp-company-heading font-display">{exp.company}</h3>
                                    <span className="exp-role-tag font-mono">{exp.role}</span>
                                </div>

                                <p className="exp-narrative-text">{exp.desc}</p>
                            </div>

                            <div className="exp-stack-col font-mono">
                                <span className="exp-stack-label">STACK & PRÁTICAS //</span>
                                <span className="exp-stack-content">{exp.stack}</span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
