import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderNav from './components/organisms/HeaderNav/HeaderNav';
import HomePage from './components/pages/HomePage/HomePage';
import ProjectDetailPage from './components/pages/ProjectDetailPage/ProjectDetailPage';
import PortfolioPage from './components/pages/PortfolioPage/PortfolioPage';
import ContactSection from './components/organisms/ContactSection/ContactSection';
import Footer from './components/organisms/Footer/Footer';
import CookiesModal from './components/organisms/CookiesModal/CookiesModal';
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

    const [cookiesModalOpen, setCookiesModalOpen] = useState(false);

    // Monitor client-side hash swaps
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;

            // Parse main route
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
                    return;
                }
            } else if (hash === '#/portfolio') {
                setCurrentProjectId(null);
                setIsPortfolio(true);
                window.scrollTo({ top: 0, behavior: 'instant' });
                return;
            }

            setCurrentProjectId(null);
            setIsPortfolio(false);

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

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const activeRouteKey = currentProjectId 
        ? `project-${currentProjectId}` 
        : isPortfolio 
        ? 'portfolio' 
        : 'home';

    return (
        <>
            {/* Navigation header toolbar */}
            <HeaderNav
                currentProjectId={currentProjectId}
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
                    ) : (
                        // 3. Home Landing Sections
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
                    <ContactSection />
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
        </>
    );
}

export default App;
