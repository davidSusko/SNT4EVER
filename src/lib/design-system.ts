// Design system tokens for SNT4EVER website
// Based on the original design analysis

export const colors = {
  // Primary colors from original website
  background: '#000000', // Black background
  foreground: '#ffffff', // White text
  primary: '#FFEE00', // Yellow accent
  primaryForeground: '#000000', // Black text on yellow
  
  // Semantic colors
  muted: 'rgba(255, 255, 255, 0.6)',
  mutedForeground: 'rgba(255, 255, 255, 0.4)',
  border: 'rgba(255, 255, 255, 0.1)',
  ring: '#FFEE00',
  
  // Extended palette
  accent: '#FFEE00',
  accentForeground: '#000000',
  destructive: '#ef4444',
  destructiveForeground: '#ffffff',
  warning: '#f59e0b',
  success: '#22c55e',
}

export const typography = {
  // Font families (as used in original)
  fonts: {
    sans: "'Neue Haas Grotesk', 'Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Plex Mono', 'Fira Code', 'Courier New', monospace",
  },
  
  // Font sizes (in rem, matching original)
  sizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.4rem',   // 22.4px (original body copy)
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
    '9xl': '8rem',     // 128px
  },
  
  // Font weights
  weights: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Line heights
  lineHeights: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
}

export const spacing = {
  // Custom spacing values matching original design
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
  '5xl': '8rem',    // 128px
}

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export const animations = {
  // Animation durations
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  
  // Animation easing
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Preset animations
  marquee: 'scroll 20s linear infinite',
  fadeIn: 'fadeIn 0.5s ease-in-out',
  slideUp: 'slideUp 0.6s ease-out',
}

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // Custom shadows for specific elements
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  glow: '0 0 20px rgba(255, 238, 0, 0.3)',
}

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
}

// Component-specific design tokens
export const navigation = {
  height: '4rem', // 64px
  padding: '1rem 2rem',
  itemSpacing: '2rem',
  logoSize: '2.5rem',
}

export const hero = {
  padding: '8rem 0',
  titleSize: '4rem',
  subtitleSize: '1.5rem',
  descriptionSize: '1.25rem',
}

export const timeline = {
  sectionPadding: '6rem 0',
  yearSize: '3rem',
  titleSize: '2rem',
  contentSize: '1.125rem',
}

export const footer = {
  padding: '4rem 0',
  columnGap: '2rem',
  linkSize: '0.875rem',
}

// CSS custom properties for dynamic theming
export const cssVariables = {
  '--background': colors.background,
  '--foreground': colors.foreground,
  '--primary': colors.primary,
  '--primary-foreground': colors.primaryForeground,
  '--muted': colors.muted,
  '--muted-foreground': colors.mutedForeground,
  '--border': colors.border,
  '--ring': colors.ring,
  '--font-sans': typography.fonts.sans,
  '--font-mono': typography.fonts.mono,
}

export default {
  colors,
  typography,
  spacing,
  breakpoints,
  animations,
  shadows,
  borderRadius,
  navigation,
  hero,
  timeline,
  footer,
  cssVariables,
}