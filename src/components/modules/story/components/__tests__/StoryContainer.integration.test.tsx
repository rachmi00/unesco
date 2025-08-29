import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { StoryContainer } from '../StoryContainer'
import { aniseRayStory } from '../../data/anise-ray-story'
import { CYCLE_BREAKER_BADGE } from '../../data/story-badges'

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

describe('StoryContainer Integration Tests', () => {
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

  describe('Complete Story Flow - Cycle Breaker Path', () => {
    it('successfully completes the positive story path with badge award', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Verify starting scene
      expect(screen.getByText(/Ray casually mentions that women from your ethnic group/)).toBeInTheDocument()
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()

      // Scene 1 -> Scene 2
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText(/Hours later.*video/)).toBeInTheDocument()
        expect(screen.getByText('1 / 2 choices made')).toBeInTheDocument()
      })

      // Scene 2 -> Scene 3
      fireEvent.click(screen.getByText('Watch the video'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText(/A young man declares/)).toBeInTheDocument()
        expect(screen.getByText('2 / 2 choices made')).toBeInTheDocument()
      })

      // Scene 3 -> Positive Ending
      fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      act(() => { jest.advanceTimersByTime(300) })

      // Verify positive outcome
      await waitFor(() => {
        expect(screen.getByText(/You feel empowered by choosing dialogue/)).toBeInTheDocument()
        expect(screen.getByText('Cycle Breaker Badge')).toBeInTheDocument()
        expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
        expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
      })

      // Verify callbacks were called correctly
      expect(mockOnComplete).toHaveBeenCalledWith({
        type: 'positive',
        badge: 'Cycle Breaker Badge',
        message: expect.stringContaining('You feel empowered')
      })

      expect(mockOnBadgeEarned).toHaveBeenCalledWith(CYCLE_BREAKER_BADGE)
    })

    it('allows restarting from positive outcome', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Complete the positive path
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

      // Restart from outcome
      await waitFor(() => {
        fireEvent.click(screen.getByText('Try Story Again'))
      })

      // Should be back at the beginning
      expect(screen.getByText(/Ray casually mentions that women from your ethnic group/)).toBeInTheDocument()
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()
    })
  })

  describe('Complete Story Flow - Retaliation Path', () => {
    it('successfully completes the negative story path without badge', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
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

      // Verify negative outcome
      await waitFor(() => {
        expect(screen.getByText(/Your comment sparks a heated argument/)).toBeInTheDocument()
        expect(screen.getByText('The Cycle Continues')).toBeInTheDocument()
        expect(screen.queryByText('Badge Earned!')).not.toBeInTheDocument()
      })

      // Verify callbacks
      expect(mockOnComplete).toHaveBeenCalledWith({
        type: 'negative',
        badge: undefined,
        message: expect.stringContaining('Your comment sparks')
      })

      expect(mockOnBadgeEarned).not.toHaveBeenCalled()
    })

    it('allows restarting from negative outcome', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Complete the negative path
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

      // Restart from outcome
      await waitFor(() => {
        fireEvent.click(screen.getByText('Try Story Again'))
      })

      // Should be back at the beginning
      expect(screen.getByText(/Ray casually mentions that women from your ethnic group/)).toBeInTheDocument()
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()
    })
  })

  describe('Story Navigation and State Management', () => {
    it('maintains proper state throughout navigation', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Track progress through each scene
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()

      // First choice
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText('1 / 2 choices made')).toBeInTheDocument()
      })

      // Second choice
      fireEvent.click(screen.getByText('Watch the video'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText('2 / 2 choices made')).toBeInTheDocument()
      })

      // Final choice should complete the story
      fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.queryByText('choices made')).not.toBeInTheDocument()
      })
    })

    it('handles mid-story restart correctly', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Navigate to middle of story
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText('1 / 2 choices made')).toBeInTheDocument()
      })

      // Restart mid-story
      fireEvent.click(screen.getByText('Restart Story'))

      // Should reset to beginning
      expect(screen.getByText(/Ray casually mentions that women from your ethnic group/)).toBeInTheDocument()
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()
    })
  })

  describe('Educational Content Integration', () => {
    it('displays appropriate educational messaging for positive outcome', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Complete positive path
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

      // Check for educational content
      await waitFor(() => {
        expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
        expect(screen.getByText(/dialogue over retaliation/)).toBeInTheDocument()
        expect(screen.getByText('Community Impact')).toBeInTheDocument()
      })
    })

    it('displays appropriate educational messaging for negative outcome', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Complete negative path
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

      // Check for educational content
      await waitFor(() => {
        expect(screen.getByText('The Cycle Continues')).toBeInTheDocument()
        expect(screen.getByText(/Retaliation often escalates/)).toBeInTheDocument()
        expect(screen.getByText('Community Impact')).toBeInTheDocument()
      })
    })
  })

  describe('Performance and User Experience', () => {
    it('handles loading states smoothly during navigation', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const choiceButton = screen.getByText('Continue listening')
      fireEvent.click(choiceButton)

      // Should show loading state
      expect(screen.getByTestId('loading-state')).toBeInTheDocument()

      // Fast forward through loading
      act(() => { jest.advanceTimersByTime(300) })

      // Should show next scene
      await waitFor(() => {
        expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument()
        expect(screen.getByText(/Hours later, scrolling Facebook/)).toBeInTheDocument()
      })
    })

    it('prevents double-clicking during transitions', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
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

      // Should only advance once
      await waitFor(() => {
        expect(screen.getByText(/Hours later, scrolling Facebook/)).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility Integration', () => {
    it('maintains proper heading hierarchy', () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const mainHeading = screen.getByRole('heading', { level: 1 })
      expect(mainHeading).toHaveTextContent('Anise & Ray')
    })

    it('provides proper button roles and interactions', () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
      
      buttons.forEach(button => {
        expect(button).toBeEnabled()
      })
    })

    it('handles keyboard navigation properly', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const choiceButton = screen.getByText('Continue listening')
      
      // Focus and use keyboard
      choiceButton.focus()
      fireEvent.keyDown(choiceButton, { key: 'Enter' })

      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText(/Hours later.*video/)).toBeInTheDocument()
      })
    })
  })

  describe('Real Story Data Validation', () => {
    it('validates that all story scenes are properly connected', () => {
      // Check that all referenced scenes exist
      Object.values(aniseRayStory).forEach(scene => {
        if (scene.choices) {
          scene.choices.forEach(choice => {
            expect(aniseRayStory[choice.nextScene]).toBeDefined()
          })
        }
      })
    })

    it('validates story structure meets requirements', () => {
      // Should have exactly 5 scenes as per requirements
      expect(Object.keys(aniseRayStory)).toHaveLength(5)
      
      // Should have proper ending scenes
      const endingScenes = Object.values(aniseRayStory).filter(scene => scene.isEnding)
      expect(endingScenes).toHaveLength(2)
      
      // Should have one positive and one negative outcome
      const positiveEndings = endingScenes.filter(scene => scene.outcomeType === 'positive')
      const negativeEndings = endingScenes.filter(scene => scene.outcomeType === 'negative')
      
      expect(positiveEndings).toHaveLength(1)
      expect(negativeEndings).toHaveLength(1)
      
      // Positive ending should have badge
      expect(positiveEndings[0].badge).toBeDefined()
      expect(negativeEndings[0].badge).toBeUndefined()
    })

    it('validates text length requirements', () => {
      // Each scene should have concise text (mobile-optimized)
      Object.values(aniseRayStory).forEach(scene => {
        // Text should be reasonable length for mobile (not too long)
        expect(scene.text.length).toBeLessThan(200)
        expect(scene.text.length).toBeGreaterThan(10)
      })
    })
  })
})