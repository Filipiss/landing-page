import HeroSection from '../../organisms/HeroSection/HeroSection';
import AboutSection from '../../organisms/AboutSection/AboutSection';
import ProjectsSection from '../../organisms/ProjectsSection/ProjectsSection';
import './HomePage.css';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
        </>
    );
}
