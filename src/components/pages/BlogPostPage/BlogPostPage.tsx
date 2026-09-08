import { useMemo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { 
    ArrowLeft, 
    Clock, 
    Calendar, 
    BookOpen, 
    CheckCircle2, 
    ExternalLink, 
    Terminal, 
    Sparkles, 
    ArrowRight,
    Award
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../../../data/blogData';
import './BlogPostPage.css';

interface BlogPostPageProps {
    slug: string;
}

export default function BlogPostPage({ slug }: BlogPostPageProps) {
    const { t, language } = useLanguage();

    const postIndex = useMemo(() => {
        return BLOG_POSTS.findIndex(p => p.slug === slug);
    }, [slug]);

    const post: BlogPost | undefined = BLOG_POSTS[postIndex];

    const prevPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
    const nextPost = postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;

    if (!post) {
        return (
            <div className="blog-post-not-found container font-mono">
                <h2>Conteúdo não encontrado // 404</h2>
                <p>O curso ou especialização solicitado não consta no registro de estudos.</p>
                <a href="#/blog" className="blog-back-btn">
                    <ArrowLeft size={15} />
                    {t('blog.back_to_blog')}
                </a>
            </div>
        );
    }

    const isCompleted = post.status === 'completed';
    const title = post.title[language] || post.title.pt;
    const kicker = post.kicker[language] || post.kicker.pt;
    const excerpt = post.excerpt[language] || post.excerpt.pt;
    const overview = post.overview[language] || post.overview.pt;
    const verdict = post.verdict[language] || post.verdict.pt;
    const syllabusList = post.syllabus[language] || post.syllabus.pt;
    const learningsList = post.keyLearnings[language] || post.keyLearnings.pt;

    const navigateToPost = (targetSlug: string) => {
        window.location.hash = `#/blog/${targetSlug}`;
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    return (
        <article className="blog-post-page">
            <div className="container blog-post-container">
                {/* 1. Top Breadcrumbs / Return Actions */}
                <div className="blog-post-nav-bar">
                    <a href="#/blog" className="blog-back-btn font-mono">
                        <ArrowLeft size={15} />
                        {t('blog.back_to_blog')}
                    </a>
                </div>

                {/* 2. Article Header */}
                <header className="blog-post-header">
                    <div className="blog-post-meta-strip font-mono">
                        <span className="blog-post-kicker">{kicker}</span>
                        <span className="blog-post-separator">&bull;</span>
                        <span className="blog-post-meta-item">
                            <Calendar size={13} />
                            {post.period}
                        </span>
                        <span className="blog-post-separator">&bull;</span>
                        <span className="blog-post-meta-item">
                            <Clock size={13} />
                            {post.workload}
                        </span>
                        <span className="blog-post-separator">&bull;</span>
                        <span className="blog-post-meta-item">
                            {post.readTime}
                        </span>
                    </div>

                    <h1 className="blog-post-title font-display">
                        {title}
                    </h1>

                    {/* Status & Progress Strip */}
                    <div className="blog-post-status-row font-mono">
                        <div className={`blog-badge-status ${isCompleted ? 'is-completed' : 'is-in-progress'}`}>
                            <span className="blog-status-indicator"></span>
                            <span>{isCompleted ? t('blog.status_completed') : t('blog.status_in_progress')}</span>
                        </div>

                        <div className="blog-post-progress-info">
                            <span className="blog-post-progress-text">{t('blog.progress_label')}: {post.progress}%</span>
                            <div className="blog-post-progress-bar">
                                <div className="blog-post-progress-fill" style={{ width: `${post.progress}%` }} />
                            </div>
                        </div>
                    </div>

                    <p className="blog-post-lead font-body">
                        {excerpt}
                    </p>

                    {/* Tags */}
                    <div className="blog-post-tags font-mono">
                        {post.tags.map(tag => (
                            <span key={tag} className="blog-post-tag">{tag}</span>
                        ))}
                    </div>
                </header>

                <hr className="blog-post-divider" />

                {/* 3. Main Reading Body */}
                <div className="blog-post-content">
                    {/* Overview Section */}
                    <section className="blog-content-section">
                        <div className="blog-section-header font-mono">
                            <BookOpen size={16} className="blog-section-icon" />
                            <span>// 01 · VISÃO GERAL & OBJETIVO</span>
                        </div>
                        <p className="blog-text-paragraph font-body">
                            {overview}
                        </p>
                    </section>

                    {/* Syllabus Section */}
                    <section className="blog-content-section">
                        <div className="blog-section-header font-mono">
                            <Terminal size={16} className="blog-section-icon" />
                            <span>// 02 · {t('blog.syllabus_title').toUpperCase()}</span>
                        </div>
                        <div className="blog-syllabus-list font-mono">
                            {syllabusList.map((item, idx) => (
                                <div key={idx} className="blog-syllabus-item">
                                    <span className="blog-syllabus-number">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className="blog-syllabus-text font-body">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Key Learnings Section */}
                    <section className="blog-content-section">
                        <div className="blog-section-header font-mono">
                            <CheckCircle2 size={16} className="blog-section-icon" />
                            <span>// 03 · {t('blog.key_learnings_title').toUpperCase()}</span>
                        </div>
                        <div className="blog-learnings-grid">
                            {learningsList.map((learning, idx) => (
                                <div key={idx} className="blog-learning-card">
                                    <div className="blog-learning-marker font-mono">
                                        &gt;
                                    </div>
                                    <p className="blog-learning-text font-body">
                                        {learning}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Practical Projects Section */}
                    {post.practicalProjects.length > 0 && (
                        <section className="blog-content-section">
                            <div className="blog-section-header font-mono">
                                <Sparkles size={16} className="blog-section-icon" />
                                <span>// 04 · {t('blog.practical_projects_title').toUpperCase()}</span>
                            </div>
                            <div className="blog-projects-list">
                                {post.practicalProjects.map((proj, idx) => {
                                    const projTitle = proj.title[language] || proj.title.pt;
                                    const projDesc = proj.description[language] || proj.description.pt;

                                    return (
                                        <div key={idx} className="blog-project-card">
                                            <div className="blog-project-card-head">
                                                <h3 className="blog-project-card-title font-display">
                                                    {projTitle}
                                                </h3>
                                                {proj.repoUrl && (
                                                    <a 
                                                        href={proj.repoUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="blog-project-repo-link font-mono"
                                                    >
                                                        <span>Repositório</span>
                                                        <ExternalLink size={13} />
                                                    </a>
                                                )}
                                            </div>
                                            <p className="blog-project-card-desc font-body">
                                                {projDesc}
                                            </p>
                                            <div className="blog-project-card-stack font-mono">
                                                {proj.techStack.map(st => (
                                                    <span key={st} className="blog-project-stack-tag">{st}</span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* Technical Verdict Section */}
                    <section className="blog-content-section">
                        <div className="blog-section-header font-mono">
                            <Award size={16} className="blog-section-icon" />
                            <span>// 05 · {t('blog.verdict_title').toUpperCase()}</span>
                        </div>
                        <div className="blog-verdict-box">
                            <div className="blog-verdict-quote-mark font-mono">&ldquo;</div>
                            <p className="blog-verdict-text font-body">
                                {verdict}
                            </p>
                        </div>
                    </section>

                    {/* Official Credential Button if applicable */}
                    {post.credentialUrl && (
                        <div className="blog-credential-action">
                            <a
                                href={post.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="blog-credential-btn font-mono"
                            >
                                <Award size={16} />
                                <span>{t('blog.credential_btn')}</span>
                                <ExternalLink size={14} className="kinetic-arrow" />
                            </a>
                        </div>
                    )}
                </div>

                {/* 4. Bottom Post Navigation */}
                {(prevPost || nextPost) && (
                    <nav className="blog-bottom-pagination font-mono">
                        {prevPost ? (
                            <button
                                type="button"
                                onClick={() => navigateToPost(prevPost.slug)}
                                className="blog-pag-btn blog-pag-prev"
                            >
                                <span className="blog-pag-direction">
                                    <ArrowLeft size={14} /> ANTERIOR
                                </span>
                                <span className="blog-pag-title font-display">
                                    {prevPost.title[language] || prevPost.title.pt}
                                </span>
                            </button>
                        ) : (
                            <div />
                        )}

                        {nextPost && (
                            <button
                                type="button"
                                onClick={() => navigateToPost(nextPost.slug)}
                                className="blog-pag-btn blog-pag-next"
                            >
                                <span className="blog-pag-direction">
                                    PRÓXIMO <ArrowRight size={14} />
                                </span>
                                <span className="blog-pag-title font-display">
                                    {nextPost.title[language] || nextPost.title.pt}
                                </span>
                            </button>
                        )}
                    </nav>
                )}
            </div>
        </article>
    );
}
