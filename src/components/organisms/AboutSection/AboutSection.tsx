import { useLanguage } from '../../../context/LanguageContext';
import { FileText, Cpu, Layout, Database, Users, Languages, Wrench } from 'lucide-react';
import ProfileCard from '../../molecules/ProfileCard/ProfileCard';
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
            items: ['React (v19)', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Framer Motion', 'Semantic CSS / BEM']
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
        <section id="about" className="section">
            <div className="container">

                {/* CV Details */}
                <div className="about-grid">

                    <div className="about-cv">
                        <span className="pretitle">{t('about.title')}</span>
                        <h2 className="section-title">{t('about.subtitle')}</h2>
                        <p className="about-text">{t('about.bio_p1')}</p>
                        <p className="about-text">{t('about.bio_p2')}</p>

                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                alert('MOCK CV (PDF) DOWNLOAD ACTION');
                            }}
                            className="btn btn-outline"
                            style={{ marginTop: '20px', alignSelf: 'flex-start' }}
                        >
                            <FileText size={18} style={{ marginRight: '8px' }} />
                            {t('about.cv_download')}
                        </a>
                    </div>

                    {/* Mascots Section */}
                    <div className="about-mascots">
                        {/* Owner Profile */}
                        <ProfileCard
                            avatar={
                                <svg className="profile-card-svg" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="48" fill="var(--bg-secondary)" stroke="var(--accent-primary)" strokeWidth="2" />
                                    {/* Hoodie body */}
                                    <path d="M25,85 C25,70 35,62 50,62 C65,62 75,70 75,85" fill="var(--accent-glow)" stroke="var(--accent-primary)" strokeWidth="2" />
                                    {/* Head */}
                                    <circle cx="50" cy="45" r="16" fill="var(--bg-primary)" stroke="var(--accent-primary)" strokeWidth="2" />
                                    {/* Glasses */}
                                    <path d="M40,43 L47,43 M53,43 L60,43" stroke="var(--accent-secondary)" strokeWidth="2" />
                                    <circle cx="43" cy="43" r="3" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" />
                                    <circle cx="57" cy="43" r="3" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" />
                                    {/* Laptop decoration */}
                                    <rect x="35" y="75" width="30" height="15" rx="2" fill="var(--bg-secondary)" stroke="var(--accent-primary)" strokeWidth="1" />
                                    <line x1="38" y1="85" x2="62" y2="85" stroke="var(--accent-secondary)" strokeWidth="2" />
                                </svg>
                            }
                            title={t('about.filip_title')}
                            description={t('about.filip_desc')}
                        />

                        {/* Chico Wagner (Pet Dog) */}
                        <ProfileCard
                            avatar={
                                <svg className="profile-card-svg" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="48" fill="var(--bg-secondary)" stroke="var(--accent-secondary)" strokeWidth="2" />
                                    {/* Dog ears */}
                                    <path d="M28,25 Q18,35 22,48" stroke="var(--accent-secondary)" strokeWidth="2.5" fill="var(--accent-glow)" strokeLinecap="round" />
                                    <path d="M72,25 Q82,35 78,48" stroke="var(--accent-secondary)" strokeWidth="2.5" fill="var(--accent-glow)" strokeLinecap="round" />
                                    {/* Dog head */}
                                    <ellipse cx="50" cy="48" rx="20" ry="18" fill="var(--bg-primary)" stroke="var(--accent-secondary)" strokeWidth="2" />
                                    {/* Snout */}
                                    <ellipse cx="50" cy="54" rx="9" ry="7" fill="var(--text-muted)" opacity="0.2" />
                                    {/* Dog nose */}
                                    <polygon points="46,51 54,51 50,56" fill="var(--accent-secondary)" />
                                    {/* Eyes */}
                                    <circle cx="43" cy="42" r="2.5" fill="var(--accent-secondary)" />
                                    <circle cx="57" cy="42" r="2.5" fill="var(--accent-secondary)" />
                                    {/* Cute developer glasses for dog */}
                                    <path d="M38,42 L47,42 M53,42 L62,42" stroke="var(--accent-primary)" strokeWidth="1.5" />
                                    <rect x="38" y="38" width="10" height="8" rx="1.5" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" />
                                    <rect x="52" y="38" width="10" height="8" rx="1.5" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" />
                                    <path d="M48,42 L52,42" stroke="var(--accent-primary)" strokeWidth="1.5" />
                                </svg>
                            }
                            title={t('about.chico_title')}
                            description={t('about.chico_desc')}
                        />
                    </div>

                </div>

                {/* Skills Section */}
                <div className="skills">
                    <div className="text-center" style={{ marginBottom: '40px' }}>
                        <span className="pretitle">{t('about.skills_title')}</span>
                    </div>

                    <div className="skills-grid">
                        {skillsData.map((category) => (
                            <div key={category.key} className="skills-category">
                                <div className="skills-category-header">
                                    {category.icon}
                                    <h3 className="skills-category-title">
                                        {t(`about.skills_categories.${category.key}`)}
                                    </h3>
                                </div>
                                <div className="skills-list">
                                    {category.items.map((skill, index) => (
                                        <span key={index} className="skills-badge">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
