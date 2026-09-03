import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollFadeSection.css';

interface ScrollFadeSectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function ScrollFadeSection({ children, className = '', id }: ScrollFadeSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    
    // Track the scroll progress of this section through the viewport
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    // Fade In as it enters the viewport (0 -> 0.18), fully visible (0.18 -> 0.82), Fade Out as it leaves (0.82 -> 1.0)
    const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.05, 1, 1, 0.05]);
    const y = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [25, 0, 0, -25]);

    return (
        <motion.div
            ref={ref}
            id={id}
            style={{ opacity, y }}
            className={`scroll-fade-section ${className}`}
        >
            {children}
        </motion.div>
    );
}
