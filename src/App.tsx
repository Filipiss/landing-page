import { useState, useEffect } from 'react';
import HeaderNav from './components/organisms/HeaderNav/HeaderNav';
import HomePage from './components/pages/HomePage/HomePage';
import ProjectDetailPage from './components/pages/ProjectDetailPage/ProjectDetailPage';
import PortfolioPage from './components/pages/PortfolioPage/PortfolioPage';
import ContactSection from './components/organisms/ContactSection/ContactSection';
import Footer from './components/organisms/Footer/Footer';
import CookiesModal from './components/organisms/CookiesModal/CookiesModal';

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
        // Initial run
        handleHashChange();

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <>
            {/* Navigation header toolbar */}
            <HeaderNav
                currentProjectId={currentProjectId}
            />

            {/* Main viewport layouts */}
            <main id="top">
                {currentProjectId ? (
                    // 1. Single Project Detail Page View
                    <ProjectDetailPage projectId={currentProjectId} />
                ) : isPortfolio ? (
                    // 2. Full Portfolio List Page View
                    <PortfolioPage />
                ) : (
                    // 3. Home Landing Sections
                    <HomePage />
                )}

                {/* Global Sections representing Footer/Contact criteria */}
                <ContactSection />
            </main>

            {/* Global Footer anchor details */}
            <Footer onOpenCookiesSettings={() => setCookiesModalOpen(true)} />

            {/* Cookie banner and detailed settings overlay modal */}
            <CookiesModal
                isOpen={cookiesModalOpen}
                onClose={() => setCookiesModalOpen(false)}
            />
        </>
    );
}

export default App;
