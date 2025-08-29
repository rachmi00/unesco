import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { StoryContainer } from '../StoryContainer'
import { StoryScene } from '../StoryScene'
import { StoryOutcome } from '../StoryOutcome'
import { StoryChoice } from '../StoryChoice'
import { BadgeDisplay } from '../BadgeDisplay'
import { aniseRayStory } from '../../data/anise-ray-story'
import { CYCLE_BREAKER_BADGE } from '../../data/story-badges'
import { StoryScene as StorySceneType } from '@/types/story'

// Mock Next.js Image component for consistent rendering
jest.mock('next/image', () => {
  return function MockImage({ 
    src, 
    alt, 
    fill, 
    priority, 
    className, 
    ...props 
  }: { 
    src: string; 
    alt: string; 
    fill?: boolean; 
    priority?: boolean; 
    className?: string; 
    [key: string]: unknown 
  }) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img 
        src={src} 
        alt={alt} 
        className={className}
        data-fill={fill} 
        data-priority={priority} 
        style={{ width: '100%', height: '100%' }}
        {...props} 
      />
    )
  }
})

// Mock Lucide React icons for consistent rendering
jest.mock('lucide-react', () => ({
  RotateCcw: ({ className }: { className?: string }) => <div data-testid="rotate-ccw-icon" className={className} />,
  Play: ({ className }: { className?: string }) => <div data-testid="play-icon" className={className} />,
  Loader2: ({ className }: { className?: string }) => <div data-testid="loader-icon" className={className} />,
  TrendingUp: ({ className }: { className?: string }) => <div data-testid="trending-up-icon" className={className} />,
  TrendingDown: ({ className }: { className?: string }) => <div data-testid="trending-down-icon" className={className} />,
  ShieldCheck: ({ className }: { className?: string }) => <div data-testid="shield-check-icon" className={className} />,
  AlertTriangle: ({ className }: { className?: string }) => <div data-testid="alert-triangle-icon" className={className} />
}))

