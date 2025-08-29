import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { StoryScene } from '../StoryScene'
import { aniseRayStory } from '../../data/anise-ray-story'

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

describe('StoryScene Integration Tests', () => {
  const mockOnChoiceSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the first scene from actual story data', () => {
    const scene1 = aniseRayStory.scene1

    render(
      <StoryScene
        scene={scene1}
        onChoiceSelect={mockOnChoiceSelect}
        isActive={true}
      />
    )

    expect(screen.getByText(scene1.text)).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', scene1.image)
    expect(screen.getByText('Continue listening')).toBeInTheDocument()
  })

  it('renders the choice scene with multiple options', () => {
    const scene3 = aniseRayStory.scene3

    render(
      <StoryScene
        scene={scene3}
        onChoiceSelect={mockOnChoiceSelect}
        isActive={true}
      />
    )

    expect(screen.getByText(scene3.text)).toBeInTheDocument()
    expect(screen.getByText('Screenshot and post revenge comment')).toBeInTheDocument()
    expect(screen.getByText('Report the video and message Ray privately')).toBeInTheDocument()
  })

  it('renders ending scenes without choices', () => {
    const retaliationEnding = aniseRayStory.retaliation

    render(
      <StoryScene
        scene={retaliationEnding}
        onChoiceSelect={mockOnChoiceSelect}
        isActive={true}
      />
    )

    expect(screen.getByText(retaliationEnding.text)).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('handles choice selection with actual story data', () => {
    const scene3 = aniseRayStory.scene3
    const expectedChoice = scene3.choices![0]

    render(
      <StoryScene
        scene={scene3}
        onChoiceSelect={mockOnChoiceSelect}
        isActive={true}
      />
    )

    const choiceButton = screen.getByText('Screenshot and post revenge comment').closest('button')
    fireEvent.click(choiceButton!)

    expect(mockOnChoiceSelect).toHaveBeenCalledWith(expectedChoice)
    expect(mockOnChoiceSelect).toHaveBeenCalledWith({
      text: 'Screenshot and post revenge comment',
      nextScene: 'retaliation'
    })
  })

  it('renders positive ending scene with badge', () => {
    const cycleBreaker = aniseRayStory.cycle_breaker

    render(
      <StoryScene
        scene={cycleBreaker}
        onChoiceSelect={mockOnChoiceSelect}
        isActive={true}
      />
    )

    expect(screen.getByText(cycleBreaker.text)).toBeInTheDocument()
    expect(cycleBreaker.badge).toBe('Cycle Breaker Badge')
    expect(cycleBreaker.outcomeType).toBe('positive')
  })

  it('verifies all story scenes have required properties', () => {
    Object.values(aniseRayStory).forEach(scene => {
      expect(scene).toHaveProperty('id')
      expect(scene).toHaveProperty('text')
      expect(scene).toHaveProperty('image')
      expect(scene).toHaveProperty('isEnding')
      
      if (!scene.isEnding) {
        expect(scene.choices).toBeDefined()
        expect(scene.choices!.length).toBeGreaterThan(0)
      }
    })
  })
})