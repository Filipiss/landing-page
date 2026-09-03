import React, { useEffect, useRef, useMemo, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealProps {
    children: ReactNode;
    scrollContainerRef?: React.RefObject<HTMLElement | null>;
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    baseY?: number;
    blurStrength?: number;
    containerClassName?: string;
    textClassName?: string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'section' | 'article';
}

export default function ScrollReveal({
    children,
    scrollContainerRef,
    enableBlur = false,
    baseOpacity = 0,
    baseRotation = 0,
    baseY = 24,
    blurStrength = 0,
    containerClassName = '',
    textClassName = '',
    start = 'top 88%',
    end = 'bottom 15%',
    scrub = false,
    tag = 'div'
}: ScrollRevealProps) {
    const containerRef = useRef<HTMLElement | null>(null);
    const isTextString = typeof children === 'string';

    const splitText = useMemo(() => {
        if (!isTextString) return children;
        return (children as string).split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
                <span className="scroll-reveal-word" key={index}>
                    {word}
                </span>
            );
        });
    }, [children, isTextString]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

        const ctx = gsap.context(() => {
            const wordElements = el.querySelectorAll('.scroll-reveal-word');

            if (isTextString && wordElements.length > 0) {
                // Word-by-word reveal
                const scrollTriggerConfig: ScrollTrigger.Vars = scrub
                    ? {
                          trigger: el,
                          scroller,
                          start,
                          end,
                          scrub: typeof scrub === 'number' ? scrub : 1
                      }
                    : {
                          trigger: el,
                          scroller,
                          start,
                          toggleActions: 'play none none reverse'
                      };

                const tl = gsap.timeline({
                    scrollTrigger: scrollTriggerConfig
                });

                if (baseRotation !== 0) {
                    tl.fromTo(
                        el,
                        { transformOrigin: '0% 50%', rotate: baseRotation },
                        { rotate: 0, ease: 'power2.out', duration: 0.6 },
                        0
                    );
                }

                tl.fromTo(
                    wordElements,
                    {
                        opacity: baseOpacity,
                        y: baseY > 0 ? 8 : 0,
                        willChange: 'opacity, transform'
                    },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.02,
                        duration: 0.5,
                        ease: 'power2.out'
                    },
                    0
                );

                if (enableBlur && blurStrength > 0) {
                    tl.fromTo(
                        wordElements,
                        { filter: `blur(${blurStrength}px)` },
                        {
                            filter: 'blur(0px)',
                            stagger: 0.02,
                            duration: 0.5,
                            ease: 'power2.out'
                        },
                        0
                    );
                }
            } else {
                // Element / Card / Component reveal
                const scrollTriggerConfig: ScrollTrigger.Vars = scrub
                    ? {
                          trigger: el,
                          scroller,
                          start,
                          end,
                          scrub: typeof scrub === 'number' ? scrub : 1
                      }
                    : {
                          trigger: el,
                          scroller,
                          start,
                          toggleActions: 'play none none reverse'
                      };

                const fromProps: gsap.TweenVars = {
                    opacity: baseOpacity,
                    y: baseY,
                    willChange: 'opacity, transform'
                };

                const toProps: gsap.TweenVars = {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: scrollTriggerConfig
                };

                if (baseRotation !== 0) {
                    fromProps.rotate = baseRotation;
                    fromProps.transformOrigin = '0% 50%';
                    toProps.rotate = 0;
                }

                if (enableBlur && blurStrength > 0) {
                    fromProps.filter = `blur(${blurStrength}px)`;
                    toProps.filter = 'blur(0px)';
                }

                gsap.fromTo(el, fromProps, toProps);
            }
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, [
        scrollContainerRef,
        enableBlur,
        baseRotation,
        baseOpacity,
        baseY,
        blurStrength,
        start,
        end,
        scrub,
        isTextString
    ]);

    const Tag = tag as any;

    if (isTextString) {
        return (
            <Tag ref={containerRef} className={`scroll-reveal ${containerClassName}`.trim()}>
                <span className={`scroll-reveal-text ${textClassName}`.trim()}>{splitText}</span>
            </Tag>
        );
    }

    return (
        <Tag ref={containerRef} className={`scroll-reveal ${containerClassName}`.trim()}>
            {children}
        </Tag>
    );
}
