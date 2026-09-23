import { FC } from 'react';
import HeroSection from '../../organisms/HeroSection/HeroSection';
import AboutSection from '../../organisms/AboutSection/AboutSection';
import ProjectsSection from '../../organisms/ProjectsSection/ProjectsSection';
import ExperienceSection from '../../organisms/ExperienceSection/ExperienceSection';
import StackSection from '../../organisms/StackSection/StackSection';
import './homeTemplate.css';

export const HomeTemplate: FC = () => {
  return (
    <div className="l-homeTemplate">
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <StackSection />
      <AboutSection />
    </div>
  );
};

export default HomeTemplate;
