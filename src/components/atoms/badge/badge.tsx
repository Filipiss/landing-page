import React from 'react';
import './badge.css';

export type BadgeVariant =
  | 'bug'
  | 'feature'
  | 'improvement'
  | 'question'
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'
  | 'default';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
}) => {
  return (
    <span className={`c-badge c-badge--${variant} c-badge--${size} ${className}`}>
      {icon && <span className="c-badge__icon">{icon}</span>}
      <span className="c-badge__text">{children}</span>
    </span>
  );
};
