import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { StoryContainer } from '../StoryContainer'
import { StoryScene } from '../StoryScene'
import { StoryOutcome } from '../StoryOutcome'
import { BadgeDisplay } from '../BadgeDisplay'
import { aniseRayStory } from '../../data/anise-ray-story'
import { CYCLE_BREAKER_BADGE } from '../../data/story-badges'
import { StoryScene as StorySceneType } from '@/types/story'

// Mock IntersectionObserver for animation tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Accessibility Integration Tests', () => {
  const mockOnChoiceSelect = jest.fn()
  const mockOnRestart = jest.fn()
  const mockOnComplete = jest.fn()

  const mockScene: StorySceneType = {
    id: 'test-scene',
    text: 'This is a test scene with choices for accessibility testing.',
    image: '/test-image.png',
    choices: [
      { text: 'First accessible choice', nextScene: 'scene2' },
      { text: 'Second accessible choice', nextScene: 'scene3' }
    ],
    isEnding: false
  }

  const mockEndingScene: StorySceneType = {
    id: 'ending-scene',
    text: 'This is the accessible ending scene.',
    image: '/ending-image.png',
    isEnding: true,
    outcomeType: 'positive',
    badge: 'Cycle Breaker Badge'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('WCAG Compliance', () => {
    it('has proper semantic HTML structure for StoryScene', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Check for proper semantic elements
      expect(screen.getByRole('region')).toBeInTheDocument()
      expect(screen.getByRole('group')).toBeInTheDocument()
      expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('has proper semantic HTML structure for StoryOutcome', () => {
      render(
        <StoryOutcome
          scene={mockEndingScene}
          badge={CYCLE_BREAKER_BADGE}
          onRestart={mockOnRestart}
        />
      )

      // Check for proper semantic elements
      expect(screen.getByRole('region')).toBeInTheDocument()
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('has proper semantic HTML structure for BadgeDisplay', () => {
      render(
        <BadgeDisplay
          badge={CYCLE_BREAKER_BADGE}
          showAnimation={false}
        />
      )

      // Check for proper semantic elements
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('has proper semantic HTML structure for complete StoryContainer', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={{ 'Cycle Breaker Badge': CYCLE_BREAKER_BADGE }}
          onComplete={mockOnComplete}
        />
      )

      // Wait for story to initialize
      await waitFor(() => {
        expect(screen.getByRole('region')).toBeInTheDocument()
      })

      // Check for proper landmarks
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('supports full keyboard navigation through story choices', async () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const buttons = screen.getAllByRole('button')
      
      // Tab to first button
      buttons[0].focus()
      expect(buttons[0]).toHaveFocus()

      // Navigate with Tab key
      fireEvent.keyDown(buttons[0], { key: 'Tab' })
      
      // Activate with Enter
      fireEvent.keyDown(buttons[0], { key: 'Enter' })
      expect(mockOnChoiceSelect).toHaveBeenCalledWith(mockScene.choices![0])

      // Activate with Space
      fireEvent.keyDown(buttons[1], { key: ' ' })
      expect(mockOnChoiceSelect).toHaveBeenCalledWith(mockScene.choices![1])
    })

    it('supports keyboard navigation for restart functionality', () => {
      render(
        <StoryOutcome
          scene={mockEndingScene}
          badge={CYCLE_BREAKER_BADGE}
          onRestart={mockOnRestart}
        />
      )

      const restartButton = screen.getByRole('button', { name: /restart the story from the beginning/i })
      
      restartButton.focus()
      expect(restartButton).toHaveFocus()

      // Test Enter key
      fireEvent.keyDown(restartButton, { key: 'Enter' })
      expect(mockOnRestart).toHaveBeenCalled()

      // Test Space key
      fireEvent.keyDown(restartButton, { key: ' ' })
      expect(mockOnRestart).toHaveBeenCalledTimes(2)
    })

    it('maintains logical tab order throughout the story', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={{ 'Cycle Breaker Badge': CYCLE_BREAKER_BADGE }}
          onComplete={mockOnComplete}
        />
      )

      await waitFor(() => {
        expect(screen.getByRole('region')).toBeInTheDocument()
      })

      // Check that focusable elements are in logical order
      const focusableElements = screen.getAllByRole('button')
      expect(focusableElements.length).toBeGreaterThan(0)

      // Each button should be focusable
      focusableElements.forEach(element => {
        expect(element).not.toHaveAttribute('tabindex', '-1')
      })
    })

    it('provides visible focus indicators', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.className).toMatch(/focus:ring-2/)
        expect(button.className).toMatch(/focus:ring-indigo-500/)
        expect(button.className).toMatch(/focus:outline-none/)
      })
    })
  })

  describe('Screen Reader Support', () => {
    it('provides proper semantic structure with landmarks', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={{ 'Cycle Breaker Badge': CYCLE_BREAKER_BADGE }}
          onComplete={mockOnComplete}
        />
      )

      await waitFor(() => {
        expect(screen.getByRole('main')).toBeInTheDocument()
      })

      // Check for proper landmarks
      expect(screen.getByRole('banner')).toBeInTheDocument() // header
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('region')).toBeInTheDocument() // story scene
    })

    it('announces scene transitions to screen readers', async () => {
      const { rerender } = render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={false}
        />
      )

      // Check for live region
      const liveRegion = document.querySelector('[aria-live="polite"]')
      expect(liveRegion).toBeInTheDocument()

      // Activate scene
      rerender(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Wait for announcement
      await waitFor(() => {
        expect(liveRegion).toHaveTextContent(expect.stringContaining('New scene:'))
      }, { timeout: 200 })
    })

    it('announces story completion to screen readers', () => {
      render(
        <StoryOutcome
          scene={mockEndingScene}
          badge={CYCLE_BREAKER_BADGE}
          onRestart={mockOnRestart}
        />
      )

      const assertiveLiveRegion = document.querySelector('[aria-live="assertive"]')
      expect(assertiveLiveRegion).toBeInTheDocument()
      expect(assertiveLiveRegion).toHaveTextContent(expect.stringContaining('Story completed'))
    })

    it('provides descriptive labels for all interactive elements', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const buttons = screen.getAllByRole('button')
      buttons.forEach((button, index) => {
        expect(button).toHaveAttribute('aria-label', expect.stringContaining(`Choice ${index + 1}:`))
      })
    })

    it('uses proper heading hierarchy', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={{ 'Cycle Breaker Badge': CYCLE_BREAKER_BADGE }}
          onComplete={mockOnComplete}
        />
      )

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      })

      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toHaveTextContent('Anise & Ray')
    })

    it('provides alternative text for all images', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt')
      expect(image.getAttribute('alt')).toContain('Scene illustration showing:')
    })
  })

  describe('Color and Contrast', () => {
    it('uses sufficient color contrast for text elements', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const sceneText = screen.getByText(mockScene.text)
      expect(sceneText.className).toMatch(/text-gray-900/)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.className).toMatch(/text-gray-900/)
      })
    })

    it('does not rely solely on color to convey information', () => {
      render(
        <StoryOutcome
          scene={mockEndingScene}
          badge={CYCLE_BREAKER_BADGE}
          onRestart={mockOnRestart}
        />
      )

      // Positive outcomes should have text indicators, not just color
      expect(screen.getByText(/positive/i)).toBeInTheDocument()
      
      // Badge should have text content
      expect(screen.getByText('Cycle Breaker Badge')).toBeInTheDocument()
    })

    it('maintains contrast in different outcome states', () => {
      const negativeScene: StorySceneType = {
        ...mockEndingScene,
        outcomeType: 'negative'
      }

      render(
        <StoryOutcome
          scene={negativeScene}
          onRestart={mockOnRestart}
        />
      )

      // Should have appropriate contrast for negative outcomes
      const sceneText = screen.getByText(negativeScene.text)
      expect(sceneText.className).toMatch(/text-red-800/)
    })
  })

  describe('Motion and Animation', () => {
    it('provides meaningful animations that enhance understanding', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Animations should be present but not essential for functionality
      const animatedElements = document.querySelectorAll('[class*="animate-in"]')
      expect(animatedElements.length).toBeGreaterThan(0)
    })

    it('ensures animations do not interfere with accessibility', () => {
      render(
        <BadgeDisplay
          badge={CYCLE_BREAKER_BADGE}
          showAnimation={true}
        />
      )

      // Component should remain accessible during animations
      const badgeContainer = screen.getByRole('alert')
      expect(badgeContainer).toBeInTheDocument()
      expect(badgeContainer).toHaveAttribute('aria-label')
    })

    it('provides static fallbacks for animated content', () => {
      render(
        <BadgeDisplay
          badge={CYCLE_BREAKER_BADGE}
          showAnimation={false}
        />
      )

      // Should work without animations
      expect(screen.getByText('Cycle Breaker Badge')).toBeInTheDocument()
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  describe('Error Handling and Robustness', () => {
    it('handles missing images gracefully with proper alt text', () => {
      const sceneWithBadImage = {
        ...mockScene,
        image: '/nonexistent-image.png'
      }

      render(
        <StoryScene
          scene={sceneWithBadImage}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt')
      
      // Simulate image error
      fireEvent.error(image)
      
      // Should still have accessible fallback
      expect(screen.getByText('Scene Illustration')).toBeInTheDocument()
    })

    it('maintains accessibility during error states', () => {
      const invalidStoryData = {}

      render(
        <StoryContainer
          storyData={invalidStoryData}
          badges={{ 'Cycle Breaker Badge': CYCLE_BREAKER_BADGE }}
          onComplete={mockOnComplete}
        />
      )

      // Error state should still be accessible
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    })

    it('provides meaningful error messages', () => {
      const invalidStoryData = {}

      render(
        <StoryContainer
          storyData={invalidStoryData}
          badges={{ 'Cycle Breaker Badge': CYCLE_BREAKER_BADGE }}
          onComplete={mockOnComplete}
        />
      )

      expect(screen.getByText(/story error/i)).toBeInTheDocument()
      expect(screen.getByText(/unable to load/i)).toBeInTheDocument()
    })
  })

  describe('Progressive Enhancement', () => {
    it('works without JavaScript for basic functionality', () => {
      // This test ensures the component structure is semantic HTML
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Should have proper HTML structure
      expect(screen.getByRole('region')).toBeInTheDocument()
      expect(screen.getByRole('group')).toBeInTheDocument()
      expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('enhances functionality progressively with JavaScript', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // JavaScript enhancements should be present
      const liveRegion = document.querySelector('[aria-live="polite"]')
      expect(liveRegion).toBeInTheDocument()

      // Animation classes should be applied
      const animatedElements = document.querySelectorAll('[class*="animate-in"]')
      expect(animatedElements.length).toBeGreaterThan(0)
    })
  })
})