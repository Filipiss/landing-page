import { CSSProperties, FC } from 'react';
import './AccessibilityIcon.css';

interface AccessibilityIconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Símbolo internacional de acesso (cadeirante na versão clássica, parada),
 * no mesmo traço dos ícones do lucide usados no resto do site.
 */
export const AccessibilityIcon: FC<AccessibilityIconProps> = ({ size = 24, className = '', style }) => {
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
      className={`c-accessibilityIcon ${className}`.trim()}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="10" cy="3.75" r="1.6" fill="currentColor" stroke="none" />
      <path d="M10 7v5.5h5l2.5 5.5h2" />
      <path d="M10 9.5h4" />
      <path d="M7 10.6a5.5 5.5 0 1 0 8.2 6.9" />
    </svg>
  );
};

export default AccessibilityIcon;
