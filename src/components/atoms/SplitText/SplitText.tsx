import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './SplitText.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: string;
    splitType?: 'chars' | 'words';
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    threshold?: number;
    rootMargin?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    onLetterAnimationComplete?: () => void;
}

export default function SplitText({
    text,
    className = '',
    delay = 40,
    duration = 0.8,
    ease = 'power3.out',
    splitType = 'chars',
    from = { opacity: 0, y: 35 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = '-50px',
    textAlign = 'center',
    tag = 'p',
    onLetterAnimationComplete
}: SplitTextProps) {
    const ref = useRef<HTMLElement | null>(null);
    const animationCompletedRef = useRef(false);
    const onCompleteRef = useRef(onLetterAnimationComplete);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        onCompleteRef.current = onLetterAnimationComplete;
    }, [onLetterAnimationComplete]);

    useEffect(() => {
        if (document.fonts && document.fonts.status === 'loaded') {
            setFontsLoaded(true);
        } else if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                setFontsLoaded(true);
            });
        } else {
            setFontsLoaded(true);
        }
    }, []);

    useGSAP(
        () => {
            if (!ref.current || !text || !fontsLoaded) return;
            if (animationCompletedRef.current) return;

            const el = ref.current;
            const targets = el.querySelectorAll('.split-char, .split-word');

            if (!targets || targets.length === 0) return;

            const startPct = (1 - threshold) * 100;
            const start = `top ${startPct}%`;

            gsap.fromTo(
                targets,
                { ...from },
                {
                    ...to,
                    duration,
                    ease,
                    stagger: delay / 1000,
                    scrollTrigger: {
                        trigger: el,
                        start,
                        once: true
                    },
                    onComplete: () => {
                        animationCompletedRef.current = true;
                        onCompleteRef.current?.();
                    }
                }
            );
        },
        {
            dependencies: [
                text,
                delay,
                duration,
                ease,
                splitType,
                JSON.stringify(from),
                JSON.stringify(to),
                threshold,
                rootMargin,
                fontsLoaded
            ],
            scope: ref
        }
    );

    // Render characters or words wrapped in spans
    const renderContent = () => {
        if (splitType === 'words') {
            const words = text.split(' ');
            return words.map((word, wordIndex) => (
                <span key={wordIndex} className="split-word">
                    {word}
                    {wordIndex < words.length - 1 ? '\u00A0' : ''}
                </span>
            ));
        }

        // Chars splitting (group by words to preserve natural text-wrapping)
        const words = text.split(' ');
        return words.map((word, wordIndex) => (
            <span key={wordIndex} className="split-word">
                {word.split('').map((char, charIndex) => (
                    <span key={charIndex} className="split-char">
                        {char}
                    </span>
                ))}
                {wordIndex < words.length - 1 ? '\u00A0' : ''}
            </span>
        ));
    };

    const Tag = tag as any;

    return (
        <Tag
            ref={ref}
            className={`split-parent ${className}`.trim()}
            style={{ textAlign }}
        >
            {renderContent()}
        </Tag>
    );
}
