import { CSSProperties } from 'react';
import './LinkedinIcon.css';

interface LinkedinIconProps {
    size?: number;
    className?: string;
    style?: CSSProperties;
}

export default function LinkedinIcon({ size = 24, className, style }: LinkedinIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            style={style}
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}
