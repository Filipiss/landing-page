import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import './StackSection.css';

export default function StackSection() {
    const { t } = useLanguage();

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
        }
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

                {/* 2. Three-column Technical Matrix */}
                <div className="studio-stack-matrix">
                    {stackGroups.map((group, idx) => {
                        const title = t(group.titleKey) !== group.titleKey ? t(group.titleKey) : group.fallbackTitle;

                        return (
                            <motion.div
                                key={group.num}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: idx * 0.1 }}
                                className="studio-stack-col"
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
            </div>
        </section>
    );
}
