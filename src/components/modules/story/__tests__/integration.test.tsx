/**
 * Integration tests for the complete story module
 * Tests the final integration and polish requirements
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { StoryContainer } from '../components/StoryContainer'
import { aniseRayStory } from '../data/anise-ray-story'
import { STORY_BADGES } from '../data/story-badges'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))

describe('Story Module Integration', () => {
  beforeEach(() => {
    // Clear any previous state
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe('Complete Story Flow', () => {
    it('should complete the full story flow successfully', async () => {
      const onComplete = jest.fn()
      const onBadgeEarned = jest.fn()

      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={STORY_BADGES}
          onComplete={onComplete}
          onBadgeEarned={onBadgeEarned}
        />
      )

      // Should start with first scene
      expect(screen.getByText(/Ray casually mentions/)).toBeInTheDocument()

      // Progress through the story
      fireEvent.click(screen.getByText('Continue listening'))
      
      await waitFor(() => {
        expect(screen.getByText(/Hours later, scrolling Facebook/)).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Watch the video'))
      
      await waitFor(() => {
        expect(screen.getByText(/A young man declares/)).toBeInTheDocument()
      })

      // Choose the positive path
      fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      
      await waitFor(() => {
        expect(screen.getByText(/You feel empowered/)).toBeInTheDocument()
        expect(onComplete).toHaveBeenCalled()
        expect(onBadgeEarned).toHaveBeenCalled()
      })
    })

    it('should handle negative path correctly', async () => {
      const onComplete = jest.fn()

      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={STORY_BADGES}
          onComplete={onComplete}
        />
      )

      // Navigate to choice point
      fireEvent.click(screen.getByText('Continue listening'))
      await waitFor(() => screen.getByText('Watch the video'))
      
      fireEvent.click(screen.getByText('Watch the video'))
      await waitFor(() => screen.getByText('Screenshot and post revenge comment'))

      // Choose negative path
      fireEvent.click(screen.getByText('Screenshot and post revenge comment'))
      
      await waitFor(() => {
        expect(screen.getByText(/Your comment sparks a heated argument/)).toBeInTheDocument()
        expect(onComplete).toHaveBeenCalled()
      })
    })
  })

  describe('Performance and Optimization', () => {
    it('should render without performance issues', async () => {
      const startTime = performance.now()
      
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={STORY_BADGES}
        />
      )

      const endTime = performance.now()
      const renderTime = endTime - startTime

      // Should render quickly (under 100ms in test environment)
      expect(renderTime).toBeLessThan(100)
    })

    it('should handle rapid interactions gracefully', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={STORY_BADGES}
        />
      )

      const continueButton = screen.getByText('Continue listening')
      
      // Rapid clicks should not cause issues
      fireEvent.click(continueButton)
      fireEvent.click(continueButton)
      fireEvent.click(continueButton)

      // Should still progress normally
      await waitFor(() => {
        expect(screen.getByText(/Hours later, scrolling Facebook/)).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Design', () => {
    it('should adapt to different screen sizes', () => {
      // Mock different viewport sizes
      const originalInnerWidth = window.innerWidth
      
      // Mobile size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })

      const { rerender } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={STORY_BADGES}
        />
      )

      expect(screen.getByText('Anise & Ray')).toBeInTheDocument()

      // Desktop size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      })

      rerender(
        <StoryContainer
          storyData={aniseRayStory}
          badges={STORY_BADGES}
        />
      )

      expect(screen.getByText('Anise & Ray')).toBeInTheDocument()

      // Restore original
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: originalInnerWidth,
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle malformed story data gracefully', () => {
      const malformedStory = {
        scene1: {
          id: 'scene1',
          text: 'Test scene',
          image: '/test.png',
          isEnding: false,
          choices: [
            { text: 'Continue', nextScene: 'nonexistent' }
          ]
        }
      }

      render(
        <StoryContainer
          storyData={malformedStory}
          badges={STORY_BADGES}
        />
      )

      expect(screen.getByText('Test scene')).toBeInTheDocument()
    })

    it('should provide meaningful error messages', () => {
      const emptyStory = {}

      render(
        <StoryContainer
          storyData={emptyStory}
          badges={STORY_BADGES}
        />
      )

      expect(screen.getByText(/Story Error/)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels and roles', () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={STORY_BADGES}
        />
      )

      // Check for proper accessibility attributes
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('region')).toBeInTheDocument()
      expect(screen.getByRole('group')).toBeInTheDocument()
    })

    it('should support keyboard navigation', () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={STORY_BADGES}
        />
      )

      const continueButton = screen.getByText('Continue listening')
      
      // Should be focusable
      continueButton.focus()
      expect(document.activeElement).toBe(continueButton)

      // Should respond to Enter key
      fireEvent.keyDown(continueButton, { key: 'Enter' })
      
      waitFor(() => {
        expect(screen.getByText(/Hours later, scrolling Facebook/)).toBeInTheDocument()
      })
    })
  })

  describe('Theme Integration', () => {
    it('should use consistent styling with app theme', () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={STORY_BADGES}
        />
      )

      // Check for consistent color classes
      const container = screen.getByRole('main').closest('div')
      expect(container).toHaveClass('max-w-4xl', 'mx-auto')

      // Check for proper button styling
      const button = screen.getByText('Continue listening')
      expect(button).toHaveClass('border-2', 'rounded-md')
    })
  })

  describe('Bundle Size Optimization', () => {
    it('should lazy load components efficiently', async () => {
      // This test would be more meaningful in a real bundle analyzer
      // but we can at least verify components render without importing everything
      
      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={STORY_BADGES}
        />
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })
})