import { FC } from 'react';
import './MarqueeRibbon.css';

const ITEMS: string[] = [
  'FULLSTACK DEVELOPER',
  'REACT 19',
  'TYPESCRIPT',
  'PYTHON / FLASK',
  'POSTGRESQL',
  'NODE.JS & APIS',
  'UI/UX CRAFT',
  'FRAMER MOTION',
  'AI INTEGRATION & RAG',
  'CLEAN CODE'
];

export const MarqueeRibbon: FC = () => {
  return (
    <div className="c-marqueeRibbon" aria-hidden="true">
      <div className="c-marqueeRibbon__content">
        {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, idx) => (
          <div key={idx} className="c-marqueeRibbon__item">
            <span className="c-marqueeRibbon__star">✦</span>
            <span className="c-marqueeRibbon__text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeRibbon;
