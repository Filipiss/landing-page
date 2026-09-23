import { FC } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';
import './stackSection.css';

export const StackSection: FC = () => {
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
            const title = t(group.titleKey) !== group.titleKey ? t(group.titleKey) : group.fallbackTitle;

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="c-stackSection__learningCard"
        >
          <div className="c-stackSection__learningHeader u-fontMono">
            <div className="c-stackSection__learningHeaderLeft">
              <span className="c-stackSection__learningKicker">{t('stack.learning_kicker')}</span>
              <h3 className="c-stackSection__learningTitle u-fontDisplay">{t('stack.learning_title')}</h3>
            </div>
            <div className="c-stackSection__learningStatusPill">
              <span className="c-stackSection__learningPulseDot" />
              <span>{t('stack.learning_badge')}</span>
            </div>
          </div>

          <div className="c-stackSection__learningContent">
            <div className="c-stackSection__learningMainRow">
              <div className="c-stackSection__learningNarrativeCol">
                <h4 className="c-stackSection__learningCourseName u-fontDisplay">{t('stack.learning_course')}</h4>
                <p className="c-stackSection__learningCourseDesc">{t('stack.learning_desc')}</p>

                <div className="c-stackSection__learningProgressBlock u-fontMono">
                  <div className="c-stackSection__learningProgressMeta">
                    <span>{language === 'pt' ? 'PROGRESSO DO CURSO' : 'COURSE PROGRESS'}</span>
                    <span className="c-stackSection__learningProgressNum">25%</span>
                  </div>
                  <div className="c-stackSection__learningProgressTrack">
                    <div className="c-stackSection__learningProgressFill" style={{ width: '25%' }} />
                  </div>
                </div>
              </div>

              <div className="c-stackSection__learningSideCol u-fontMono">
                <div className="c-stackSection__learningTopicsBox">
                  <span className="c-stackSection__learningTopicsTitle">{t('stack.learning_topics_label')}</span>
                  <div className="c-stackSection__learningChipsGroup">
                    {learningTopics.map((topic, i) => (
                      <span key={i} className="c-stackSection__learningTopicChip">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="c-stackSection__learningMilestoneBox">
                  <span className="c-stackSection__learningMilestoneTag">{t('stack.learning_goal_label')}</span>
                  <p className="c-stackSection__learningMilestoneText">{t('stack.learning_goal')}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StackSection;
