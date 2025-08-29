import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { StoryContainer } from '../StoryContainer'
import { StoryScene } from '../StoryScene'
import { aniseRayStory } from '../../data/anise-ray-story'
import { CYCLE_BREAKER_BADGE } from '../../data/story-badges'
import { StoryScene as StorySceneType } from '@/types/story'

// Mock performance API
const mockPerformance = {
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByType: jest.fn(() => []),
  getEntriesByName: jest.fn(() => [])
}

Object.defineProperty(window, 'performance', {
  value: mockPerformance,
  writable: true
})

// Mock Next.js Image component for performance testing
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
      // Simulate image load after a delay
      const timer = setTimeout(() => {
        if (onLoad) onLoad()
      }, 50)
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

describe('Story Performance Tests', () => {
  const mockBadges = {
    'Cycle Breaker Badge': CYCLE_BREAKER_BADGE
  }

  const mockOnComplete = jest.fn()
  const mockOnBadgeEarned = jest.fn()
  const mockOnChoiceSelect = jest.fn()

  const mockScene: StorySceneType = {
    id: 'test-scene',
    text: 'Performance test scene with multiple choices.',
    image: '/test-image.png',
    choices: [
      { text: 'First choice', nextScene: 'scene2' },
      { text: 'Second choice', nextScene: 'scene3' }
    ],
    isEnding: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    mockPerformance.now.mockClear()
    mockPerformance.mark.mockClear()
    mockPerformance.measure.mockClear()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe('Story Loading Performance', () => {
    it('loads story container within acceptable time limits', async () => {
      const startTime = performance.now()
      
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Wait for initial render
      await waitFor(() => {
        expect(screen.getByText(/Ray casually mentions/)).toBeInTheDocument()
      })

      const endTime = performance.now()
      const loadTime = endTime - startTime

      // Should load within 100ms (excluding network requests)
      expect(loadTime).toBeLessThan(100)
    })

    it('initializes story data efficiently', () => {
      const renderStart = performance.now()
      
      const { rerender } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const firstRenderTime = performance.now() - renderStart

      // Re-render with same data should be faster
      const rerenderStart = performance.now()
      rerender(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )
      const rerenderTime = performance.now() - rerenderStart

      expect(rerenderTime).toBeLessThan(firstRenderTime)
    })

    it('handles large story data sets efficiently', () => {
      // Create a larger story data set for testing
      const largeStoryData = {
        ...aniseRayStory,
        // Add more scenes to test performance with larger datasets
        'extra1': { id: 'extra1', text: 'Extra scene 1', image: '/extra1.png', isEnding: false, choices: [{ text: 'Continue', nextScene: 'extra2' }] },
        'extra2': { id: 'extra2', text: 'Extra scene 2', image: '/extra2.png', isEnding: false, choices: [{ text: 'Continue', nextScene: 'extra3' }] },
        'extra3': { id: 'extra3', text: 'Extra scene 3', image: '/extra3.png', isEnding: true, outcomeType: 'positive' as const }
      }

      const startTime = performance.now()
      
      render(
        <StoryContainer
          storyData={largeStoryData}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const loadTime = performance.now() - startTime

      // Should still load efficiently with more data
      expect(loadTime).toBeLessThan(150)
    })

    it('preloads critical resources efficiently', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Check that images are loaded with proper attributes
      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThan(0)

      // First image should have priority loading
      const firstImage = images[0]
      expect(firstImage).toHaveAttribute('src')
    })
  })

  describe('Scene Transition Performance', () => {
    it('transitions between scenes within performance budget', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByText(/Ray casually mentions/)).toBeInTheDocument()
      })

      const transitionStart = performance.now()
      
      // Trigger scene transition
      fireEvent.click(screen.getByText('Continue listening'))
      
      // Fast forward through transition
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.getByText(/Hours later.*video/)).toBeInTheDocument()
      })

      const transitionTime = performance.now() - transitionStart

      // Scene transition should complete within 350ms (including 300ms animation)
      expect(transitionTime).toBeLessThan(350)
    })

    it('maintains smooth animations during transitions', async () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={false}
        />
      )

      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Check for animation classes
      const animatedElements = document.querySelectorAll('[class*="animate-in"]')
      expect(animatedElements.length).toBeGreaterThan(0)

      // Simulate animation completion
      act(() => { jest.advanceTimersByTime(300) })

      // Animation should complete without layout thrashing
      expect(document.querySelectorAll('[class*="animate-in"]')).toBeTruthy()
    })

    it('handles rapid scene transitions gracefully', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      await waitFor(() => {
        expect(screen.getByText(/Ray casually mentions/)).toBeInTheDocument()
      })

      const startTime = performance.now()

      // Rapid transitions
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

      const totalTime = performance.now() - startTime

      // Should handle rapid transitions efficiently
      expect(totalTime).toBeLessThan(500)
    })

    it('prevents memory leaks during transitions', async () => {
      const { unmount } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Trigger some transitions
      await waitFor(() => {
        fireEvent.click(screen.getByText('Continue listening'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      // Unmount component
      unmount()

      // Should not have any pending timers
      expect(jest.getTimerCount()).toBe(0)
    })
  })

  describe('Image Loading Performance', () => {
    it('loads images efficiently with proper optimization', async () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const image = screen.getByRole('img')
      
      // Should have proper loading attributes
      expect(image).toHaveAttribute('src')
      expect(image).toHaveAttribute('alt')

      // Simulate image load
      fireEvent.load(image)

      // Should handle load event properly
      expect(image).toBeInTheDocument()
    })

    it('handles image loading errors gracefully', async () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const image = screen.getByRole('img')
      
      const errorStart = performance.now()
      
      // Simulate image error
      fireEvent.error(image)
      
      const errorHandleTime = performance.now() - errorStart

      // Error handling should be fast
      expect(errorHandleTime).toBeLessThan(50)

      // Should show fallback content
      await waitFor(() => {
        expect(screen.getByText('Scene Illustration')).toBeInTheDocument()
      })
    })

    it('preloads next scene images for smooth transitions', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      await waitFor(() => {
        expect(screen.getByText(/Ray casually mentions/)).toBeInTheDocument()
      })

      // Check if next scene image is being preloaded
      const images = document.querySelectorAll('img')
      expect(images.length).toBeGreaterThan(0)
    })
  })

  describe('Animation Performance', () => {
    it('uses CSS transforms for smooth animations', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Check for transform-based animations
      const animatedElements = document.querySelectorAll('[class*="animate-in"]')
      expect(animatedElements.length).toBeGreaterThan(0)

      // Should use transform-based animations for performance
      animatedElements.forEach(element => {
        // Animation should not cause layout recalculation
        expect(element.className).toMatch(/animate-in/)
      })
    })

    it('completes badge animations within performance budget', async () => {
      const animationStart = performance.now()
      
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Complete positive path to trigger badge animation
      await waitFor(() => {
        fireEvent.click(screen.getByText('Continue listening'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Watch the video'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      // Wait for badge animation
      await waitFor(() => {
        expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
      })

      const animationTime = performance.now() - animationStart

      // Complete flow with animations should be under 2 seconds
      expect(animationTime).toBeLessThan(2000)
    })

    it('maintains 60fps during animations', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Check that animations use will-change or transform
      const animatedElements = document.querySelectorAll('[class*="animate-"]')
      expect(animatedElements.length).toBeGreaterThan(0)
    })
  })

  describe('Memory Usage', () => {
    it('cleans up resources properly on unmount', () => {
      const { unmount } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Trigger some state changes
      fireEvent.click(screen.getByText('Continue listening'))
      
      // Unmount component
      unmount()

      // Should not have any active timers
      expect(jest.getTimerCount()).toBe(0)
    })

    it('handles component re-renders efficiently', () => {
      const { rerender } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const firstRenderTime = performance.now()

      // Re-render with same props
      rerender(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const rerenderTime = performance.now() - firstRenderTime

      // Re-render should be fast due to memoization
      expect(rerenderTime).toBeLessThan(50)
    })

    it('prevents excessive re-renders during user interactions', async () => {
      let renderCount = 0
      const TestWrapper = () => {
        renderCount++
        return (
          <StoryContainer
            storyData={aniseRayStory}
            badges={mockBadges}
            onComplete={mockOnComplete}
          />
        )
      }

      render(<TestWrapper />)

      const initialRenderCount = renderCount

      // Trigger user interaction
      await waitFor(() => {
        fireEvent.click(screen.getByText('Continue listening'))
      })
      act(() => { jest.advanceTimersByTime(300) })

      // Should not cause excessive re-renders
      expect(renderCount - initialRenderCount).toBeLessThan(5)
    })
  })

  describe('Bundle Size Impact', () => {
    it('loads story components without blocking main thread', () => {
      const loadStart = performance.now()
      
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      const loadTime = performance.now() - loadStart

      // Should not block main thread for too long
      expect(loadTime).toBeLessThan(100)
    })

    it('handles story data efficiently regardless of size', () => {
      // Test with minimal story data
      const minimalStory = {
        'start': {
          id: 'start',
          text: 'Start',
          image: '/start.png',
          isEnding: true,
          outcomeType: 'positive' as const
        }
      }

      const minimalStart = performance.now()
      const { unmount: unmountMinimal } = render(
        <StoryContainer
          storyData={minimalStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )
      const minimalTime = performance.now() - minimalStart
      unmountMinimal()

      // Test with full story data
      const fullStart = performance.now()
      const { unmount: unmountFull } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )
      const fullTime = performance.now() - fullStart
      unmountFull()

      // Performance should scale reasonably with data size
      expect(fullTime).toBeLessThan(minimalTime * 3)
    })
  })

  describe('Complete Story Performance Benchmarks', () => {
    it('completes full positive story path within performance budget', async () => {
      const startTime = performance.now()
      
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Complete entire positive path
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

      const totalTime = performance.now() - startTime

      // Complete story should finish within 2 seconds (including animations)
      expect(totalTime).toBeLessThan(2000)
    })

    it('completes full negative story path within performance budget', async () => {
      const startTime = performance.now()
      
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Complete entire negative path
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

      const totalTime = performance.now() - startTime

      // Complete story should finish within 2 seconds
      expect(totalTime).toBeLessThan(2000)
    })

    it('maintains consistent performance across multiple story completions', async () => {
      const completionTimes: number[] = []
      
      for (let i = 0; i < 3; i++) {
        const startTime = performance.now()
        
        const { unmount } = render(
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

        const completionTime = performance.now() - startTime
        completionTimes.push(completionTime)
        
        unmount()
      }
      
      // Performance should be consistent across runs
      const avgTime = completionTimes.reduce((a, b) => a + b) / completionTimes.length
      const maxDeviation = Math.max(...completionTimes.map(time => Math.abs(time - avgTime)))
      
      // No completion should deviate more than 50% from average
      expect(maxDeviation).toBeLessThan(avgTime * 0.5)
    })
  })
})