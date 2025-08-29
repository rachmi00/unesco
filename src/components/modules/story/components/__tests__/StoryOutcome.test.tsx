import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { StoryOutcome } from '../StoryOutcome'
import { StoryScene } from '@/types/story'
import { BadgeInfo } from '@/types/scenarios'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ 
    src, 
    alt, 
    fill, 
    priority, 
    onError, 
    ...props 
  }: {
    src: string
    alt: string
    fill?: boolean
    priority?: boolean
    onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void
    [key: string]: unknown
  }) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img 
        src={src} 
        alt={alt} 
        data-fill={fill} 
        data-priority={priority} 
        onError={onError}
        {...props} 
      />
    )
  }
})

describe('StoryOutcome Component', () => {
  const mockPositiveScene: StoryScene = {
    id: 'cycle_breaker',
    text: 'You feel empowered by choosing dialogue over revenge. Ray appreciates your message and reflects on his words.',
    image: '/pixel-art/anise-proud.png',
    isEnding: true,
    outcomeType: 'positive',
    badge: 'Cycle Breaker Badge'
  }

  const mockNegativeScene: StoryScene = {
    id: 'retaliation',
    text: 'Your comment sparks a heated argument. Others join in with more stereotypes. The cycle continues.',
    image: '/pixel-art/comment-war.png',
    isEnding: true,
    outcomeType: 'negative'
  }

  const mockBadge: BadgeInfo = {
    name: 'Cycle Breaker Badge',
    icon: 'ShieldCheck',
    color: 'from-green-500 to-emerald-600'
  }

  const mockOnRestart = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering - Positive Outcomes', () => {
    it('renders positive outcome scene text correctly', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.getByText(mockPositiveScene.text)).toBeInTheDocument()
    })

    it('displays positive outcome indicator', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.getByText('Positive Outcome')).toBeInTheDocument()
    })

    it('renders badge when provided for positive outcome', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.getByText('Cycle Breaker Badge')).toBeInTheDocument()
      expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
    })

    it('displays positive educational messaging', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
      expect(screen.getByText(/choosing dialogue over retaliation/)).toBeInTheDocument()
    })

    it('applies positive styling classes', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('border-green-200/60')
    })
  })

  describe('Rendering - Negative Outcomes', () => {
    it('renders negative outcome scene text correctly', () => {
      render(
        <StoryOutcome
          scene={mockNegativeScene}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.getByText(mockNegativeScene.text)).toBeInTheDocument()
    })

    it('displays negative outcome indicator', () => {
      render(
        <StoryOutcome
          scene={mockNegativeScene}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.getByText('Negative Outcome')).toBeInTheDocument()
    })

    it('does not render badge for negative outcome', () => {
      render(
        <StoryOutcome
          scene={mockNegativeScene}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.queryByText('Badge Earned!')).not.toBeInTheDocument()
    })

    it('displays negative educational messaging', () => {
      render(
        <StoryOutcome
          scene={mockNegativeScene}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.getByText('The Cycle Continues')).toBeInTheDocument()
      expect(screen.getByText(/Retaliation often escalates conflicts/)).toBeInTheDocument()
    })

    it('applies negative styling classes', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockNegativeScene}
          onRestart={mockOnRestart}
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('border-red-200/60')
    })
  })

  describe('Badge Integration', () => {
    it('renders badge with correct styling for positive outcomes', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const badgeElement = screen.getByText('Cycle Breaker Badge')
      expect(badgeElement).toBeInTheDocument()
      expect(badgeElement.closest('[class*="bg-gradient-to-r"]')).toBeInTheDocument()
    })

    it('includes badge animation elements', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const animatedBadgeIcon = container.querySelector('[class*="animate-pulse"]')
      expect(animatedBadgeIcon).toBeInTheDocument()
    })

    it('does not render badge section when badge is not provided', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.queryByText('Badge Earned!')).not.toBeInTheDocument()
    })

    it('does not render badge for negative outcomes even if badge prop is provided', () => {
      render(
        <StoryOutcome
          scene={mockNegativeScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.queryByText('Badge Earned!')).not.toBeInTheDocument()
    })
  })

  describe('Educational Messaging', () => {
    it('displays appropriate educational content for positive outcomes', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
      expect(screen.getByText('Community Impact')).toBeInTheDocument()
      expect(screen.getByText(/empathy and direct communication/)).toBeInTheDocument()
    })

    it('displays appropriate educational content for negative outcomes', () => {
      render(
        <StoryOutcome
          scene={mockNegativeScene}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.getByText('The Cycle Continues')).toBeInTheDocument()
      expect(screen.getByText('Community Impact')).toBeInTheDocument()
      expect(screen.getByText(/Consider how different responses/)).toBeInTheDocument()
    })

    it('maintains non-preachy tone in messaging', () => {
      render(
        <StoryOutcome
          scene={mockNegativeScene}
          onRestart={mockOnRestart}
        />
      )

      // Check that messaging is educational but not judgmental
      const educationalText = screen.getByText(/Retaliation often escalates conflicts/)
      expect(educationalText).toBeInTheDocument()
      
      // Should not contain preachy language
      expect(screen.queryByText(/you should have/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/you must/i)).not.toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onRestart when restart button is clicked', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const restartButton = screen.getByText('Try Story Again')
      fireEvent.click(restartButton)

      expect(mockOnRestart).toHaveBeenCalledTimes(1)
    })

    it('renders restart button with proper styling', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const restartButton = screen.getByText('Try Story Again')
      expect(restartButton).toBeInTheDocument()
      expect(restartButton.closest('button')).toHaveClass('w-full')
    })

    it('includes restart icon in button', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const restartButton = screen.getByText('Try Story Again').closest('button')
      const icon = restartButton?.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Image Handling', () => {
    it('renders scene image with correct alt text', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', '/pixel-art/anise-proud.png')
      expect(image).toHaveAttribute('alt', expect.stringContaining('Outcome illustration'))
    })

    it('handles image loading errors gracefully', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const image = screen.getByRole('img')
      fireEvent.error(image)

      // Should still show fallback placeholder
      expect(screen.getByText('Outcome Illustration')).toBeInTheDocument()
    })

    it('shows appropriate fallback content when image fails to load', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const fallbackText = container.querySelector('[class*="text-center"] p')
      expect(fallbackText).toHaveTextContent('Outcome Illustration')
    })
  })

  describe('Responsive Design', () => {
    it('applies mobile-first responsive classes', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('mx-2', 'sm:mx-0', 'max-w-2xl')
    })

    it('uses responsive aspect ratios for images', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const imageContainer = container.querySelector('[class*="aspect-"]')
      expect(imageContainer).toHaveClass('aspect-[4/3]', 'sm:aspect-[16/10]')
    })

    it('applies responsive text sizing', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const sceneText = screen.getByText(mockPositiveScene.text)
      expect(sceneText).toHaveClass('text-base', 'sm:text-lg')
    })

    it('uses responsive padding and spacing', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const contentSection = container.querySelector('[class*="p-4"][class*="sm:p-6"]')
      expect(contentSection).toBeInTheDocument()
    })
  })

  describe('Animation and Visual Effects', () => {
    it('applies entrance animations', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('animate-in', 'slide-in-from-bottom-4', 'fade-in')
    })

    it('includes hover effects', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const card = container.firstChild as HTMLElement
      expect(card.className).toMatch(/group/)
    })

    it('applies outcome-specific accent colors', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const accentLine = container.querySelector('[class*="from-green-500"]')
      expect(accentLine).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('provides proper alt text for outcome images', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt', expect.stringContaining('Positive outcome illustration:'))
    })

    it('renders restart button as proper button element', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const restartButton = screen.getByRole('button', { name: /restart the story from the beginning/i })
      expect(restartButton.tagName).toBe('BUTTON')
    })

    it('maintains proper text contrast for readability', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const sceneText = screen.getByText(mockPositiveScene.text)
      expect(sceneText.className).toMatch(/text-green-800/)
    })

    it('provides proper ARIA labels and roles', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      // Check outcome region
      const outcomeRegion = screen.getByRole('region')
      expect(outcomeRegion).toHaveAttribute('aria-label', 'Story outcome: positive ending')

      // Check badge alert
      const badgeAlert = screen.getByRole('alert')
      expect(badgeAlert).toHaveAttribute('aria-label', expect.stringContaining('Congratulations! You earned the'))
    })

    it('announces outcome to screen readers', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      // Check for screen reader announcement element
      const announcement = document.querySelector('[aria-live="assertive"]')
      expect(announcement).toBeInTheDocument()
      expect(announcement).toHaveTextContent(expect.stringContaining('Story completed with positive outcome'))
    })

    it('supports keyboard navigation for restart button', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const restartButton = screen.getByRole('button', { name: /restart the story from the beginning/i })
      
      // Test Enter key
      fireEvent.keyDown(restartButton, { key: 'Enter' })
      expect(mockOnRestart).toHaveBeenCalled()

      // Test Space key
      fireEvent.keyDown(restartButton, { key: ' ' })
      expect(mockOnRestart).toHaveBeenCalledTimes(2)
    })

    it('has minimum touch target size for mobile', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const restartButton = screen.getByRole('button', { name: /restart the story from the beginning/i })
      expect(restartButton.className).toMatch(/min-h-\[44px\]/)
    })

    it('includes touch optimization classes', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      const restartButton = screen.getByRole('button', { name: /restart the story from the beginning/i })
      expect(restartButton.className).toMatch(/touch-manipulation/)
    })

    it('provides semantic structure with proper headings', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
      expect(screen.getByText('Community Impact')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles missing outcomeType gracefully', () => {
      const sceneWithoutOutcomeType: StoryScene = {
        ...mockPositiveScene,
        outcomeType: undefined
      }

      render(
        <StoryOutcome
          scene={sceneWithoutOutcomeType}
          onRestart={mockOnRestart}
        />
      )

      // Should default to negative styling
      expect(screen.getByText('Negative Outcome')).toBeInTheDocument()
    })

    it('handles very long scene text', () => {
      const longTextScene: StoryScene = {
        ...mockPositiveScene,
        text: 'This is a very long outcome text that should wrap properly on mobile devices and maintain readability across different screen sizes while providing comprehensive feedback about the user\'s choice and its implications for community building and hate speech prevention.'
      }

      render(
        <StoryOutcome
          scene={longTextScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.getByText(longTextScene.text)).toBeInTheDocument()
    })

    it('works without badge even for positive outcomes', () => {
      render(
        <StoryOutcome
          scene={mockPositiveScene}
          onRestart={mockOnRestart}
        />
      )

      expect(screen.getByText(mockPositiveScene.text)).toBeInTheDocument()
      expect(screen.queryByText('Badge Earned!')).not.toBeInTheDocument()
    })
  })

  describe('Custom Props', () => {
    it('applies custom className when provided', () => {
      const customClass = 'custom-story-outcome'
      const { container } = render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
          className={customClass}
        />
      )

      expect(container.firstChild).toHaveClass(customClass)
    })

    it('works without custom className', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockPositiveScene}
          badge={mockBadge}
          onRestart={mockOnRestart}
        />
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })
})