import { FC } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import './StackSection.css';

export const StackSection: FC = () => {
  const { t, tOptional, language } = useLanguage();

  const softSkillsItems = language === 'pt' ? [
    'Comunicação Clara & Alinhamento Assíncrono',
    'Visão de Produto & Foco na Experiência do Usuário',
    'Resolução Analítica de Problemas Complexos',
    'Autonomia, Proatividade & Aprendizado Rápido',
    'Atenção Meticulosa aos Detalhes & Sensibilidade Visual',
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
      fallbackTitle: language === 'pt' ? 'SISTEMAS & BACKEND' : 'SYSTEMS & BACKEND',
      items: [
        'Python 3.11+',
        language === 'pt' ? 'FastAPI & Processamento Assíncrono' : 'FastAPI & Async Pipelines',
        'Flask',
        language === 'pt' ? 'SQLAlchemy & Modelagem ORM' : 'SQLAlchemy & ORM Modeling',
        'PostgreSQL & SQLite',
        'Server-Sent Events (SSE)',
        language === 'pt' ? 'Docker & Conteinerização' : 'Docker & Containerization'
      ]
    },
    {
      num: '02',
      titleKey: 'stack.groups.interfaces',
      fallbackTitle: language === 'pt' ? 'INTERFACES & FRONT-END' : 'INTERFACE & FRONT-END',
      items: [
        'React & Next.js',
        'TypeScript & JavaScript',
        'Tailwind CSS & Styled-Components',
        language === 'pt' ? 'HTML5 & CSS3 Semântico' : 'Semantic HTML5 & CSS3',
        language === 'pt' ? 'Framer Motion & Microinterações' : 'Framer Motion & Micro-interactions',
        language === 'pt' ? 'Acessibilidade & Boas Práticas (WCAG)' : 'Accessibility & Best Practices (WCAG)'
      ]
    },
    {
      num: '03',
      titleKey: 'stack.groups.tooling',
      fallbackTitle: language === 'pt' ? 'DEVOPS, FERRAMENTAS & FLUXOS' : 'DEVOPS, TOOLING & WORKFLOW',
      items: [
        language === 'pt' ? 'Git & Fluxos no GitHub' : 'Git & GitHub Workflows',
        language === 'pt' ? 'Docker & Conteinerização' : 'Docker & Containerization',
        language === 'pt' ? 'APIs Multi-Provedores de IA (Gemini / OpenAI / Groq)' : 'AI Multi-Provider APIs (Gemini / OpenAI / Groq)',
        language === 'pt' ? 'Postman & Testes de API' : 'Postman & API Testing',
        language === 'pt' ? 'Figma (Inspeção & Entrega de Interface)' : 'Figma (UI Inspection & Handoff)',
        language === 'pt' ? 'Arquitetura Limpa & Padrões de Projeto' : 'Clean Architecture & Design Patterns',
        language === 'pt' ? 'Vite & Ferramentas de Compilação' : 'Vite & Build Tooling'
      ]
    },
    {
      num: '04',
      titleKey: 'stack.groups.soft_skills',
      fallbackTitle: language === 'pt' ? 'COMPETÊNCIAS & GESTÃO DE PRODUTO' : 'SOFT SKILLS & PRODUCT',
      items: softSkillsItems
    }
  ];

  return (
    <section id="stack" className="l-section c-stackSection">
      <div className="l-container">
        <div className="c-stackSection__kicker u-fontMono">
          <span className="c-stackSection__kickerNum">03 //</span>
          <span>{t('stack.kicker').replace(/^[0-9]+\s*\/\/\s*/, '')}</span>
        </div>

        <h2 className="c-stackSection__heading u-fontDisplay">{t('stack.title')}</h2>
        <p className="c-stackSection__subheading">{t('stack.subtitle')}</p>

        <div className="c-stackSection__matrix">
          {stackGroups.map((group, idx) => {
            const title = tOptional(group.titleKey) ?? group.fallbackTitle;

            return (
              <motion.div
                key={group.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`c-stackSection__col ${group.num === '04' ? 'c-stackSection__col--soft' : ''}`}
              >
                <div className="c-stackSection__colTop u-fontMono">
                  <span className="c-stackSection__colIndex">{group.num} //</span>
                  <h3 className="c-stackSection__colHeading">{title}</h3>
                </div>

                <ul className="c-stackSection__techList u-fontMono">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="c-stackSection__techRow">
                      <span className="c-stackSection__bullet">—</span>
                      <span className="c-stackSection__itemName">{item}</span>
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
};

export default StackSection;
