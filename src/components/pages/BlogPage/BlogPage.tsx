import { useState, useMemo, ChangeEvent } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { 
    ArrowLeft, 
    Search, 
    X, 
    BookOpen, 
    Clock, 
    CheckCircle2, 
    ArrowUpRight,
    Sparkles
} from 'lucide-react';
import { 
    BLOG_POSTS, 
    BLOG_CATEGORIES, 
    BLOG_STATUSES, 
    BlogPost, 
    BlogCategory, 
    BlogStatus 
} from '../../../data/blogData';
import './BlogPage.css';

export default function BlogPage() {
    const { t, language } = useLanguage();
    const [categoryFilter, setCategoryFilter] = useState<BlogCategory | 'all'>('all');
    const [statusFilter, setStatusFilter] = useState<BlogStatus | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Compute KPI metrics dynamically
    const stats = useMemo(() => {
        const completed = BLOG_POSTS.filter(p => p.status === 'completed').length;
        const inProgress = BLOG_POSTS.filter(p => p.status === 'in_progress').length;

        return {
            completed,
            inProgress
        };
    }, []);

    // Filter and search logic
    const filteredPosts = useMemo(() => {
        return BLOG_POSTS.filter(post => {
            // Category match
            if (categoryFilter !== 'all' && post.category !== categoryFilter) {
                return false;
            }

            // Status match
            if (statusFilter !== 'all' && post.status !== statusFilter) {
                return false;
            }

            // Search query match (searches title, tags, institution, and excerpt)
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                const title = (post.title[language] || post.title.pt).toLowerCase();
                const excerpt = (post.excerpt[language] || post.excerpt.pt).toLowerCase();
                const institution = post.institution.toLowerCase();
                const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(query));

                return title.includes(query) || excerpt.includes(query) || institution.includes(query) || tagsMatch;
            }

            return true;
        });
    }, [categoryFilter, statusFilter, searchQuery, language]);

    const handleCardClick = (slug: string) => {
        window.location.hash = `#/blog/${slug}`;
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    return (
        <div className="blog-page">
            <div className="container">
                {/* 1. Page Header & Back Anchor */}
                <header className="blog-header">
                    <a href="#/" className="blog-back-btn font-mono">
                        <ArrowLeft size={15} />
                        {t('blog.back_to_home')}
                    </a>

                    <div className="blog-kicker font-mono">
                        {t('blog.kicker')}
                    </div>

                    <h1 className="blog-title font-display">
                        {t('blog.title')}
                    </h1>

                    <p className="blog-subtitle font-body">
                        {t('blog.subtitle')}
                    </p>

                    {/* 2. KPI Metrics Strip */}
                    <div className="blog-stats-grid">
                        <div className="blog-stat-card">
                            <span className="blog-stat-label font-mono">
                                <CheckCircle2 size={13} className="blog-stat-icon" />
                                {t('blog.kpi_completed')}
                            </span>
                            <span className="blog-stat-value font-display">{stats.completed}</span>
                        </div>

                        <div className="blog-stat-card">
                            <span className="blog-stat-label font-mono">
                                <Clock size={13} className="blog-stat-icon blog-stat-pulse" />
                                {t('blog.kpi_in_progress')}
                            </span>
                            <span className="blog-stat-value font-display">{stats.inProgress}</span>
                        </div>
                    </div>

                    {/* 3. Search Bar & Filter Controls */}
                    <div className="blog-controls-wrapper">
                        {/* Search Input */}
                        <div className="blog-search-box font-mono">
                            <Search size={16} className="blog-search-icon" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                placeholder={t('blog.search_placeholder')}
                                className="blog-search-input font-mono"
                                aria-label="Filtrar conteúdos"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="blog-search-clear"
                                    aria-label="Limpar busca"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Category & Status Filter Buttons */}
                        <div className="blog-filters-row font-mono">
                            <div className="blog-filter-group">
                                {BLOG_CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setCategoryFilter(cat.id)}
                                        className={`blog-filter-btn ${categoryFilter === cat.id ? 'is-active' : ''}`}
                                    >
                                        {cat.label[language] || cat.label.pt}
                                    </button>
                                ))}
                            </div>

                            <div className="blog-filter-group blog-filter-status-group">
                                {BLOG_STATUSES.map(st => (
                                    <button
                                        key={st.id}
                                        type="button"
                                        onClick={() => setStatusFilter(st.id)}
                                        className={`blog-filter-btn blog-status-filter-btn ${statusFilter === st.id ? 'is-active' : ''}`}
                                    >
                                        {st.label[language] || st.label.pt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                {/* 4. Posts Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="blog-cards-grid">
                        {filteredPosts.map((post: BlogPost, index: number) => {
                            const isCompleted = post.status === 'completed';
                            const title = post.title[language] || post.title.pt;
                            const excerpt = post.excerpt[language] || post.excerpt.pt;
                            const kicker = post.kicker[language] || post.kicker.pt;

                            return (
                                <article
                                    key={post.id}
                                    className={`blog-card ${post.featured ? 'is-featured' : ''}`}
                                    onClick={() => handleCardClick(post.slug)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleCardClick(post.slug);
                                        }
                                    }}
                                    style={{ animationDelay: `${index * 60}ms` }}
                                >
                                    {/* Card Header Strip */}
                                    <div className="blog-card-header">
                                        <div className="blog-card-meta font-mono">
                                            <span className="blog-card-institution">{post.institution}</span>
                                            <span className="blog-card-dot">&bull;</span>
                                            <span className="blog-card-workload">{post.workload}</span>
                                        </div>

                                        <div className="blog-card-badges font-mono">
                                            {post.featured && (
                                                <span className="blog-badge-featured">
                                                    <Sparkles size={11} />
                                                    {t('blog.featured_badge')}
                                                </span>
                                            )}
                                            <span className={`blog-badge-status ${isCompleted ? 'is-completed' : 'is-in-progress'}`}>
                                                <span className="blog-status-indicator"></span>
                                                {isCompleted ? t('blog.status_completed') : t('blog.status_in_progress')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Kicker & Title */}
                                    <div className="blog-card-kicker font-mono">{kicker}</div>
                                    <h2 className="blog-card-title font-display">{title}</h2>

                                    {/* Progress Bar */}
                                    <div className="blog-card-progress-track" title={`${t('blog.progress_label')}: ${post.progress}%`}>
                                        <div 
                                            className="blog-card-progress-fill" 
                                            style={{ width: `${post.progress}%` }}
                                        />
                                    </div>

                                    {/* Excerpt */}
                                    <p className="blog-card-excerpt font-body">
                                        {excerpt}
                                    </p>

                                    {/* Tags */}
                                    <div className="blog-card-tags font-mono">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="blog-card-tag">{tag}</span>
                                        ))}
                                    </div>

                                    {/* Footer / CTA Row */}
                                    <div className="blog-card-footer font-mono">
                                        <span className="blog-card-time">
                                            <Clock size={12} />
                                            {post.readTime}
                                        </span>

                                        <div className="blog-card-cta">
                                            <span>{t('blog.read_post')}</span>
                                            <ArrowUpRight size={14} className="kinetic-arrow" />
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty state */
                    <div className="blog-empty-state font-mono">
                        <BookOpen size={36} className="blog-empty-icon" />
                        <p>{t('blog.no_results')}</p>
                        <button
                            type="button"
                            onClick={() => {
                                setCategoryFilter('all');
                                setStatusFilter('all');
                                setSearchQuery('');
                            }}
                            className="blog-reset-btn"
                        >
                            Resetar Filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
