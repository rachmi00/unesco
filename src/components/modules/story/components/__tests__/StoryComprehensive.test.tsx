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

describe('Comprehensive Story Test Suite', () => {
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

  describe('End-to-End Story Completion Tests', () => {
    it('completes full positive story path with badge award', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Initial scene validation
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Anise & Ray')
      expect(screen.getByText(/Ray casually mentions/)).toBeInTheDocument()
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()
      
      // Complete positive path
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText(/Hours later.*video/)).toBeInTheDocument()
        expect(screen.getByText('1 / 2 choices made')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Watch the video'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText(/A young man declares/)).toBeInTheDocument()
        expect(screen.getByText('2 / 2 choices made')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      act(() => { jest.advanceTimersByTime(300) })

      // Verify positive outcome
      await waitFor(() => {
        expect(screen.getByText(/You feel empowered/)).toBeInTheDocument()
        expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
        expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      // Verify callbacks
      expect(mockOnComplete).toHaveBeenCalledWith({
        type: 'positive',
        badge: 'Cycle Breaker Badge',
        message: expect.stringContaining('You feel empowered')
      })
      expect(mockOnBadgeEarned).toHaveBeenCalledWith(CYCLE_BREAKER_BADGE)
    })

    it('completes full negative story path with educational messaging', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
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

      // Verify negative outcome
      await waitFor(() => {
        expect(screen.getByText(/Your comment sparks/)).toBeInTheDocument()
        expect(screen.getByText('The Cycle Continues')).toBeInTheDocument()
        expect(screen.queryByText('Badge Earned!')).not.toBeInTheDocument()
      })

      // Verify educational content
      expect(screen.getByText(/Retaliation often escalates/)).toBeInTheDocument()
      expect(screen.getByText('Community Impact')).toBeInTheDocument()

      // Verify callback (no badge)
      expect(mockOnComplete).toHaveBeenCalledWith({
        type: 'negative',
        badge: undefined,
        message: expect.stringContaining('Your comment sparks')
      })
      expect(mockOnBadgeEarned).not.toHaveBeenCalled()
    })
  })

  describe('Performance Benchmarks', () => {
    it('completes story within performance budget', async () => {
      const startTime = performance.now()
      
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Complete story quickly
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(100) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Watch the video'))
      })
      act(() => { jest.advanceTimersByTime(100) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      })
      act(() => { jest.advanceTimersByTime(100) })

      await waitFor(() => {
        expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
      })

      const totalTime = performance.now() - startTime
      expect(totalTime).toBeLessThan(2000) // Should complete within 2 seconds
    })

    it('handles scene transitions efficiently', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const transitionStart = performance.now()
      
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText(/Hours later.*video/)).toBeInTheDocument()
      })

      const transitionTime = performance.now() - transitionStart
      expect(transitionTime).toBeLessThan(350) // Should transition within 350ms
    })
  })

  describe('Visual Consistency Tests', () => {
    it('maintains consistent styling throughout story flow', async () => {
      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Initial scene styling
      expect(container.querySelector('[role="region"]')).toBeInTheDocument()
      expect(container.querySelector('h1')).toHaveClass('text-2xl', 'sm:text-3xl', 'font-bold')

      // Navigate through story
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(container.querySelector('[role="region"]')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Watch the video'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      // Final outcome styling
      await waitFor(() => {
        expect(container.querySelector('[class*="bg-green-50"]')).toBeInTheDocument()
        expect(container.querySelector('[role="alert"]')).toBeInTheDocument()
      })
    })

    it('provides consistent mobile experience', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true })
      
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Verify mobile-optimized elements
      const choiceButton = screen.getByText('Continue listening')
      expect(choiceButton).toHaveClass('min-h-[44px]')
      expect(choiceButton).toHaveClass('touch-manipulation')
      
      const sceneText = screen.getByText(/Ray casually mentions/)
      expect(sceneText).toHaveClass('text-base', 'sm:text-lg')
    })
  })

  describe('User Experience Validation', () => {
    it('provides clear guidance throughout story journey', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Clear initial guidance
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()
      expect(screen.getByText('Continue listening')).toBeEnabled()

      // Progress tracking
      fireEvent.click(screen.getByText('Continue listening'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText('1 / 2 choices made')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Watch the video'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText('2 / 2 choices made')).toBeInTheDocument()
      })

      // Clear choice differentiation
      expect(screen.getByText('Screenshot and post revenge comment')).toBeInTheDocument()
      expect(screen.getByText('Report the video and message Ray privately')).toBeInTheDocument()

      fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      act(() => { jest.advanceTimersByTime(300) })

      // Clear outcome feedback
      await waitFor(() => {
        expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
        expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
        expect(screen.getByText('Try Story Again')).toBeInTheDocument()
      })
    })

    it('maintains accessibility throughout story flow', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Test keyboard navigation
      const firstChoice = screen.getByText('Continue listening')
      firstChoice.focus()
      expect(document.activeElement).toBe(firstChoice)
      
      fireEvent.keyDown(firstChoice, { key: 'Enter' })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText(/Hours later.*video/)).toBeInTheDocument()
      })

      // Continue with keyboard navigation
      const secondChoice = screen.getByText('Watch the video')
      secondChoice.focus()
      fireEvent.keyDown(secondChoice, { key: 'Enter' })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        const finalChoice = screen.getByText('Report the video and message Ray privately')
        finalChoice.focus()
        fireEvent.keyDown(finalChoice, { key: 'Enter' })
      })
      act(() => { jest.advanceTimersByTime(300) })

      // Verify accessible outcome
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument() // Badge announcement
      })
    })
  })

  describe('Requirements Validation', () => {
    it('validates story meets all specified requirements', () => {
      // Requirement 3.2: Exactly 4-5 key scenes total
      expect(Object.keys(aniseRayStory)).toHaveLength(5)
      
      // Requirement 2.3: Exactly two paths from core choice
      const scene3 = aniseRayStory['scene3']
      expect(scene3.choices).toHaveLength(2)
      
      // Requirement 2.4 & 2.5: One positive, one negative ending
      const endingScenes = Object.values(aniseRayStory).filter(scene => scene.isEnding)
      expect(endingScenes).toHaveLength(2)
      
      const positiveEndings = endingScenes.filter(scene => scene.outcomeType === 'positive')
      const negativeEndings = endingScenes.filter(scene => scene.outcomeType === 'negative')
      
      expect(positiveEndings).toHaveLength(1)
      expect(negativeEndings).toHaveLength(1)
      
      // Requirement 2.5: Positive ending awards badge
      expect(positiveEndings[0].badge).toBe('Cycle Breaker Badge')
      expect(negativeEndings[0].badge).toBeUndefined()
      
      // Requirement 3.1: Mobile-optimized text length
      Object.values(aniseRayStory).forEach(scene => {
        expect(scene.text.length).toBeLessThan(200) // Mobile-friendly
        expect(scene.text.length).toBeGreaterThan(10) // Meaningful content
      })
    })

    it('validates story data integrity', () => {
      // Ensure all nextScene references point to existing scenes
      Object.values(aniseRayStory).forEach(scene => {
        if (scene.choices) {
          scene.choices.forEach(choice => {
            expect(aniseRayStory[choice.nextScene]).toBeDefined()
          })
        }
      })
      
      // Ensure story has proper entry point
      expect(aniseRayStory['scene1']).toBeDefined()
      
      // Ensure ending scenes don't have choices
      Object.values(aniseRayStory).forEach(scene => {
        if (scene.isEnding) {
          expect(scene.choices).toBeUndefined()
        }
      })
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('handles missing badge data gracefully', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={{}} // Empty badges
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
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

      // Should handle missing badge gracefully
      await waitFor(() => {
        expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
        expect(screen.queryByText('Badge Earned!')).not.toBeInTheDocument()
      })
      
      expect(mockOnBadgeEarned).not.toHaveBeenCalled()
    })

    it('prevents double-clicking during transitions', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const firstChoice = screen.getByText('Continue listening')
      
      // Multiple rapid clicks
      fireEvent.click(firstChoice)
      fireEvent.click(firstChoice)
      fireEvent.click(firstChoice)
      
      act(() => { jest.advanceTimersByTime(300) })

      // Should only advance once
      await waitFor(() => {
        expect(screen.getByText(/Hours later.*video/)).toBeInTheDocument()
        expect(screen.getByText('1 / 2 choices made')).toBeInTheDocument()
      })
    })
  })
})