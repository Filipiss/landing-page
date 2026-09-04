import HeroSection from '../../organisms/HeroSection/HeroSection';
import AboutSection from '../../organisms/AboutSection/AboutSection';
import ProjectsSection from '../../organisms/ProjectsSection/ProjectsSection';
import ExperienceSection from '../../organisms/ExperienceSection/ExperienceSection';
import StackSection from '../../organisms/StackSection/StackSection';
import './HomePage.css';

export default function HomePage() {
    return (
        <div className="homepage-editorial-flow">
            <HeroSection />
            <ProjectsSection />
            <ExperienceSection />
            <StackSection />
            <AboutSection />
        </div>
    );
}
