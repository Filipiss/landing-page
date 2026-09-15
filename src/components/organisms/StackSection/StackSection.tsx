import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import './StackSection.css';

export default function StackSection() {
    const { t, language } = useLanguage();

    const softSkillsItems = language === 'pt' ? [
        'Comunicação Clara & Alinhamento Assíncrono',
        'Visão de Produto & Foco na Experiência do Usuário',
        'Resolução Analítica de Problemas Complexos',
        'Autonomia, Proatividade & Aprendizado Rápido',
        'Atenção Meticulosa aos Detalhes & UI Sensibility',
        'Colaboração Ágil & Respeito a Prazos'
    ] : [
        'Clear Communication & Async Alignment',
        'Product Mindset & User-Centric Design Empathy',
        'Analytical & Systematic Problem Solving',
        'High Autonomy, Proactivity & Rapid Learning',
        'Meticulous Eye for Detail & UI Polish',
        'Cross-Functional Agile Team Collaboration'
    ];

    const stackGroups = [
        {
            num: '01',
            titleKey: 'stack.groups.systems',
            fallbackTitle: 'SISTEMAS & BACKEND',
            items: [
                'Python 3.11+',
                'FastAPI & Async Pipelines',
                'Flask',
                'SQLAlchemy & ORM Modeling',
                'PostgreSQL & SQLite',
                'Server-Sent Events (SSE)',
                'Docker & Containerization'
            ]
        },
        {
            num: '02',
            titleKey: 'stack.groups.interfaces',
            fallbackTitle: 'INTERFACE & FRONT-END',
            items: [
                'React & Next.js',
                'TypeScript & JavaScript',
                'Tailwind CSS & Styled-Components',
                'HTML5 & CSS3 Semântico',
                'Framer Motion & Microinterações',
                'Acessibilidade & Boas Práticas (WCAG)'
            ]
        },
        {
            num: '03',
            titleKey: 'stack.groups.tooling',
            fallbackTitle: 'DEVOPS, TOOLING & WORKFLOW',
            items: [
                'Git & GitHub Workflows',
                'Docker & Containerization',
                'AI Multi-Provider APIs (Gemini / OpenAI / Groq)',
                'Postman & Testes de API',
                'Figma (Inspeção & Handoff de UI)',
                'Clean Architecture & Padrões de Projeto',
                'Vite & Build Tooling'
            ]
        },
        {
            num: '04',
            titleKey: 'stack.groups.soft_skills',
            fallbackTitle: 'SOFT SKILLS & PRODUTO',
            items: softSkillsItems
        }
    ];

    const learningTopics = [
        'Docker Engine & Daemon',
        'Dockerfile Multi-Stage',
        'Volumes Persistentes',
        'Bridge Networks',
        'Docker Compose',
        'Multi-Service Orchestration'
    ];

    return (
        <section id="stack" className="section studio-stack-section">
            <div className="container">
                {/* 1. Kicker & Title */}
                <div className="section-kicker">
                    <span className="section-kicker-num">03 //</span>
                    <span>{t('stack.kicker').replace(/^[0-9]+\s*\/\/\s*/, '')}</span>
                </div>

                <h2 className="section-heading font-display">{t('stack.title')}</h2>
                <p className="section-subheading">{t('stack.subtitle')}</p>

                {/* 2. Four-pillar Technical & Human Matrix */}
                <div className="studio-stack-matrix">
                    {stackGroups.map((group, idx) => {
                        const title = t(group.titleKey) !== group.titleKey ? t(group.titleKey) : group.fallbackTitle;

                        return (
                            <motion.div
                                key={group.num}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: idx * 0.08 }}
                                className={`studio-stack-col ${group.num === '04' ? 'stack-col-soft' : ''}`}
                            >
                                <div className="stack-col-top font-mono">
                                    <span className="stack-col-index">{group.num} //</span>
                                    <h3 className="stack-col-heading">{title}</h3>
                                </div>

                                <ul className="stack-tech-list font-mono">
                                    {group.items.map((item, itemIdx) => (
                                        <li key={itemIdx} className="stack-tech-row">
                                            <span className="stack-bullet">—</span>
                                            <span className="stack-item-name">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>

                {/* 3. Continuous Learning Spotlight Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="studio-learning-card"
                >
                    <div className="learning-card-header font-mono">
                        <div className="learning-header-left">
                            <span className="learning-kicker">{t('stack.learning_kicker')}</span>
                            <h3 className="learning-title font-display">{t('stack.learning_title')}</h3>
                        </div>
                        <div className="learning-status-pill">
                            <span className="learning-pulse-dot"></span>
                            <span>{t('stack.learning_badge')}</span>
                        </div>
                    </div>

                    <div className="learning-card-content">
                        <div className="learning-main-row">
                            <div className="learning-narrative-col">
                                <h4 className="learning-course-name font-display">{t('stack.learning_course')}</h4>
                                <p className="learning-course-desc">{t('stack.learning_desc')}</p>

                                {/* Progress bar */}
                                <div className="learning-progress-block font-mono">
                                    <div className="learning-progress-meta">
                                        <span>{language === 'pt' ? 'PROGRESSO DO CURSO' : 'COURSE PROGRESS'}</span>
                                        <span className="learning-progress-num">25%</span>
                                    </div>
                                    <div className="learning-progress-track">
                                        <div className="learning-progress-fill" style={{ width: '25%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="learning-side-col font-mono">
                                <div className="learning-topics-box">
                                    <span className="learning-topics-title">{t('stack.learning_topics_label')}</span>
                                    <div className="learning-chips-group">
                                        {learningTopics.map((topic, i) => (
                                            <span key={i} className="learning-topic-chip">
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="learning-milestone-box">
                                    <span className="learning-milestone-tag">{t('stack.learning_goal_label')}</span>
                                    <p className="learning-milestone-text">{t('stack.learning_goal')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
