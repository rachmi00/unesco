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
    ...props 
  }: { 
    src: string; 
    alt: string; 
    [key: string]: unknown 
  }) {
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

  describe('Complete Story Flow - User Experience', () => {
    it('provides clear guidance through positive story completion', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
          onBadgeEarned={mockOnBadgeEarned}
        />
      )

      // Initial scene with clear context
      expect(screen.getByText(/Ray casually mentions that women from your ethnic group/)).toBeInTheDocument()
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()
      
      // Progress through story
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

      // Choose positive path
      fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      act(() => { jest.advanceTimersByTime(300) })

      // Verify positive completion experience
      await waitFor(() => {
        expect(screen.getByText('Cycle Broken Successfully')).toBeInTheDocument()
        expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
        expect(screen.getByText('Try Story Again')).toBeInTheDocument()
      })

      expect(mockOnComplete).toHaveBeenCalledWith({
        type: 'positive',
        badge: 'Cycle Breaker Badge',
        message: expect.stringContaining('You feel empowered')
      })
    })

    it('provides educational feedback for negative story completion', async () => {
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

      // Verify educational negative completion
      await waitFor(() => {
        expect(screen.getByText('The Cycle Continues')).toBeInTheDocument()
        expect(screen.getByText(/Retaliation often escalates/)).toBeInTheDocument()
        expect(screen.getByText('Try Story Again')).toBeInTheDocument()
        expect(screen.queryByText('Badge Earned!')).not.toBeInTheDocument()
      })
    })

    it('maintains engagement through progress indicators', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
          badges={mockBadges}
          onComplete={mockOnComplete}
        />
      )

      // Track progress through story
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()

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

      // Progress indicator disappears after completion
      fireEvent.click(screen.getByText('Report the video and message Ray privately'))
      act(() => { jest.advanceTimersByTime(300) })

      await waitFor(() => {
        expect(screen.queryByText('choices made')).not.toBeInTheDocument()
      })
    })

    it('provides smooth restart functionality', async () => {
      render(
        <StoryContainer
          storyData={aniseRayStory}
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

      // Restart from completion
      await waitFor(() => {
        fireEvent.click(screen.getByText('Try Story Again'))
      })

      // Should return to beginning
      expect(screen.getByText(/Ray casually mentions/)).toBeInTheDocument()
      expect(screen.getByText('0 / 2 choices made')).toBeInTheDocument()
    })
  })
})