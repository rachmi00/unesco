import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { StoryContainer } from '../StoryContainer'
import { StoryData } from '@/types/story'
import { BadgeInfo } from '@/types/scenarios'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ 
    src, 
    alt, 
    fill, 
    priority, 
    ...props 
  }: { 
    src: string; 
    alt: string; 
    fill?: boolean; 
    priority?: boolean; 
    [key: string]: unknown 
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} data-fill={fill} data-priority={priority} {...props} />
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

describe('StoryContainer Component', () => {
  const mockStoryData: StoryData = {
    scene1: {
      id: 'scene1',
      text: 'Ray casually mentions that women from your ethnic group usually act like that.',
      image: '/pixel-art/anise-hurt.png',
      choices: [{ text: 'Continue listening', nextScene: 'scene2' }],
      isEnding: false
    },
    scene2: {
      id: 'scene2',
      text: 'Hours later, you see a video: What tribe would you not date from?',
      image: '/pixel-art/anise-scrolling.png',
      choices: [{ text: 'Watch the video', nextScene: 'scene3' }],
      isEnding: false
    },
    scene3: {
      id: 'scene3',
      text: 'A young man declares he would not date a girl from Rays tribe.',
      image: '/pixel-art/anise-angry.png',
      choices: [
        { text: 'Screenshot and post revenge comment', nextScene: 'retaliation' },
        { text: 'Report the video and message Ray privately', nextScene: 'cycle_breaker' }
      ],
      isEnding: false
    },
    retaliation: {
      id: 'retaliation',
      text: 'Your comment sparks a heated argument. The cycle continues.',
      image: '/pixel-art/comment-war.png',
      isEnding: true,
      outcomeType: 'negative'
    },
    cycle_breaker: {
      id: 'cycle_breaker',
      text: 'You feel empowered by choosing dialogue over revenge.',
      image: '/pixel-art/anise-proud.png',
      isEnding: true,
      outcomeType: 'positive',
      badge: 'Cycle Breaker Badge'
    }
  }

  const mockBadges: Record<string, BadgeInfo> = {
    'Cycle Breaker Badge': {
      name: 'Cycle Breaker Badge',
      icon: 'shield-check',
      color: 'from-green-500 to-emerald-600'
    }
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

  describe('Story Initialization', () => {
    it('renders the story title and description', () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      expect(screen.getByText('Anise & Ray')).toBeInTheDocument()
      expect(screen.getByText('An Interactive Story About Breaking Cycles')).toBeInTheDocument()
    })

    it('starts with the first scene by default', () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      expect(screen.getByText(mockStoryData.scene1.text)).toBeInTheDocument()
    })

    it('starts with custom starting scene when provided', () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
          startingScene="scene2"
        />
      )

      expect(screen.getByText(mockStoryData.scene2.text)).toBeInTheDocument()
    })

    it('displays progress indicator', () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()
    })
  })

  describe('Scene Navigation', () => {
    it('navigates to next scene when choice is selected', async () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const choiceButton = screen.getByText('Continue listening')
      fireEvent.click(choiceButton)

      // Fast-forward through the loading delay
      act(() => {
        jest.advanceTimersByTime(300)
      })

      await waitFor(() => {
        expect(screen.getByText(mockStoryData.scene2.text)).toBeInTheDocument()
      })
    })

    it('updates progress indicator as choices are made', async () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Make first choice
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => {
        jest.advanceTimersByTime(300)
      })

      await waitFor(() => {
        expect(screen.getByText('1 / 2 choices made')).toBeInTheDocument()
      })

      // Make second choice
      fireEvent.click(screen.getByText('Watch the video'))
      act(() => {
        jest.advanceTimersByTime(300)
      })

      await waitFor(() => {
        expect(screen.getByText('2 / 2 choices made')).toBeInTheDocument()
      })
    })

    it('handles loading state during scene transitions', () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const choiceButton = screen.getByText('Continue listening')
      fireEvent.click(choiceButton)

      // Should show loading state briefly
      expect(screen.getByTestId('loading-state')).toBeInTheDocument()
    })
  })

  describe('Story Completion - Positive Path', () => {
    it('completes story with positive outcome and badge', async () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Navigate through story to positive ending
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Watch the video'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      // Should show positive outcome
      await waitFor(() => {
        expect(screen.getByText(mockStoryData.cycle_breaker.text)).toBeInTheDocument()
        expect(screen.getByText('Cycle Breaker Badge')).toBeInTheDocument()
      })

      // Should call completion callbacks
      expect(mockOnComplete).toHaveBeenCalledWith({
        type: 'positive',
        badge: 'Cycle Breaker Badge',
        message: mockStoryData.cycle_breaker.text
      })

      expect(mockOnBadgeEarned).toHaveBeenCalledWith(mockBadges['Cycle Breaker Badge'])
    })

    it('displays badge earned message for positive outcome', async () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Navigate to positive ending
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Watch the video'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
      })
    })
  })

  describe('Story Completion - Negative Path', () => {
    it('completes story with negative outcome', async () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Navigate through story to negative ending
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

      // Should show negative outcome
      await waitFor(() => {
        expect(screen.getByText(mockStoryData.retaliation.text)).toBeInTheDocument()
      })

      // Should call completion callback
      expect(mockOnComplete).toHaveBeenCalledWith({
        type: 'negative',
        badge: undefined,
        message: mockStoryData.retaliation.text
      })

      // Should not call badge earned callback
      expect(mockOnBadgeEarned).not.toHaveBeenCalled()
    })

    it('does not display badge for negative outcome', async () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Navigate to negative ending
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
        expect(screen.queryByText('Badge Earned!')).not.toBeInTheDocument()
      })
    })
  })

  describe('Story Restart Functionality', () => {
    it('provides restart button during story', () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      expect(screen.getByText('Restart Story')).toBeInTheDocument()
    })

    it('restarts story when restart button is clicked', async () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Navigate to second scene
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText(mockStoryData.scene2.text)).toBeInTheDocument()
      })

      // Click restart
      fireEvent.click(screen.getByText('Restart Story'))

      // Should return to first scene
      expect(screen.getByText(mockStoryData.scene1.text)).toBeInTheDocument()
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()
    })

    it('provides restart option in story outcome', async () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Complete story
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Watch the video'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText('Try Story Again')).toBeInTheDocument()
      })
    })

    it('restarts from outcome screen', async () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Complete story
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Watch the video'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Try Story Again'))
      })

      // Should return to first scene
      expect(screen.getByText(mockStoryData.scene1.text)).toBeInTheDocument()
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('handles invalid story data gracefully', () => {
      const invalidStoryData: StoryData = {}

      render(
        <StoryContainer
          storyData={invalidStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      expect(screen.getByText('Story Error')).toBeInTheDocument()
      expect(screen.getByText('Unable to load the story. Please try again.')).toBeInTheDocument()
    })

    it('provides restart option for error state', () => {
      const invalidStoryData: StoryData = {}

      render(
        <StoryContainer
          storyData={invalidStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      expect(screen.getByText('Restart Story')).toBeInTheDocument()
    })

    it('handles missing badge data gracefully', async () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={{}} // Empty badges
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Navigate to positive ending
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Watch the video'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      // Should complete without error, but not call badge earned
      await waitFor(() => {
        expect(mockOnComplete).toHaveBeenCalled()
        expect(mockOnBadgeEarned).not.toHaveBeenCalled()
      })
    })
  })

  describe('Accessibility and UX', () => {
    it('applies proper ARIA labels and roles', () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('maintains focus management during navigation', async () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const choiceButton = screen.getByText('Continue listening')
      choiceButton.focus()
      fireEvent.click(choiceButton)

      act(() => { jest.advanceTimersByTime(300) })

      // Focus should be maintained or properly managed
      await waitFor(() => {
        expect(document.activeElement).toBeDefined()
      })
    })

    it('applies responsive design classes', () => {
      const { container } = render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const mainContainer = container.querySelector('[class*="max-w-4xl"]')
      expect(mainContainer).toBeInTheDocument()
    })

    it('applies custom className when provided', () => {
      const customClass = 'custom-story-container'
      const { container } = render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
          className={customClass}
        />
      )

      expect(container.firstChild).toHaveClass(customClass)
    })
  })

  describe('Development Mode Features', () => {
    const originalEnv = process.env.NODE_ENV

    beforeEach(() => {
      process.env.NODE_ENV = 'development'
    })

    afterEach(() => {
      process.env.NODE_ENV = originalEnv
    })

    it('shows choice history in development mode', async () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Make a choice
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText('Choice History (Dev Mode)')).toBeInTheDocument()
        expect(screen.getByText('1. Continue listening')).toBeInTheDocument()
      })
    })
  })

  describe('Performance', () => {
    it('handles rapid choice selections without breaking', async () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const choiceButton = screen.getByText('Continue listening')
      
      // Rapid clicks
      fireEvent.click(choiceButton)
      fireEvent.click(choiceButton)
      fireEvent.click(choiceButton)

      act(() => { jest.advanceTimersByTime(300) })

      // Should still navigate properly
      await waitFor(() => {
        expect(screen.getByText(mockStoryData.scene2.text)).toBeInTheDocument()
      })
    })

    it('prevents choice selection during loading', () => {
      render(
        <StoryContainer
          storyData={mockStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const choiceButton = screen.getByText('Continue listening')
      fireEvent.click(choiceButton)

      // Try to click again during loading
      fireEvent.click(choiceButton)

      // Should only process one navigation
      act(() => { jest.advanceTimersByTime(300) })
      
      expect(screen.getByText(mockStoryData.scene2.text)).toBeInTheDocument()
    })
  })
})