import { FC } from 'react';

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const TechIcon: FC<TechIconProps> = ({ name, size = 32, className = '' }) => {
  const s = size;

  switch (name.toLowerCase()) {
    case 'html':
    case 'html5':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="HTML5"><title>HTML5</title>
          <path d="M5.333 3.333L7.733 26.667 16 28.933l8.267-2.266L26.667 3.333H5.333z" fill="#E44D26"/>
          <path d="M16 5.333v21.334l6.4-1.734L24.4 5.333H16z" fill="#F16529"/>
          <path d="M16 11.2h4.533l-.333 3.6H16v3.2h4.2l-.533 5.467L16 24.333v3.334l6-1.667.8-8.2.333-3.6.334-3.6H16v.6z" fill="#EBEBEB"/>
          <path d="M16 11.2H8.8l.267 2.667h6.933v-2.667zm0 6.4H11.6l.267 2.8 4.133 1.133V17.6z" fill="#FFFFFF"/>
        </svg>
      );

    case 'css':
    case 'css3':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="CSS3"><title>CSS3</title>
          <path d="M5.333 3.333L7.733 26.667 16 28.933l8.267-2.266L26.667 3.333H5.333z" fill="#1572B6"/>
          <path d="M16 5.333v21.334l6.4-1.734L24.4 5.333H16z" fill="#33A9DC"/>
          <path d="M16 11.2h4.533l-.333 3.6H16v3.2h4.2l-.533 5.467L16 24.333v3.334l6-1.667.8-8.2.333-3.6.334-3.6H16v.6z" fill="#EBEBEB"/>
          <path d="M16 11.2H8.8l.267 2.667h6.933v-2.667zm0 6.4H11.6l.267 2.8 4.133 1.133V17.6z" fill="#FFFFFF"/>
        </svg>
      );

    case 'js':
    case 'javascript':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="JavaScript"><title>JavaScript</title>
          <rect width="32" height="32" rx="6" fill="#F7DF1E"/>
          <path d="M18.8 22.8c.6 1 1.6 1.6 2.8 1.6 1.2 0 2-.6 2-1.8 0-1.2-.8-1.8-2.2-2.4l-.8-.4c-2.2-.9-3.6-2-3.6-4.4 0-2.2 1.8-3.8 4.4-3.8 1.8 0 3.2.8 4 2.4l-2.4 1.6c-.4-.8-1-1.2-1.8-1.2-1 0-1.6.6-1.6 1.4 0 1 .6 1.4 2 2l.8.4c2.6 1.1 4 2.2 4 4.8 0 2.8-2.2 4.2-5 4.2-2.6 0-4.4-1.2-5.2-3l2.6-1.8zM9.6 22.6c.4.6.8 1.2 1.6 1.6.8.4 1.8.4 2.6.2.6-.2 1.2-.8 1.2-2.2V12h3.2v10.2c0 2.2-1.2 3.6-3.2 4.2-1.6.4-3.4.2-4.6-.8l-.8-.8 1.8-2.2z" fill="#000000"/>
        </svg>
      );

    case 'ts':
    case 'typescript':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="TypeScript"><title>TypeScript</title>
          <rect width="32" height="32" rx="6" fill="#3178C6"/>
          <path d="M19 22.8c.6 1 1.6 1.6 2.8 1.6 1.2 0 2-.6 2-1.8 0-1.2-.8-1.8-2.2-2.4l-.8-.4c-2.2-.9-3.6-2-3.6-4.4 0-2.2 1.8-3.8 4.4-3.8 1.8 0 3.2.8 4 2.4l-2.4 1.6c-.4-.8-1-1.2-1.8-1.2-1 0-1.6.6-1.6 1.4 0 1 .6 1.4 2 2l.8.4c2.6 1.1 4 2.2 4 4.8 0 2.8-2.2 4.2-5 4.2-2.6 0-4.4-1.2-5.2-3l2.6-1.8zM9 14.6h3.4V27h3.2V14.6H19V12H9v2.6z" fill="#FFFFFF"/>
        </svg>
      );

    case 'react':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="React"><title>React</title>
          <ellipse cx="16" cy="16" rx="3.5" ry="3.5" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1.8" fill="none">
            <ellipse cx="16" cy="16" rx="13" ry="5"/>
            <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)"/>
            <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)"/>
          </g>
        </svg>
      );

    case 'python':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="Python"><title>Python</title>
          <path d="M15.8 3c-4.4 0-4.2 1.9-4.2 1.9l.01 2h4.3v.6H9.7s-2.8-.3-2.8 4.1 2.4 4.3 2.4 4.3h1.4v-2.1s-.1-2.4 2.4-2.4h4.1s2.3.05 2.3-2.3V5.4s.3-2.4-4.2-2.4zm-2.4 1.3c.5 0 .8.4.8.8s-.3.8-.8.8-.8-.4-.8-.8.4-.8.8-.8z" fill="#3776AB"/>
          <path d="M16.2 29c4.4 0 4.2-1.9 4.2-1.9l-.01-2h-4.3v-.6h6.2s2.8.3 2.8-4.1-2.4-4.3-2.4-4.3h-1.4v2.1s.1 2.4-2.4 2.4h-4.1s-2.3-.05-2.3 2.3v3.7s-.3 2.4 4.2 2.4zm2.4-1.3c-.5 0-.8-.4-.8-.8s.3-.8.8-.8.8.4.8.8-.4.8-.8.8z" fill="#FFD43B"/>
        </svg>
      );

    case 'fastapi':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="FastAPI"><title>FastAPI</title>
          <circle cx="16" cy="16" r="14" fill="#059669"/>
          <path d="M17.5 7L10 17.5h5.5L14 25l8-11h-5.5L17.5 7z" fill="#FFFFFF"/>
        </svg>
      );

    case 'flask':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="Flask"><title>Flask</title>
          <path d="M12 6h8v2h-2v4.5l5.5 11c.8 1.6-.3 3.5-2.1 3.5H10.6c-1.8 0-2.9-1.9-2.1-3.5L14 12.5V8h-2V6zm4 8.5l-4.5 9h9l-4.5-9z" fill="#F8FAFC"/>
        </svg>
      );

    case 'docker':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="Docker"><title>Docker</title>
          <path d="M29.5 15.2c-.4-.3-1.6-.4-2.5.1-.3.2-.6.5-.8.8-.6-.1-1.8-.2-3 .5-.1 0-.6-.4-1.4-.4-1.2 0-2.4.9-2.6 1.1-1.3-.8-3.1-.7-4.4.2-.3-.2-.8-.4-1.4-.4-1.1 0-2.2.8-2.6 1.4H2.4c-.4.5-.4 1.3 0 1.8 1.3 1.8 3.5 4.3 7.8 4.3 6.6 0 11.5-3.5 13.5-8.4 1.9.1 3.8-.4 4.8-1.5.3-.3.4-.6.5-1-.5.3-1.1.4-1.6.4M6 14.2h2.2v2.2H6zm2.8 0H11v2.2H8.8zm2.8 0h2.2v2.2h-2.2zm2.8 0h2.2v2.2h-2.2zm-5.6-2.8H11v2.2H8.8zm2.8 0h2.2v2.2h-2.2zm2.8 0h2.2v2.2h-2.2zm0-2.8h2.2v2.2h-2.2z" fill="#2496ED"/>
        </svg>
      );

    case 'postgresql':
    case 'postgres':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="PostgreSQL"><title>PostgreSQL</title>
          <path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4zm5.2 18.2c-.3.4-.7.7-1.2.9-.6.2-1.3.3-2 .3-1.3 0-2.4-.4-3.3-1.1-.9-.7-1.4-1.7-1.6-2.9-.2-1.2.1-2.4.7-3.4.6-1 1.5-1.7 2.6-2.1.8-.3 1.7-.4 2.5-.2.9.2 1.6.6 2.2 1.2l-1.4 1.4c-.4-.4-.9-.7-1.5-.8-.5-.1-1.1 0-1.6.2-.7.3-1.3.8-1.7 1.4-.4.7-.6 1.5-.5 2.3.1.8.5 1.5 1.1 2 .6.5 1.3.7 2.1.7.5 0 1-.1 1.4-.2.4-.1.7-.4.9-.6l1.2 1.3z" fill="#336791"/>
        </svg>
      );

    case 'tailwind':
    case 'tailwindcss':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="Tailwind CSS"><title>Tailwind CSS</title>
          <path d="M9.5 12.8c1.4-2.8 3.5-3.8 6.3-3 1.6.5 2.8 1.6 4 2.9 2 2 4.3 4.3 9.2 4.3 1.4 0 2.8-.4 4-1.2-1.4 2.8-3.5 3.8-6.3 3-1.6-.5-2.8-1.6-4-2.9-2-2-4.3-4.3-9.2-4.3-1.4 0-2.8.4-4 1.2zm-6.5 6.4c1.4-2.8 3.5-3.8 6.3-3 1.6.5 2.8 1.6 4 2.9 2 2 4.3 4.3 9.2 4.3 1.4 0 2.8-.4 4-1.2-1.4 2.8-3.5 3.8-6.3 3-1.6-.5-2.8-1.6-4-2.9-2-2-4.3-4.3-9.2-4.3-1.4 0-2.8.4-4 1.2z" fill="#38BDF8"/>
        </svg>
      );

    case 'git':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className} role="img" aria-label="Git"><title>Git</title>
          <path d="M28.4 14.1L17.9 3.6c-.8-.8-2.1-.8-2.9 0l-2.4 2.4 3.7 3.7c.9-.3 1.9-.1 2.6.6.7.7.9 1.7.6 2.6l3.5 3.5c.9-.3 1.9-.1 2.6.6 1 .1 1 2.6 0 3.6-1 1-2.6 1-3.6 0-.8-.8-.9-1.9-.5-2.8l-3.3-3.3v7.3c.3.2.5.5.7.8 1 1 1 2.6 0 3.6-1 1-2.6 1-3.6 0-1-1-1-2.6 0-3.6.3-.3.7-.6 1.1-.7v-7.4c-.4-.1-.8-.4-1.1-.7-.8-.8-.9-2-.4-2.9L9.6 11.4 3.6 17.4c-.8.8-.8 2.1 0 2.9l10.5 10.5c.8.8 2.1.8 2.9 0l11.4-11.4c.8-.8.8-2.1 0-2.9z" fill="#F05032"/>
        </svg>
      );

    default:
      return null;
  }
};

export default TechIcon;
