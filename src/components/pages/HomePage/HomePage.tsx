import HeroSection from '../../organisms/HeroSection/HeroSection';
import MarqueeRibbon from '../../molecules/MarqueeRibbon/MarqueeRibbon';
import AboutSection from '../../organisms/AboutSection/AboutSection';
import ScrollFadeSection from '../../atoms/ScrollFadeSection/ScrollFadeSection';
import './HomePage.css';

export default function HomePage() {
    return (
        <>
            <ScrollFadeSection>
                <HeroSection />
            </ScrollFadeSection>

            <ScrollFadeSection>
                <MarqueeRibbon />
            </ScrollFadeSection>

            <ScrollFadeSection id="about-wrapper">
                <AboutSection />
            </ScrollFadeSection>
        </>
    );
}
