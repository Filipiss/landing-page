import React, { FC, ReactNode } from 'react';
import './buttonCta.css';

export interface ButtonCtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  isLoading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const ButtonCta: FC<ButtonCtaProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  isLoading = false,
  className = '',
  href,
  target,
  rel,
  ...props
}) => {
  const classes = `c-buttonCta c-buttonCta--${variant} c-buttonCta--${size} ${isLoading ? 'isLoading' : ''} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        onClick={onClick as any}
      >
        {icon && <span className="c-buttonCta__icon">{icon}</span>}
        <span className="c-buttonCta__text">{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="c-buttonCta__spinner" aria-hidden="true" />
      ) : (
        icon && <span className="c-buttonCta__icon">{icon}</span>
      )}
      <span className="c-buttonCta__text">{children}</span>
    </button>
  );
};

export default ButtonCta;
