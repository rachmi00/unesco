/**
 * Theme integration utilities for consistent styling
 * Ensures story module follows the app's design system
 */

import { cn } from '@/lib/utils'

/**
 * Consistent color palette for story components
 */
export const storyTheme = {
  // Primary colors matching app theme
  primary: {
    50: 'bg-indigo-50',
    100: 'bg-indigo-100',
    500: 'bg-indigo-500',
    600: 'bg-indigo-600',
    900: 'text-indigo-900'
  },
  
  // Success colors for positive outcomes
  success: {
    50: 'bg-green-50',
    100: 'bg-green-100',
    500: 'bg-green-500',
    600: 'bg-green-600',
    900: 'text-green-900'
  },
  
  // Error colors for negative outcomes
  error: {
    50: 'bg-red-50',
    100: 'bg-red-100',
    500: 'bg-red-500',
    600: 'bg-red-600',
    900: 'text-red-900'
  },
  
  // Neutral colors
  neutral: {
    50: 'bg-gray-50',
    100: 'bg-gray-100',
    200: 'bg-gray-200',
    300: 'bg-gray-300',
    500: 'text-gray-500',
    600: 'text-gray-600',
    700: 'text-gray-700',
    800: 'text-gray-800',
    900: 'text-gray-900'
  }
} as const

/**
 * Consistent spacing following app design system
 */
export const storySpacing = {
  xs: 'gap-1 space-y-1',
  sm: 'gap-2 space-y-2',
  md: 'gap-4 space-y-4',
  lg: 'gap-6 space-y-6',
  xl: 'gap-8 space-y-8'
} as const

/**
 * Consistent border radius
 */
export const storyBorderRadius = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full'
} as const

/**
 * Consistent shadows
 */
export const storyShadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl'
} as const

/**
 * Animation classes consistent with app theme
 */
export const storyAnimations = {
  fadeIn: 'animate-in fade-in duration-300',
  slideUp: 'animate-in slide-in-from-bottom-4 fade-in duration-500',
  slideDown: 'animate-in slide-in-from-top-4 fade-in duration-500',
  slideLeft: 'animate-in slide-in-from-right-4 fade-in duration-500',
  slideRight: 'animate-in slide-in-from-left-4 fade-in duration-500',
  scaleIn: 'animate-in zoom-in-95 fade-in duration-300',
  bounce: 'animate-bounce'
} as const

/**
 * Responsive breakpoint utilities
 */
export const storyBreakpoints = {
  mobile: 'sm:',
  tablet: 'md:',
  desktop: 'lg:',
  wide: 'xl:'
} as const

/**
 * Story-specific component styles
 */
export const storyComponentStyles = {
  // Story container
  container: cn(
    'w-full max-w-4xl mx-auto space-y-6',
    'px-4 sm:px-6 lg:px-8'
  ),
  
  // Story header
  header: cn(
    'text-center space-y-2'
  ),
  
  // Story title
  title: cn(
    'text-2xl sm:text-3xl font-bold',
    storyTheme.neutral[900]
  ),
  
  // Story subtitle
  subtitle: cn(
    'text-sm',
    storyTheme.neutral[600]
  ),
  
  // Progress indicator
  progress: cn(
    'flex items-center justify-center gap-2 mt-4'
  ),
  
  // Progress dot
  progressDot: (isActive: boolean) => cn(
    'w-2 h-2 rounded-full transition-colors duration-300',
    isActive ? storyTheme.primary[500] : storyTheme.neutral[300]
  ),
  
  // Scene card
  sceneCard: cn(
    'text-card-foreground flex flex-col gap-6 rounded-xl py-6',
    'group relative overflow-hidden transition-all ease-out',
    'border border-gray-200/60',
    'bg-gradient-to-br from-white via-white to-gray-50/30',
    'shadow-lg hover:shadow-xl',
    'mx-2 sm:mx-0 max-w-2xl',
    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
  ),
  
  // Choice button
  choiceButton: cn(
    'w-full h-auto p-4 text-left justify-start transition-all',
    'border-2 border-gray-200 hover:border-indigo-300',
    'bg-white hover:bg-indigo-50',
    'text-gray-900 hover:text-indigo-900',
    'shadow-sm hover:shadow-md',
    'min-h-[44px] sm:min-h-[48px]',
    'focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none',
    'touch-manipulation'
  ),
  
  // Badge display
  badge: (color: string) => cn(
    'inline-flex items-center gap-2 px-4 py-2 rounded-full',
    'font-semibold text-sm',
    'shadow-lg',
    `bg-gradient-to-r ${color}`,
    'text-white'
  ),
  
  // Error state
  errorCard: cn(
    'max-w-2xl mx-auto border-red-200 bg-red-50'
  ),
  
  // Loading state
  loadingSpinner: cn(
    'w-5 h-5 animate-spin text-indigo-600'
  )
} as const

/**
 * Utility function to get theme-consistent button styles
 */
export const getButtonVariant = (variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary') => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variants = {
    primary: cn(baseStyles, 'bg-indigo-600 text-white hover:bg-indigo-700'),
    secondary: cn(baseStyles, 'bg-gray-100 text-gray-900 hover:bg-gray-200'),
    outline: cn(baseStyles, 'border border-gray-300 bg-white hover:bg-gray-50'),
    ghost: cn(baseStyles, 'hover:bg-gray-100 hover:text-gray-900')
  }
  
  return variants[variant]
}

/**
 * Utility function to get consistent card styles
 */
export const getCardVariant = (variant: 'default' | 'elevated' | 'outlined' = 'default') => {
  const baseStyles = 'rounded-lg bg-white'
  
  const variants = {
    default: cn(baseStyles, 'border shadow-sm'),
    elevated: cn(baseStyles, 'shadow-lg'),
    outlined: cn(baseStyles, 'border-2')
  }
  
  return variants[variant]
}

/**
 * Mobile-first responsive utilities
 */
export const responsiveStyles = {
  // Text sizes
  textSizes: {
    xs: 'text-xs sm:text-sm',
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl'
  },
  
  // Spacing
  spacing: {
    xs: 'p-2 sm:p-3',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-12'
  },
  
  // Grid layouts
  grid: {
    cols1: 'grid-cols-1',
    cols2: 'grid-cols-1 sm:grid-cols-2',
    cols3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    cols4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }
}