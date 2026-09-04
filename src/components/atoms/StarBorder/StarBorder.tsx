import React, { ReactNode } from 'react';
import './StarBorder.css';

export interface StarBorderProps {
    as?: React.ElementType;
    className?: string;
    innerClassName?: string;
    color?: string;
    speed?: string;
    thickness?: number;
    children?: ReactNode;
    style?: React.CSSProperties;
    onClick?: (e: any) => void;
}

export default function StarBorder({
    as: Component = 'div',
    className = '',
    innerClassName = '',
    color = 'var(--accent-primary, #2563eb)',
    speed = '6s',
    thickness = 1,
    children,
    style,
    ...rest
}: StarBorderProps) {
    const containerStyle = {
        padding: `${thickness}px`,
        '--star-color': color,
        '--star-speed': speed,
        ...style
    } as React.CSSProperties;

    return (
        <Component
            className={`star-border-container ${className}`.trim()}
            style={containerStyle}
            {...rest}
        >
            <div className="border-gradient-bottom"></div>
            <div className="border-gradient-top"></div>
            <div className={`star-border-inner ${innerClassName}`.trim()}>
                {children}
            </div>
        </Component>
    );
}
