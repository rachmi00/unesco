import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { StoryScene } from '../StoryScene'
import { StoryScene as StorySceneType, StoryChoice } from '@/types/story'

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

describe('StoryScene Component', () => {
  const mockChoice1: StoryChoice = {
    text: 'Continue listening',
    nextScene: 'scene2'
  }

  const mockChoice2: StoryChoice = {
    text: 'Walk away',
    nextScene: 'scene3'
  }

  const mockSceneWithChoices: StorySceneType = {
    id: 'scene1',
    text: 'Ray casually mentions that women from your ethnic group usually act like that with a dismissive shrug.',
    image: '/pixel-art/anise-hurt.png',
    choices: [mockChoice1, mockChoice2],
    isEnding: false
  }

  const mockEndingScene: StorySceneType = {
    id: 'ending',
    text: 'Your comment sparks a heated argument. Others join in with more stereotypes.',
    image: '/pixel-art/comment-war.png',
    isEnding: true,
    outcomeType: 'negative'
  }

  const mockOnChoiceSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders scene text correctly', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      expect(screen.getByText(mockSceneWithChoices.text)).toBeInTheDocument()
    })

    it('renders scene image with correct alt text', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', '/pixel-art/anise-hurt.png')
      expect(image).toHaveAttribute('alt', expect.stringContaining('Scene illustration'))
    })

    it('renders all choice buttons when choices are provided', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      expect(screen.getByText('Continue listening')).toBeInTheDocument()
      expect(screen.getByText('Walk away')).toBeInTheDocument()
    })

    it('does not render choice buttons for ending scenes', () => {
      render(
        <StoryScene
          scene={mockEndingScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('renders choice indicators with correct numbers', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('calls onChoiceSelect when a choice button is clicked', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const firstChoiceButton = screen.getByText('Continue listening').closest('button')
      fireEvent.click(firstChoiceButton!)

      expect(mockOnChoiceSelect).toHaveBeenCalledWith(mockChoice1)
    })

    it('calls onChoiceSelect with correct choice data for second choice', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const secondChoiceButton = screen.getByText('Walk away').closest('button')
      fireEvent.click(secondChoiceButton!)

      expect(mockOnChoiceSelect).toHaveBeenCalledWith(mockChoice2)
    })

    it('handles multiple rapid clicks gracefully', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const firstChoiceButton = screen.getByText('Continue listening').closest('button')
      fireEvent.click(firstChoiceButton!)
      fireEvent.click(firstChoiceButton!)
      fireEvent.click(firstChoiceButton!)

      expect(mockOnChoiceSelect).toHaveBeenCalledTimes(3)
    })
  })

  describe('Responsive Behavior', () => {
    it('applies mobile-first responsive classes', () => {
      const { container } = render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const card = container.querySelector('[class*="mx-2"]')
      expect(card).toBeInTheDocument()
    })

    it('renders with proper aspect ratio classes for images', () => {
      const { container } = render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const imageContainer = container.querySelector('[class*="aspect-"]')
      expect(imageContainer).toBeInTheDocument()
    })

    it('applies touch-friendly button sizing', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.className).toMatch(/min-h-/)
      })
    })
  })

  describe('Animation States', () => {
    it('applies active animation classes when isActive is true', () => {
      const { container } = render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const card = container.querySelector('[class*="animate-in"]')
      expect(card).toBeInTheDocument()
    })

    it('applies opacity-0 when isActive is false', () => {
      const { container } = render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={false}
        />
      )

      const card = container.querySelector('[class*="opacity-0"]')
      expect(card).toBeInTheDocument()
    })

    it('applies staggered animation delays to choice buttons', () => {
      const { container } = render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const buttons = container.querySelectorAll('button')
      expect(buttons).toHaveLength(2)
      // Animation classes should be applied
      buttons.forEach(button => {
        expect(button.className).toMatch(/animate-in/)
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles scene with no choices gracefully', () => {
      const sceneWithoutChoices: StorySceneType = {
        ...mockSceneWithChoices,
        choices: undefined
      }

      render(
        <StoryScene
          scene={sceneWithoutChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      expect(screen.getByText(sceneWithoutChoices.text)).toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('handles scene with empty choices array', () => {
      const sceneWithEmptyChoices: StorySceneType = {
        ...mockSceneWithChoices,
        choices: []
      }

      render(
        <StoryScene
          scene={sceneWithEmptyChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      expect(screen.getByText(sceneWithEmptyChoices.text)).toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('handles very long scene text', () => {
      const longTextScene: StorySceneType = {
        ...mockSceneWithChoices,
        text: 'This is a very long scene text that should wrap properly on mobile devices and maintain readability across different screen sizes while staying within the 1-2 sentence limit as specified in the requirements.'
      }

      render(
        <StoryScene
          scene={longTextScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      expect(screen.getByText(longTextScene.text)).toBeInTheDocument()
    })

    it('handles very long choice text', () => {
      const longChoiceScene: StorySceneType = {
        ...mockSceneWithChoices,
        choices: [{
          text: 'This is a very long choice text that should wrap properly and remain clickable',
          nextScene: 'scene2'
        }]
      }

      render(
        <StoryScene
          scene={longChoiceScene}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const choiceButton = screen.getByText(longChoiceScene.choices![0].text)
      expect(choiceButton).toBeInTheDocument()
      
      fireEvent.click(choiceButton.closest('button')!)
      expect(mockOnChoiceSelect).toHaveBeenCalledWith(longChoiceScene.choices![0])
    })
  })

  describe('Accessibility', () => {
    it('provides proper alt text for images', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt', expect.stringContaining('Scene illustration showing:'))
    })

    it('renders choice buttons as proper button elements', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
      buttons.forEach(button => {
        expect(button.tagName).toBe('BUTTON')
      })
    })

    it('maintains proper text contrast and readability', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const sceneText = screen.getByText(mockSceneWithChoices.text)
      expect(sceneText.className).toMatch(/text-gray-900/)
    })

    it('provides proper ARIA labels and roles', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Check scene region
      const sceneRegion = screen.getByRole('region')
      expect(sceneRegion).toHaveAttribute('aria-label', expect.stringContaining('Story scene:'))

      // Check choices group
      const choicesGroup = screen.getByRole('group')
      expect(choicesGroup).toHaveAttribute('aria-label', 'Story choices')

      // Check choice buttons have proper labels
      const buttons = screen.getAllByRole('button')
      buttons.forEach((button, index) => {
        expect(button).toHaveAttribute('aria-label', expect.stringContaining(`Choice ${index + 1}:`))
      })
    })

    it('supports keyboard navigation', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const buttons = screen.getAllByRole('button')
      
      // Test Enter key
      fireEvent.keyDown(buttons[0], { key: 'Enter' })
      expect(mockOnChoiceSelect).toHaveBeenCalledWith(mockSceneWithChoices.choices![0])

      // Test Space key
      fireEvent.keyDown(buttons[1], { key: ' ' })
      expect(mockOnChoiceSelect).toHaveBeenCalledWith(mockSceneWithChoices.choices![1])
    })

    it('announces scene changes to screen readers', () => {
      const { rerender } = render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={false}
        />
      )

      // Check for screen reader announcement element
      const announcement = document.querySelector('[aria-live="polite"]')
      expect(announcement).toBeInTheDocument()

      // Activate scene and check announcement
      rerender(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      // Wait for announcement to be set
      setTimeout(() => {
        expect(announcement).toHaveTextContent(expect.stringContaining('New scene:'))
      }, 150)
    })

    it('has minimum touch target sizes for mobile', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button.className).toMatch(/min-h-\[44px\]/)
      })
    })

    it('includes touch optimization classes', () => {
      render(
        <StoryScene
          scene={mockSceneWithChoices}
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

  describe('Custom Props', () => {
    it('applies custom className when provided', () => {
      const customClass = 'custom-story-scene'
      const { container } = render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
          className={customClass}
        />
      )

      expect(container.firstChild).toHaveClass(customClass)
    })

    it('works without custom className', () => {
      const { container } = render(
        <StoryScene
          scene={mockSceneWithChoices}
          onChoiceSelect={mockOnChoiceSelect}
          isActive={true}
        />
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })
})