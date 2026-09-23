import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeaderNav from './components/organisms/HeaderNav/HeaderNav';
import HomeTemplate from './components/templates/homeTemplate/homeTemplate';
import ProjectDetailTemplate from './components/templates/projectDetailTemplate/projectDetailTemplate';
import PortfolioTemplate from './components/templates/portfolioTemplate/portfolioTemplate';
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

  const [cookiesModalOpen, setCookiesModalOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

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

      if (hash.startsWith('#/')) {
        const sectionId = hash.replace('#/', '');
        if (sectionId && sectionId !== 'blog') {
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
    : 'home';

  return (
    <>
      <HeaderNav
        currentProjectId={currentProjectId}
        onOpenCvModal={() => setCvModalOpen(true)}
      />

      <main id="top">
        <AnimatePresence mode="wait">
          {currentProjectId ? (
            <motion.div
              key={activeRouteKey}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="l-pageTransition"
            >
              <ProjectDetailTemplate projectId={currentProjectId} />
            </motion.div>
          ) : isPortfolio ? (
            <motion.div
              key={activeRouteKey}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="l-pageTransition"
            >
              <PortfolioTemplate />
            </motion.div>
          ) : (
            <motion.div
              key={activeRouteKey}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="l-pageTransition"
            >
              <HomeTemplate />
            </motion.div>
          )}
        </AnimatePresence>

        <div id="contact-wrapper">
          <ContactSection onOpenCvModal={() => setCvModalOpen(true)} />
        </div>
      </main>

      <Footer onOpenCookiesSettings={() => setCookiesModalOpen(true)} />

      <AccessibilityWidget />

      <CookiesModal
        isOpen={cookiesModalOpen}
        onClose={() => setCookiesModalOpen(false)}
      />

      <CvDownloadModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />
    </>
  );
}

export default App;
