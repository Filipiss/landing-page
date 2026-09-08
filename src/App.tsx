import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderNav from './components/organisms/HeaderNav/HeaderNav';
import HomePage from './components/pages/HomePage/HomePage';
import ProjectDetailPage from './components/pages/ProjectDetailPage/ProjectDetailPage';
import PortfolioPage from './components/pages/PortfolioPage/PortfolioPage';
import BlogPage from './components/pages/BlogPage/BlogPage';
import BlogPostPage from './components/pages/BlogPostPage/BlogPostPage';
import ContactSection from './components/organisms/ContactSection/ContactSection';
import Footer from './components/organisms/Footer/Footer';
import CookiesModal from './components/organisms/CookiesModal/CookiesModal';
import CvDownloadModal from './components/organisms/CvDownloadModal/CvDownloadModal';
import AccessibilityWidget from './components/organisms/AccessibilityWidget/AccessibilityWidget';

function App() {
    const [currentProjectId, setCurrentProjectId] = useState<string | null>(() => {
        const hash = window.location.hash;
        if (hash.startsWith('#/project/')) {
            const match = hash.match(/^#\/project\/([^#?]+)/);
            return match ? match[1] : null;
        }
        return null;
    });

    const [isPortfolio, setIsPortfolio] = useState<boolean>(() => {
        return window.location.hash === '#/portfolio';
    });

    const [isBlog, setIsBlog] = useState<boolean>(() => {
        return window.location.hash === '#/blog';
    });

    const [currentBlogSlug, setCurrentBlogSlug] = useState<string | null>(() => {
        const hash = window.location.hash;
        if (hash.startsWith('#/blog/')) {
            const match = hash.match(/^#\/blog\/([^#?]+)/);
            return match ? match[1] : null;
        }
        return null;
    });

    const [cookiesModalOpen, setCookiesModalOpen] = useState(false);
    const [cvModalOpen, setCvModalOpen] = useState(false);

    // Monitor client-side hash swaps
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;

            // 1. Parse Project Detail Route
            if (hash.startsWith('#/project/')) {
                const match = hash.match(/^#\/project\/([^#?]+)/);
                if (match) {
                    const nextProjectId = match[1];
                    setCurrentProjectId((prev) => {
                        if (prev !== nextProjectId) {
                            window.scrollTo({ top: 0, behavior: 'instant' });
                        }
                        return nextProjectId;
                    });
                    setIsPortfolio(false);
                    setIsBlog(false);
                    setCurrentBlogSlug(null);
                    return;
                }
            } else if (hash === '#/portfolio') {
                setCurrentProjectId(null);
                setIsPortfolio(true);
                setIsBlog(false);
                setCurrentBlogSlug(null);
                window.scrollTo({ top: 0, behavior: 'instant' });
                return;
            } else if (hash.startsWith('#/blog/')) {
                // 2. Parse Blog Post Detail Route
                const match = hash.match(/^#\/blog\/([^#?]+)/);
                if (match) {
                    const nextBlogSlug = match[1];
                    setCurrentBlogSlug((prev) => {
                        if (prev !== nextBlogSlug) {
                            window.scrollTo({ top: 0, behavior: 'instant' });
                        }
                        return nextBlogSlug;
                    });
                    setCurrentProjectId(null);
                    setIsPortfolio(false);
                    setIsBlog(false);
                    return;
                }
            } else if (hash === '#/blog') {
                // 3. Parse Blog List Route
                setCurrentProjectId(null);
                setIsPortfolio(false);
                setIsBlog(true);
                setCurrentBlogSlug(null);
                window.scrollTo({ top: 0, behavior: 'instant' });
                return;
            }

            setCurrentProjectId(null);
            setIsPortfolio(false);
            setIsBlog(false);
            setCurrentBlogSlug(null);

            // Handle simple scroll to home anchor if hash on home page (e.g. #/about, #/contact, #/projects)
            if (hash.startsWith('#/')) {
                const sectionId = hash.replace('#/', '');
                if (sectionId) {
                    setTimeout(() => {
                        const element = document.getElementById(sectionId);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                }
            }
        };

        const handleOpenCvModal = () => setCvModalOpen(true);

        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('open-cv-modal', handleOpenCvModal);
        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('open-cv-modal', handleOpenCvModal);
        };
    }, []);

    const activeRouteKey = currentProjectId 
        ? `project-${currentProjectId}` 
        : isPortfolio 
        ? 'portfolio' 
        : currentBlogSlug
        ? `blog-${currentBlogSlug}`
        : isBlog
        ? 'blog'
        : 'home';

    return (
        <>
            {/* Navigation header toolbar */}
            <HeaderNav
                currentProjectId={currentProjectId}
                onOpenCvModal={() => setCvModalOpen(true)}
            />

            {/* Main viewport layouts with smooth page transition animations */}
            <main id="top">
                <AnimatePresence mode="wait">
                    {currentProjectId ? (
                        // 1. Single Project Detail Page View
                        <motion.div
                            key={activeRouteKey}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="page-transition-container"
                        >
                            <ProjectDetailPage projectId={currentProjectId} />
                        </motion.div>
                    ) : isPortfolio ? (
                        // 2. Full Portfolio List Page View
                        <motion.div
                            key={activeRouteKey}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="page-transition-container"
                        >
                            <PortfolioPage />
                        </motion.div>
                    ) : currentBlogSlug ? (
                        // 3. Single Blog Post Detail Page View
                        <motion.div
                            key={activeRouteKey}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="page-transition-container"
                        >
                            <BlogPostPage slug={currentBlogSlug} />
                        </motion.div>
                    ) : isBlog ? (
                        // 4. Dedicated Blog / Specializations Page View
                        <motion.div
                            key={activeRouteKey}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="page-transition-container"
                        >
                            <BlogPage />
                        </motion.div>
                    ) : (
                        // 5. Home Landing Sections
                        <motion.div
                            key={activeRouteKey}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="page-transition-container"
                        >
                            <HomePage />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Global Contact Section */}
                <div id="contact-wrapper">
                    <ContactSection onOpenCvModal={() => setCvModalOpen(true)} />
                </div>
            </main>

            {/* Global Footer anchor details */}
            <Footer onOpenCookiesSettings={() => setCookiesModalOpen(true)} />

            {/* Floating Accessibility Widget in bottom-right */}
            <AccessibilityWidget />

            {/* Cookie banner and detailed settings overlay modal */}
            <CookiesModal
                isOpen={cookiesModalOpen}
                onClose={() => setCookiesModalOpen(false)}
            />

            {/* CV / Resume Language Selection Modal */}
            <CvDownloadModal
                isOpen={cvModalOpen}
                onClose={() => setCvModalOpen(false)}
            />
        </>
    );
}

export default App;
