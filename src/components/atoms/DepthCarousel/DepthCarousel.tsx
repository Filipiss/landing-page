import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import './depthCarousel.css';

export interface DepthCarouselItem {
  image: string;
  alt?: string;
  [key: string]: any;
}

export interface DepthCarouselProps {
  items?: Array<string | DepthCarouselItem>;
  focusIndex?: number;
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tint?: string;
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: 'left' | 'right';
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  duration?: number;
  ease?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  onChange?: (index: number, item: DepthCarouselItem) => void;
  onActiveCardClick?: (index: number, item: DepthCarouselItem) => void;
  className?: string;
}

const DEFAULT_ITEMS: DepthCarouselItem[] = [
  { image: 'https://picsum.photos/seed/depth1/800/1000', alt: 'Slide 1' },
  { image: 'https://picsum.photos/seed/depth2/800/1000', alt: 'Slide 2' },
  { image: 'https://picsum.photos/seed/depth3/800/1000', alt: 'Slide 3' },
  { image: 'https://picsum.photos/seed/depth4/800/1000', alt: 'Slide 4' },
  { image: 'https://picsum.photos/seed/depth5/800/1000', alt: 'Slide 5' },
];

const normalizeItem = (it: string | DepthCarouselItem): DepthCarouselItem => 
  typeof it === 'string' ? { image: it, alt: '' } : it;

export const DepthCarousel: React.FC<DepthCarouselProps> = ({
  items = DEFAULT_ITEMS,
  focusIndex = 0,
  cardWidth = 360,
  cardHeight = 225,
  radius = 6,
  tint = '#000000',
  depth = 180,
  spread = 100,
  tilt = 18,
  tiltDirection = 'right',
  perspective = 1400,
  visibleCards = 5,
  falloff = 0.22,
  blur = 4,
  duration = 750,
  ease = 'power2.out',
  autoplay = false,
  autoplayDelay = 3500,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  onActiveCardClick,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tintRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeIndexRef = useRef<number>(focusIndex);
  const [, setRerender] = useState<number>(0);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const normalizedItems: DepthCarouselItem[] = useMemo(
    () => (items && items.length > 0 ? items.map(normalizeItem) : DEFAULT_ITEMS),
    [items]
  );
  const total = normalizedItems.length;

  const clampIndex = useCallback(
    (idx: number): number => {
      if (total <= 0) return 0;
      if (loop) return ((idx % total) + total) % total;
      return Math.max(0, Math.min(idx, total - 1));
    },
    [loop, total]
  );

  const layoutCards = useCallback(() => {
    if (!total || prefersReducedMotion) return;

    const active = activeIndexRef.current;
    const animDuration = duration / 1000;
    const halfVis = Math.floor(visibleCards / 2);
    const sideMultiplier = tiltDirection === 'right' ? 1 : -1;

    for (let i = 0; i < total; i++) {
      const card = cardRefs.current[i];
      const tintEl = tintRefs.current[i];
      if (!card) continue;

      let dist = i - active;
      if (loop) {
        if (dist > total / 2) dist -= total;
        if (dist < -total / 2) dist += total;
      }

      const isCurrent = dist === 0;
      const isVisible = Math.abs(dist) <= halfVis;

      if (!isVisible) {
        gsap.to(card, {
          opacity: 0,
          scale: 0.7,
          x: dist * (spread * 0.8),
          z: -Math.abs(dist) * depth,
          rotationY: 0,
          duration: animDuration,
          ease,
          pointerEvents: 'none',
          overwrite: 'auto',
        });
        if (tintEl) {
          gsap.to(tintEl, { opacity: 0, duration: animDuration, overwrite: 'auto' });
        }
        continue;
      }

      const x = dist * spread;
      const z = -Math.abs(dist) * depth;
      const rotY = -Math.sign(dist) * tilt * sideMultiplier;
      const opacity = isCurrent ? 1 : Math.max(0.2, 1 - Math.abs(dist) * falloff);
      const blurAmount = isCurrent ? 0 : Math.min(10, Math.abs(dist) * blur);

      gsap.to(card, {
        x,
        z,
        rotationY: rotY,
        scale: 1,
        opacity,
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
        zIndex: 100 - Math.abs(dist) * 10,
        pointerEvents: isCurrent ? 'auto' : 'none',
        duration: animDuration,
        ease,
        overwrite: 'auto',
      });

      if (tintEl) {
        const tintOpacity = isCurrent ? 0 : Math.min(0.65, Math.abs(dist) * 0.22);
        gsap.to(tintEl, {
          opacity: tintOpacity,
          duration: animDuration,
          ease,
          overwrite: 'auto',
        });
      }
    }
  }, [
    blur,
    depth,
    duration,
    ease,
    falloff,
    loop,
    prefersReducedMotion,
    spread,
    tilt,
    tiltDirection,
    total,
    visibleCards,
  ]);

  const setActive = useCallback(
    (nextIdx: number, userInitiated = true) => {
      const clamped = clampIndex(nextIdx);
      if (clamped === activeIndexRef.current && userInitiated) {
        return;
      }
      activeIndexRef.current = clamped;
      setRerender((v) => v + 1);
      layoutCards();
      if (onChange) {
        onChange(clamped, normalizedItems[clamped]);
      }
    },
    [clampIndex, layoutCards, normalizedItems, onChange]
  );

  const prev = useCallback(() => {
    setActive(activeIndexRef.current - 1);
  }, [setActive]);

  const next = useCallback(() => {
    setActive(activeIndexRef.current + 1);
  }, [setActive]);

  useEffect(() => {
    if (focusIndex !== undefined) {
      setActive(focusIndex, false);
    }
  }, [focusIndex, setActive]);

  useEffect(() => {
    layoutCards();
  }, [layoutCards]);

  useEffect(() => {
    if (!autoplay || total <= 1) return;
    const interval = setInterval(() => {
      setActive(activeIndexRef.current + 1, false);
    }, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, setActive, total]);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  const activeIndex = activeIndexRef.current;

  return (
    <div
      ref={containerRef}
      className={`c-depthCarousel ${className}`.trim()}
      style={
        {
          '--dc-perspective': `${perspective}px`,
          '--dc-card-width': `${cardWidth}px`,
          '--dc-card-height': `${cardHeight}px`,
          '--dc-card-radius': `${radius}px`,
          '--dc-tint': tint,
        } as React.CSSProperties
      }
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="3D Image Showcase Carousel"
    >
      <div className="c-depthCarousel__stage">
        {normalizedItems.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className="c-depthCarousel__card"
            onClick={() => {
              if (idx === activeIndex && onActiveCardClick) {
                onActiveCardClick(idx, item);
              } else {
                setActive(idx);
              }
            }}
            role="button"
            tabIndex={idx === activeIndex ? 0 : -1}
            aria-label={item.alt || `Item ${idx + 1}`}
          >
            <img
              src={item.image}
              alt={item.alt || ''}
              className="c-depthCarousel__img"
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
            <div
              ref={(el) => {
                tintRefs.current[idx] = el;
              }}
              className="c-depthCarousel__tint"
            />
          </div>
        ))}
      </div>

      {showControls && total > 1 && (
        <>
          <button
            type="button"
            className="c-depthCarousel__arrow c-depthCarousel__arrow--prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="c-depthCarousel__arrow c-depthCarousel__arrow--next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      {showIndicators && total > 1 && (
        <div className="c-depthCarousel__dots">
          {normalizedItems.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`c-depthCarousel__dot ${i === activeIndex ? 'isActive' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setActive(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DepthCarousel;
