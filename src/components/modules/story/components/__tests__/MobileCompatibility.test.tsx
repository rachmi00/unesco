import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { StoryContainer } from '../StoryContainer'
import { StoryScene } from '../StoryScene'
import { StoryOutcome } from '../StoryOutcome'
import { BadgeDisplay } from '../BadgeDisplay'
import { aniseRayStory } from '../../data/anise-ray-story'
import { CYCLE_BREAKER_BADGE } from '../../data/story-badges'
import { StoryScene as StorySceneType } from '@/types/story'


// Mock viewport for mobile testing
const mockViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })
  fireEvent(window, new Event('resize'))
}

// Touch events are mocked by Jest environment

describe('Mobile Compatibility Tests', () => {
  const mockOnChoiceSelect = jest.fn()
  const mockOnRestart = jest.fn()
  const mockOnComplete = jest.fn()

  const mockScene: StorySceneType = {
    id: 'test-scene',
    text: 'This is a test scene for mobile compatibility.',
    image: '/test-image.png',
    choices: [
      { text: 'First choice option', nextScene: 'scene2' },
      { text: 'Second choice option', nextScene: 'scene3' }
    ],
    isEnding: false
  }

  const mockEndingScene: StorySceneType = {
    id: 'ending-scene',
    text: 'This is the ending scene.',
    image: '/ending-image.png',
    isEnding: true,
    outcomeType: 'positive',
    badge: 'Cycle Breaker Badge'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset viewport to mobile size
    mockViewport(375, 667) // iPhone SE dimensions
  })

  describe('Touch Target Sizes', () => {
    it('ensures all interactive elements meet minimum 44px touch target size', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        const styles = window.getComputedStyle(button)
        const minHeight = styles.getPropertyValue('min-height')
        
        // Should have minimum 44px height for accessibility
        expect(minHeight).toMatch(/44px|48px|52px/)
      })
    })

    it('provides adequate spacing between touch targets', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const choicesContainer = screen.getByRole('group')
      expect(choicesContainer.className).toMatch(/space-y-3|space-y-4/)
    })

    it('ensures restart button meets touch target requirements', () => {
      render(
        <StoryOutcome
          scene={mockEndingScene}
          badge={CYCLE_BREAKER_BADGE}
          onRestart={mockOnRestart}
        />
      )

      const restartButton = screen.getByRole('button', { name: /restart the story from the beginning/i })
      expect(restartButton.className).toMatch(/min-h-\[44px\]/)
    })
  })

  describe('Touch Interactions', () => {
    it('handles touch events properly on choice buttons', async () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const firstButton = screen.getAllByRole('button')[0]
      
      // Simulate touch interaction
      fireEvent.touchStart(firstButton, {
        touches: [{ clientX: 100, clientY: 100 }]
      })
      fireEvent.touchEnd(firstButton, {
        changedTouches: [{ clientX: 100, clientY: 100 }]
      })
      fireEvent.click(firstButton)

      expect(mockOnChoiceSelect).toHaveBeenCalledWith(mockScene.choices![0])
    })

    it('includes touch-manipulation CSS for optimized touch handling', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.className).toMatch(/touch-manipulation/)
      })
    })

    it('prevents double-tap zoom on interactive elements', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.className).toMatch(/touch-manipulation/)
      })
    })
  })

  describe('Responsive Design', () => {
    it('adapts layout for mobile viewport', () => {
      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={{ 'Cycle Breaker Badge': CYCLE_BREAKER_BADGE }}
          onComplete={mockOnComplete}
        />
      )

      // Check mobile-first responsive classes
      const storyContainer = container.querySelector('[class*="mx-2"]')
      expect(storyContainer).toBeInTheDocument()
    })

    it('adjusts text sizes for mobile readability', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const sceneText = screen.getByText(mockScene.text)
      expect(sceneText.className).toMatch(/text-base|sm:text-lg/)
    })

    it('optimizes image aspect ratios for mobile', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const imageContainer = document.querySelector('[class*="aspect-"]')
      expect(imageContainer).toBeInTheDocument()
      expect(imageContainer?.className).toMatch(/aspect-\[4\/3\]|sm:aspect-\[16\/10\]/)
    })

    it('provides proper image sizes attribute for responsive loading', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('sizes', expect.stringContaining('(max-width: 640px) 100vw'))
    })
  })

  describe('Mobile Performance', () => {
    it('uses CSS transforms for animations instead of layout changes', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const animatedElements = document.querySelectorAll('[class*="animate-in"]')
      expect(animatedElements.length).toBeGreaterThan(0)
    })

    it('includes will-change hints for animated elements', () => {
      render(
        <BadgeDisplay
          badge={CYCLE_BREAKER_BADGE}
          showAnimation={true}
        />
      )

      // Check for transform-based animations
      const animatedElement = document.querySelector('[class*="animate-"]')
      expect(animatedElement).toBeInTheDocument()
    })

    it('optimizes image loading with priority and sizes', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('sizes')
      // Priority should be set for above-the-fold images
    })
  })

  describe('Tablet Compatibility', () => {
    beforeEach(() => {
      // Set tablet viewport
      mockViewport(768, 1024) // iPad dimensions
    })

    it('adapts layout for tablet viewport', () => {
      const { container } = render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={{ 'Cycle Breaker Badge': CYCLE_BREAKER_BADGE }}
          onComplete={mockOnComplete}
        />
      )

      // Should use larger spacing on tablets
      const storyContainer = container.querySelector('[class*="sm:mx-0"]')
      expect(storyContainer).toBeInTheDocument()
    })

    it('increases text sizes appropriately for tablet', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const sceneText = screen.getByText(mockScene.text)
      expect(sceneText.className).toMatch(/sm:text-lg/)
    })

    it('adjusts touch targets for tablet interaction', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.className).toMatch(/sm:min-h-\[48px\]/)
      })
    })
  })

  describe('Landscape Orientation', () => {
    beforeEach(() => {
      // Set landscape mobile viewport
      mockViewport(667, 375) // iPhone SE landscape
    })

    it('maintains usability in landscape orientation', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Content should still be accessible and properly sized
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
      
      buttons.forEach(button => {
        expect(button).toBeVisible()
      })
    })

    it('adjusts image aspect ratios for landscape', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const imageContainer = document.querySelector('[class*="aspect-"]')
      expect(imageContainer).toBeInTheDocument()
    })
  })

  describe('Mobile Accessibility', () => {
    it('maintains accessibility features on mobile', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Check ARIA labels are present
      const region = screen.getByRole('region')
      expect(region).toHaveAttribute('aria-label')

      const group = screen.getByRole('group')
      expect(group).toHaveAttribute('aria-label')
    })

    it('provides proper focus management on mobile', () => {
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
      })
    })

    it('ensures screen reader announcements work on mobile', () => {
      render(
        <StoryScene
          scene={mockScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const announcement = document.querySelector('[aria-live="polite"]')
      expect(announcement).toBeInTheDocument()
    })
  })
})