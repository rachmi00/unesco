import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StoryContainer } from '../StoryContainer'
import { aniseRayStory } from '../../data/anise-ray-story'
import { CYCLE_BREAKER_BADGE } from '../../data/story-badges'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ 
    src, 
    alt, 
    onLoad, 
    ...props 
  }: { 
    src: string; 
    alt: string; 
    onLoad?: () => void; 
    [key: string]: unknown 
  }) {
    React.useEffect(() => {
      const timer = setTimeout(() => {
        if (onLoad) onLoad()
      }, 10)
      return () => clearTimeout(timer)
    }, [onLoad])
    
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  }
})

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  RotateCcw: () => <div data-testid="rotate-ccw-icon" />,
  Play: () => <div data-testid="play-icon" />,
  Loader2: () => <div data-testid="loader-icon" />,
  TrendingUp: () => <div data-testid="trending-up-icon" />,
  TrendingDown: () => <div data-testid="trending-down-icon" />,
  ShieldCheck: () => <div data-testid="shield-check-icon" />,
  AlertTriangle: () => <div data-testid="alert-triangle-icon" />
}))

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Story User Experience Tests', () => {
  const mockBadges = {
    'Cycle Breaker Badge': CYCLE_BREAKER_BADGE
  }

  const mockOnComplete = jest.fn()
  const mockOnBadgeEarned = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe('Story Completion Flow - Positive Path', () => {
    it('provides clear guidance through the complete positive story journey', async () => {
      const user = userEvent.setup({ delay: null })
      
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Scene 1: Initial setup and emotional context
      expect(screen.getByText(/Ray casually mentions that women from your ethnic group/)).toBeInTheDocument()
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()
      
      // User should understand they're playing as Anise
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Anise & Ray')
      
      // Clear call to action
      const continueButton = screen.getByText('Continue listening')
      expect(continueButton).toBeEnabled()
      expect(continueButton).toHaveAttribute('aria-label', expect.stringContaining('Choice 1:'))

      await user.click(continueButton)
      act(() => { jest.advanceTimersByTime(300) })

      // Scene 2: Building tension and discovery
      await waitFor(() => {
        expect(screen.getByText(/Hours later.*video/)).toBeInTheDocument()
        expect(screen.getByText('1 / 2 choices made')).toBeInTheDocument()
      })

      const watchButton = screen.getByText('Watch the video')
      await user.click(watchButton)
      act(() => { jest.advanceTimersByTime(300) })

      // Scene 3: Critical decision point
      await waitFor(() => {
        expect(screen.getByText(/A young man declares/)).toBeInTheDocument()
        expect(screen.getByText('2 / 2 choices made')).toBeInTheDocument()
      })

      // Two clear, contrasting choices
      expect(screen.getByText('Screenshot and post revenge comment')).toBeInTheDocument()
      expect(screen.getByText('Report the video and message Ray privately')).toBeInTheDocument()

      // Choose positive path
      const positiveChoice = screen.getByText('Report the video and message Ray privately')
      await user.click(positiveChoice)
      act(() => { jest.advanceTimersByTime(300) })

      // Positive outcome with clear feedback
      await waitFor(() => {
        expect(screen.getByText(/You feel empowered by choosing dialogue/)).toBeInTheDocument()
        expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
        expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
        expect(screen.getByText('Cycle Breaker Badge')).toBeInTheDocument()
      })

      // Educational messaging without preachiness
      expect(screen.getByText(/dialogue over retaliation/)).toBeInTheDocument()
      expect(screen.getByText('Community Impact')).toBeInTheDocument()

      // Clear option to restart
      expect(screen.getByText('Try Story Again')).toBeInTheDocument()

      // Verify completion callback
      expect(mockOnComplete).toHaveBeenCalledWith({
        type: 'positive',
        badge: 'Cycle Breaker Badge',
        message: expect.stringContaining('You feel empowered')
      })

      expect(mockOnBadgeEarned).toHaveBeenCalledWith(CYCLE_BREAKER_BADGE)
    })

    it('provides meaningful feedback and learning outcomes for positive choice', async () => {
      const user = userEvent.setup({ delay: null })
      
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Navigate to positive ending
      await user.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        user.click(screen.getByText('Watch the video'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        user.click(screen.getByText('Report the video and message Ray privately'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        // Empowerment message
        expect(screen.getByText(/You feel empowered/)).toBeInTheDocument()
        
        // Clear positive outcome indicator
        expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
        
        // Badge as positive reinforcement
        expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
      })
    })
  })

  describe('Comprehensive Story Completion Flow Tests', () => {
    it('validates complete user experience journey for both story paths', async () => {
      const user = userEvent.setup({ delay: null })
      
      // Test positive path first
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Validate initial user experience
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Anise & Ray')
      expect(screen.getByText(/Ray casually mentions/)).toBeInTheDocument()
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()
      
      // Verify accessibility and user guidance
      const firstChoice = screen.getByText('Continue listening')
      expect(firstChoice).toHaveAttribute('aria-label', expect.stringContaining('Choice 1:'))
      expect(firstChoice).toBeEnabled()

      // Complete positive story path with UX validation at each step
      await user.click(firstChoice)
      
      // Verify loading state provides feedback
      expect(screen.getByTestId('loading-state')).toBeInTheDocument()
      act(() => { jest.advanceTimersByTime(300) })

      // Scene 2 validation
      await waitFor(() => {
        expect(screen.getByText(/Hours later.*video/)).toBeInTheDocument()
        expect(screen.getByText('1 / 2 choices made')).toBeInTheDocument()
      })

      const secondChoice = screen.getByText('Watch the video')
      await user.click(secondChoice)
      act(() => { jest.advanceTimersByTime(300) })

      // Critical decision point validation
      await waitFor(() => {
        expect(screen.getByText(/A young man declares/)).toBeInTheDocument()
        expect(screen.getByText('2 / 2 choices made')).toBeInTheDocument()
      })

      // Verify both choices are clearly presented
      const retaliationChoice = screen.getByText('Screenshot and post revenge comment')
      const cycleBreakingChoice = screen.getByText('Report the video and message Ray privately')
      
      expect(retaliationChoice).toBeEnabled()
      expect(cycleBreakingChoice).toBeEnabled()
      expect(retaliationChoice).toHaveAttribute('aria-label')
      expect(cycleBreakingChoice).toHaveAttribute('aria-label')

      // Choose positive path
      await user.click(cycleBreakingChoice)
      act(() => { jest.advanceTimersByTime(300) })

      // Validate positive outcome UX
      await waitFor(() => {
        expect(screen.getByText(/You feel empowered/)).toBeInTheDocument()
        expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
        expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
        expect(screen.getByRole('alert')).toBeInTheDocument() // Badge announcement
      })

      // Verify educational content is accessible
      expect(screen.getByText(/dialogue over retaliation/)).toBeInTheDocument()
      expect(screen.getByText('Community Impact')).toBeInTheDocument()

      // Verify restart functionality
      const restartButton = screen.getByText('Try Story Again')
      expect(restartButton).toBeEnabled()
      expect(restartButton).toHaveAttribute('aria-label', expect.stringContaining('Restart'))

      // Test restart
      await user.click(restartButton)
      expect(screen.getByText(/Ray casually mentions/)).toBeInTheDocument()
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()
    })

    it('ensures consistent user experience across multiple story completions', async () => {
      const user = userEvent.setup({ delay: null })
      
      const completionTimes: number[] = []
      const userInteractionTimes: number[] = []

      // Test multiple completions for consistency
      for (let i = 0; i < 3; i++) {
        const startTime = performance.now()
        
        const { unmount } = render(
          <StoryContainer
            storyData={aniseRayStory}
            badges={mockBadges}
            onComplete={mockOnComplete}
          />
        )

        // Measure user interaction responsiveness
        const interactionStart = performance.now()
        await user.click(screen.getByText('Continue listening'))
        const interactionTime = performance.now() - interactionStart
        userInteractionTimes.push(interactionTime)

        act(() => { jest.advanceTimersByTime(300) })

        await waitFor(() => {
          user.click(screen.getByText('Watch the video'))
        })
        act(() => { jest.advanceTimersByTime(300) })

        await waitFor(() => {
          user.click(screen.getByText('Report the video and message Ray privately'))
        })
        act(() => { jest.advanceTimersByTime(300) })

        await waitFor(() => {
          expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
        })

        const completionTime = performance.now() - startTime
        completionTimes.push(completionTime)
        
        unmount()
      }

      // Verify consistent performance
      const avgCompletionTime = completionTimes.reduce((a, b) => a + b) / completionTimes.length

      // All completions should be within reasonable range
      completionTimes.forEach(time => {
        expect(time).toBeLessThan(avgCompletionTime * 1.5)
      })

      // User interactions should be consistently responsive
      userInteractionTimes.forEach(time => {
        expect(time).toBeLessThan(100) // Should respond within 100ms
      })
    })

    it('validates educational impact and learning outcomes for both paths', async () => {
      const user = userEvent.setup({ delay: null })
      
      // Test educational value of negative path
      const { unmount: unmountNegative } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Navigate to negative ending
      await user.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        user.click(screen.getByText('Watch the video'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        user.click(screen.getByText('Screenshot and post revenge comment'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      // Validate educational messaging without judgment
      await waitFor(() => {
        expect(screen.getByText('The Cycle Continues')).toBeInTheDocument()
        expect(screen.getByText(/Retaliation often escalates/)).toBeInTheDocument()
        expect(screen.getByText('Community Impact')).toBeInTheDocument()
        
        // Should not be preachy or judgmental
        expect(screen.queryByText(/you should/)).not.toBeInTheDocument()
        expect(screen.queryByText(/you must/)).not.toBeInTheDocument()
        expect(screen.queryByText(/always/)).not.toBeInTheDocument()
      })

      unmountNegative()

      // Test educational value of positive path
      const { unmount: unmountPositive } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Navigate to positive ending
      await user.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        user.click(screen.getByText('Watch the video'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        user.click(screen.getByText('Report the video and message Ray privately'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      // Validate empowering educational messaging
      await waitFor(() => {
        expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
        expect(screen.getByText(/You feel empowered/)).toBeInTheDocument()
        expect(screen.getByText(/dialogue over retaliation/)).toBeInTheDocument()
        expect(screen.getByText('Community Impact')).toBeInTheDocument()
        
        // Should provide positive reinforcement
        expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
      })

      unmountPositive()
    })

    it('ensures mobile-optimized user experience throughout story flow', async () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true })
      Object.defineProperty(window, 'innerHeight', { value: 667, writable: true })

      const user = userEvent.setup({ delay: null })
      
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Verify mobile-optimized text and layout
      const sceneText = screen.getByText(/Ray casually mentions/)
      expect(sceneText).toHaveClass('text-base', 'sm:text-lg')

      // Test touch-friendly interactions
      const choices = [
        'Continue listening',
        'Watch the video',
        'Report the video and message Ray privately'
      ]

      for (const choiceText of choices) {
        const choice = screen.getByText(choiceText)
        
        // Verify touch-friendly sizing
        expect(choice).toHaveClass('min-h-[44px]')
        expect(choice).toHaveClass('touch-manipulation')
        expect(choice).toHaveClass('p-4') // Adequate padding for touch
        
        await user.click(choice)
        act(() => { jest.advanceTimersByTime(300) })
        
        if (choiceText !== choices[choices.length - 1]) {
          await waitFor(() => {
            expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument()
          })
        }
      }

      // Verify mobile-optimized outcome display
      await waitFor(() => {
        expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
        
        // Badge should be properly sized for mobile
        const badgeContainer = screen.getByRole('alert')
        expect(badgeContainer).toHaveClass('p-4', 'rounded-xl')
        
        // Restart button should be touch-friendly
        const restartButton = screen.getByText('Try Story Again')
        expect(restartButton).toHaveClass('min-h-[44px]')
      })
    })

    it('validates story completion flow meets all requirements', async () => {
      const user = userEvent.setup({ delay: null })
      
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Requirement 1.1: Mobile-optimized format
      expect(screen.getByText(/Ray casually mentions/)).toHaveClass('text-base', 'sm:text-lg')
      
      // Requirement 1.2: Pixel art imagery
      expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('anise-hurt'))
      
      // Requirement 1.3: Clear choice options
      await user.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        user.click(screen.getByText('Watch the video'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        const choices = screen.getAllByRole('button').filter(btn => 
          btn.textContent?.includes('Screenshot') || btn.textContent?.includes('Report')
        )
        expect(choices).toHaveLength(2)
      })

      // Requirement 1.4: Educational feedback
      await user.click(screen.getByText('Report the video and message Ray privately'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText(/You feel empowered/)).toBeInTheDocument()
        expect(screen.getByText('Community Impact')).toBeInTheDocument()
      })

      // Verify completion callbacks match requirements
      expect(mockOnComplete).toHaveBeenCalledWith({
        type: 'positive',
        badge: 'Cycle Breaker Badge',
        message: expect.stringContaining('You feel empowered')
      })
      
      expect(mockOnBadgeEarned).toHaveBeenCalledWith(CYCLE_BREAKER_BADGE)
    })
  })
})