/**
 * SRLogo image component
 * Renders the SR logo as an <img>, switching source by theme:
 * - Light mode: red logo (per user request)
 * - Dark mode: terracotta logo (for better contrast)
 */
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Props for SRLogoIcon image component
 * Extends standard <img> attributes to allow sizing via className.
 */
export interface SRLogoIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Manually force a variant, otherwise 'auto' uses current theme */
  variant?: 'auto' | 'light' | 'dark';
}

/**
 * getLogoSrc
 * Selects the correct logo source based on mode.
 */
function getLogoSrc(mode: 'light' | 'dark'): string {
  // Assets provided by the user
  const RED_SRC =
    'https://pub-cdn.sider.ai/u/U0AWH647XGE/web-coder/68867f69f2d3a0ac8dcde35e/resource/fd001206-74bd-44c0-8928-89d916a38d3f.png';
  const TERRACOTTA_SRC =
    'https://pub-cdn.sider.ai/u/U0AWH647XGE/web-coder/68867f69f2d3a0ac8dcde35e/resource/b291bf18-9c31-4ad2-abae-8a3ff979f432.png';

  return mode === 'light' ? RED_SRC : TERRACOTTA_SRC;
}

/**
 * SRLogoIcon
 * A theme-aware logo image used alongside prices on the Services page.
 * - Uses the red logo in light mode as requested.
 * - Falls back to a terracotta tone in dark mode for readability.
 */
const SRLogoIcon: React.FC<SRLogoIconProps> = ({ variant = 'auto', alt, className = 'h-5 w-5', ...imgProps }) => {
  const { theme } = useTheme();
  const mode: 'light' | 'dark' = variant === 'auto' ? theme : (variant as 'light' | 'dark');
  const src = getLogoSrc(mode);

  return (
    <img
      src={src}
      alt={alt ?? 'SR'}
      className={className}
      draggable={false}
      decoding="async"
      loading="lazy"
      {...imgProps}
    />
  );
};

export default SRLogoIcon;