// Mock IntersectionObserver for animation consistency
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Story Visual Regression Tests', () => {
  const mockBadges = {
    'Cycle Breaker Badge': CYCLE_BREAKER_BADGE
  }

  const mockOnComplete = jest.fn()
  const mockOnBadgeEarned = jest.fn()
  const mockOnChoiceSelect = jest.fn()
  const mockOnRestart = jest.fn()

  const mockScene: StorySceneType = {
    id: 'visual-test-scene',
    text: 'This is a visual regression test scene with consistent styling.',
    image: '/visual-test-image.png',
    choices: [
      { text: 'First visual choice option', nextScene: 'scene2' },
      { text: 'Second visual choice option', nextScene: 'scene3' }
    ],
    isEnding: false
  }

  const mockPositiveEndingScene: StorySceneType = {
    id: 'positive-ending',
    text: 'This is a positive ending for visual testing.',
    image: '/positive-ending.png',
    isEnding: true,
    outcomeType: 'positive',
    badge: 'Cycle Breaker Badge'
  }

  const mockNegativeEndingScene: StorySceneType = {
    id: 'negative-ending',
    text: 'This is a negative ending for visual testing.',
    image: '/negative-ending.png',
    isEnding: true,
    outcomeType: 'negative'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe('Component Structure Consistency', () => {
    it('renders StoryScene with consistent DOM structure', () => {
      const { container } = render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Check consistent container structure
      expect(container.firstChild).toHaveClass('relative', 'w-full', 'max-w-2xl', 'mx-auto')
      
      // Check for consistent semantic structure
      const region = container.querySelector('[role="region"]')
      expect(region).toBeInTheDocument()
      expect(region).toHaveAttribute('aria-label', 'Story scene: This is a visual regression test scene with consistent styling.')

      // Check image container structure
      const imageContainer = container.querySelector('[class*="aspect-"]')
      expect(imageContainer).toBeInTheDocument()
      expect(imageContainer).toHaveClass('aspect-[4/3]', 'sm:aspect-[16/10]')

      // Check choices container structure
      const choicesGroup = container.querySelector('[role="group"]')
      expect(choicesGroup).toBeInTheDocument()
      expect(choicesGroup).toHaveClass('space-y-3')
    })

    it('renders StoryChoice with consistent styling', () => {
      const choice = mockScene.choices![0]
      const { container } = render(
        <StoryChoice
          choice={choice}
          onSelect={mockOnChoiceSelect}
          disabled={false}
        />
      )

      const button = container.querySelector('button')
      expect(button).toHaveClass(
        'w-full',
        'p-4',
        'text-left',
        'bg-white',
        'border-2',
        'border-gray-200',
        'rounded-xl',
        'shadow-sm',
        'hover:border-indigo-300',
        'hover:shadow-md',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-indigo-500',
        'focus:border-indigo-500',
        'transition-all',
        'duration-200',
        'min-h-[44px]',
        'sm:min-h-[48px]',
        'touch-manipulation'
      )
    })

    it('renders StoryOutcome with consistent positive styling', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockPositiveEndingScene}
          badge={CYCLE_BREAKER_BADGE}
          onRestart={mockOnRestart}
        />
      )

      // Check positive outcome styling
      const outcomeContainer = container.querySelector('[class*="bg-green-50"]')
      expect(outcomeContainer).toBeInTheDocument()

      const outcomeHeader = container.querySelector('h3')
      expect(outcomeHeader).toHaveClass('text-xl', 'font-bold', 'text-green-800', 'mb-4')
      expect(outcomeHeader).toHaveTextContent('Cycle Broken Successfully')

      // Check badge display
      const badgeAlert = container.querySelector('[role="alert"]')
      expect(badgeAlert).toBeInTheDocument()
    })

    it('renders StoryOutcome with consistent negative styling', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockNegativeEndingScene}
          onRestart={mockOnRestart}
        />
      )

      // Check negative outcome styling
      const outcomeContainer = container.querySelector('[class*="bg-red-50"]')
      expect(outcomeContainer).toBeInTheDocument()

      const outcomeHeader = container.querySelector('h3')
      expect(outcomeHeader).toHaveClass('text-xl', 'font-bold', 'text-red-800', 'mb-4')
      expect(outcomeHeader).toHaveTextContent('The Cycle Continues')

      // Should not have badge display
      const badgeAlert = container.querySelector('[role="alert"]')
      expect(badgeAlert).not.toBeInTheDocument()
    })

    it('renders BadgeDisplay with consistent styling', () => {
      const { container } = render(
        <BadgeDisplay
          badge={CYCLE_BREAKER_BADGE}
          showAnimation={false}
        />
      )

      const badgeContainer = container.querySelector('[role="alert"]')
      expect(badgeContainer).toHaveClass(
        'bg-gradient-to-r',
        'from-green-500',
        'to-emerald-600',
        'text-white',
        'p-4',
        'rounded-xl',
        'shadow-lg',
        'mb-4'
      )

      const badgeTitle = container.querySelector('h4')
      expect(badgeTitle).toHaveClass('font-bold', 'text-lg', 'mb-2')
      expect(badgeTitle).toHaveTextContent('Badge Earned!')
    })
  })

  describe('Layout Consistency Across Viewports', () => {
    it('maintains consistent mobile layout', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true })
      Object.defineProperty(window, 'innerHeight', { value: 667, writable: true })

      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Check mobile-specific classes
      const storyContainer = container.querySelector('[class*="mx-2"]')
      expect(storyContainer).toBeInTheDocument()

      // Check responsive image aspect ratio
      const imageContainer = container.querySelector('[class*="aspect-[4/3]"]')
      expect(imageContainer).toBeInTheDocument()
    })

    it('maintains consistent tablet layout', () => {
      // Mock tablet viewport
      Object.defineProperty(window, 'innerWidth', { value: 768, writable: true })
      Object.defineProperty(window, 'innerHeight', { value: 1024, writable: true })

      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Check tablet-specific responsive classes
      const imageContainer = container.querySelector('[class*="sm:aspect-[16/10]"]')
      expect(imageContainer).toBeInTheDocument()
    })

    it('maintains consistent desktop layout', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })
      Object.defineProperty(window, 'innerHeight', { value: 768, writable: true })

      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Check desktop layout consistency
      const storyContainer = container.querySelector('[class*="max-w-2xl"]')
      expect(storyContainer).toBeInTheDocument()
    })
  })

  describe('Color Scheme Consistency', () => {
    it('uses consistent color palette for interactive elements', () => {
      const { container } = render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const buttons = container.querySelectorAll('button')
      buttons.forEach(button => {
        // Check consistent color scheme
        expect(button.className).toMatch(/border-gray-200/)
        expect(button.className).toMatch(/hover:border-indigo-300/)
        expect(button.className).toMatch(/focus:ring-indigo-500/)
        expect(button.className).toMatch(/focus:border-indigo-500/)
      })
    })

    it('uses consistent color palette for outcome states', () => {
      const { container: positiveContainer } = render(
        <StoryOutcome
          scene={mockPositiveEndingScene}
          badge={CYCLE_BREAKER_BADGE}
          onRestart={mockOnRestart}
        />
      )

      const { container: negativeContainer } = render(
        <StoryOutcome
          scene={mockNegativeEndingScene}
          onRestart={mockOnRestart}
        />
      )

      // Positive outcome colors
      expect(positiveContainer.querySelector('[class*="bg-green-50"]')).toBeInTheDocument()
      expect(positiveContainer.querySelector('[class*="text-green-800"]')).toBeInTheDocument()

      // Negative outcome colors
      expect(negativeContainer.querySelector('[class*="bg-red-50"]')).toBeInTheDocument()
      expect(negativeContainer.querySelector('[class*="text-red-800"]')).toBeInTheDocument()
    })

    it('maintains consistent badge color scheme', () => {
      const { container } = render(
        <BadgeDisplay
          badge={CYCLE_BREAKER_BADGE}
          showAnimation={false}
        />
      )

      const badgeContainer = container.querySelector('[role="alert"]')
      expect(badgeContainer).toHaveClass('from-green-500', 'to-emerald-600')
    })
  })

  describe('Typography Consistency', () => {
    it('uses consistent font sizes and weights', () => {
      const { container } = render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Scene text typography
      const sceneText = container.querySelector('p')
      expect(sceneText).toHaveClass('text-base', 'sm:text-lg', 'text-gray-900', 'leading-relaxed')

      // Choice button typography
      const buttons = container.querySelectorAll('button')
      buttons.forEach(button => {
        expect(button.className).toMatch(/text-sm|text-base/)
        expect(button.className).toMatch(/font-medium/)
      })
    })

    it('maintains consistent heading hierarchy', () => {
      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Main story title
      const h1 = container.querySelector('h1')
      expect(h1).toHaveClass('text-2xl', 'sm:text-3xl', 'font-bold', 'text-gray-900', 'mb-6')
      expect(h1).toHaveTextContent('Anise & Ray')
    })

    it('uses consistent text colors across components', () => {
      const { container } = render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Primary text should use gray-900
      const primaryText = container.querySelector('p')
      expect(primaryText).toHaveClass('text-gray-900')

      // Button text should use gray-900
      const buttons = container.querySelectorAll('button')
      buttons.forEach(button => {
        expect(button.className).toMatch(/text-gray-900/)
      })
    })
  })

  describe('Animation State Consistency', () => {
    it('applies consistent animation classes during scene transitions', () => {
      const { container, rerender } = render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={false}
        />
      )

      // Re-render with active state
      rerender(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Check for consistent animation classes
      const animatedElements = container.querySelectorAll('[class*="animate-in"]')
      expect(animatedElements.length).toBeGreaterThan(0)

      animatedElements.forEach(element => {
        expect(element.className).toMatch(/animate-in/)
        expect(element.className).toMatch(/slide-in-from-bottom-4/)
        expect(element.className).toMatch(/fade-in-0/)
        expect(element.className).toMatch(/duration-300/)
      })
    })

    it('maintains consistent loading state appearance', () => {
      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Trigger loading state
      fireEvent.click(screen.getByText('Continue listening'))

      const loadingState = container.querySelector('[data-testid="loading-state"]')
      expect(loadingState).toBeInTheDocument()
      expect(loadingState).toHaveClass('flex', 'items-center', 'justify-center', 'py-8')
    })

    it('shows consistent badge animation styling', () => {
      const { container } = render(
        <BadgeDisplay
          badge={CYCLE_BREAKER_BADGE}
          showAnimation={true}
        />
      )

      const badgeContainer = container.querySelector('[role="alert"]')
      expect(badgeContainer).toHaveClass('animate-in', 'zoom-in-95', 'duration-500')
    })
  })

  describe('Icon Consistency', () => {
    it('renders icons with consistent styling', () => {
      const { container } = render(
        <StoryOutcome
          scene={mockPositiveEndingScene}
          badge={CYCLE_BREAKER_BADGE}
          onRestart={mockOnRestart}
        />
      )

      // Check restart icon
      const restartIcon = container.querySelector('[data-testid="rotate-ccw-icon"]')
      expect(restartIcon).toBeInTheDocument()
      expect(restartIcon).toHaveClass('w-4', 'h-4')

      // Check outcome icon
      const outcomeIcon = container.querySelector('[data-testid="trending-up-icon"]')
      expect(outcomeIcon).toBeInTheDocument()
      expect(outcomeIcon).toHaveClass('w-5', 'h-5', 'text-green-600')
    })

    it('uses appropriate icons for different outcome types', () => {
      const { container: positiveContainer } = render(
        <StoryOutcome
          scene={mockPositiveEndingScene}
          badge={CYCLE_BREAKER_BADGE}
          onRestart={mockOnRestart}
        />
      )

      const { container: negativeContainer } = render(
        <StoryOutcome
          scene={mockNegativeEndingScene}
          onRestart={mockOnRestart}
        />
      )

      // Positive outcome should have trending up icon
      expect(positiveContainer.querySelector('[data-testid="trending-up-icon"]')).toBeInTheDocument()

      // Negative outcome should have trending down icon
      expect(negativeContainer.querySelector('[data-testid="trending-down-icon"]')).toBeInTheDocument()
    })

    it('renders badge icons consistently', () => {
      const { container } = render(
        <BadgeDisplay
          badge={CYCLE_BREAKER_BADGE}
          showAnimation={false}
        />
      )

      const badgeIcon = container.querySelector('[data-testid="shield-check-icon"]')
      expect(badgeIcon).toBeInTheDocument()
      expect(badgeIcon).toHaveClass('w-6', 'h-6', 'mr-2')
    })
  })

  describe('Complete Story Flow Visual Consistency', () => {
    it('maintains visual consistency throughout positive story path', async () => {
      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Initial scene
      expect(container.querySelector('[role="region"]')).toBeInTheDocument()

      // Navigate through story
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(container.querySelector('[role="region"]')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Watch the video'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(container.querySelector('[role="region"]')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      act(() => { jest.advanceTimersByTime(300) })

      // Final outcome should maintain consistent styling
      await waitFor(() => {
        expect(container.querySelector('[class*="bg-green-50"]')).toBeInTheDocument()
        expect(container.querySelector('[role="alert"]')).toBeInTheDocument() // Badge
      })
    })

    it('maintains visual consistency throughout negative story path', async () => {
      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Navigate through to negative ending
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Watch the video'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Screenshot and post revenge comment'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      // Final outcome should maintain consistent styling
      await waitFor(() => {
        expect(container.querySelector('[class*="bg-red-50"]')).toBeInTheDocument()
        expect(container.querySelector('[data-testid="trending-down-icon"]')).toBeInTheDocument()
      })
    })

    it('maintains consistent progress indicator styling', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Check initial progress
      const progressText = screen.getByText('0 / 2 choices made')
      expect(progressText).toHaveClass('text-sm', 'text-gray-600', 'mb-4')

      // Progress through story
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        const updatedProgress = screen.getByText('1 / 2 choices made')
        expect(updatedProgress).toHaveClass('text-sm', 'text-gray-600', 'mb-4')
      })
    })

    it('captures visual snapshots of key story moments for regression testing', async () => {
      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Snapshot 1: Initial scene
      expect(container.firstChild).toMatchSnapshot('story-initial-scene')

      // Navigate to scene 2
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText(/Hours later.*video/)).toBeInTheDocument()
      })

      // Snapshot 2: Discovery scene
      expect(container.firstChild).toMatchSnapshot('story-discovery-scene')

      // Navigate to decision point
      fireEvent.click(screen.getByText('Watch the video'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText(/A young man declares/)).toBeInTheDocument()
      })

      // Snapshot 3: Critical decision point
      expect(container.firstChild).toMatchSnapshot('story-decision-scene')

      // Choose positive path
      fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
      })

      // Snapshot 4: Positive outcome with badge
      expect(container.firstChild).toMatchSnapshot('story-positive-outcome')
    })

    it('captures visual snapshots of negative path for regression testing', async () => {
      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Navigate to decision point
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Watch the video'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Screenshot and post revenge comment'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText('The Cycle Continues')).toBeInTheDocument()
      })

      // Snapshot: Negative outcome
      expect(container.firstChild).toMatchSnapshot('story-negative-outcome')
    })

    it('validates consistent UI rendering across different screen sizes', async () => {
      const viewports = [
        { width: 375, height: 667, name: 'mobile' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1024, height: 768, name: 'desktop' }
      ]

      for (const viewport of viewports) {
        // Mock viewport
        Object.defineProperty(window, 'innerWidth', { value: viewport.width, writable: true })
        Object.defineProperty(window, 'innerHeight', { value: viewport.height, writable: true })

        const { container, unmount } = render(
          <StoryContainer
            storyData={aniseRayStory}
            badges={mockBadges}
            onComplete={mockOnComplete}
          />
        )

        // Check responsive classes are applied
        const storyContainer = container.querySelector('[class*="max-w-2xl"]')
        expect(storyContainer).toBeInTheDocument()

        // Check image aspect ratio classes
        const imageContainer = container.querySelector('[class*="aspect-"]')
        expect(imageContainer).toBeInTheDocument()

        // Snapshot for each viewport
        expect(container.firstChild).toMatchSnapshot(`story-${viewport.name}-viewport`)

        unmount()
      }
    })

    it('ensures consistent visual hierarchy and spacing', () => {
      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Check heading hierarchy
      const h1 = container.querySelector('h1')
      expect(h1).toHaveClass('text-2xl', 'sm:text-3xl', 'font-bold', 'text-gray-900', 'mb-6')

      // Check consistent spacing
      const progressText = container.querySelector('[class*="text-sm"]')
      expect(progressText).toHaveClass('mb-4')

      // Check button spacing
      const choicesContainer = container.querySelector('[role="group"]')
      expect(choicesContainer).toHaveClass('space-y-3')

      // Check image container spacing
      const imageContainer = container.querySelector('[class*="aspect-"]')
      expect(imageContainer?.parentElement).toHaveClass('mb-6')
    })
  })
})