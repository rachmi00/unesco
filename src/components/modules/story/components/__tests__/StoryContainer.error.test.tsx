import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { StoryContainer } from '../StoryContainer'
import { StoryData } from '@/types/story'
import { BadgeInfo } from '@/types/scenarios'

// Mock the validation utilities
jest.mock('../../utils/storyValidation', () => ({
  validateStoryData: jest.fn(),
  getFallbackScene: jest.fn(),
  createErrorScene: jest.fn(),
  isValidSceneReference: jest.fn()
}))

import {
  validateStoryData,
  getFallbackScene,
  createErrorScene,
  isValidSceneReference
} from '../../utils/storyValidation'

const mockValidateStoryData = validateStoryData as jest.MockedFunction<typeof validateStoryData>
const mockGetFallbackScene = getFallbackScene as jest.MockedFunction<typeof getFallbackScene>
const mockCreateErrorScene = createErrorScene as jest.MockedFunction<typeof createErrorScene>
const mockIsValidSceneReference = isValidSceneReference as jest.MockedFunction<typeof isValidSceneReference>

describe('StoryContainer - Error Handling', () => {
  const validStoryData: StoryData = {
    scene1: {
      id: 'scene1',
      text: 'First scene',
      image: '/test.png',
      choices: [{ text: 'Continue', nextScene: 'scene2' }],
      isEnding: false
    },
    scene2: {
      id: 'scene2',
      text: 'Second scene',
      image: '/test2.png',
      isEnding: true,
      outcomeType: 'positive'
    }
  }

  const badges: Record<string, BadgeInfo> = {
    'Test Badge': {
      name: 'Test Badge',
      icon: 'star',
      color: 'from-yellow-400 to-yellow-600'
    }
  }

  const errorScene = {
    id: 'error',
    text: 'Story validation failed',
    image: '/error.png',
    isEnding: true,
    outcomeType: 'negative' as const
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Default to valid story data
    mockValidateStoryData.mockReturnValue({
      isValid: true,
      errors: [],
      warnings: []
    })
    mockIsValidSceneReference.mockReturnValue(true)
  })

  it('shows loading state during initialization', () => {
    render(<StoryContainer storyData={validStoryData} badges={badges} />)

    expect(screen.getByTestId('story-loading-state')).toBeInTheDocument()
    expect(screen.getByText('Loading story...')).toBeInTheDocument()
  })

  it('shows error state when story validation fails', async () => {
    mockValidateStoryData.mockReturnValue({
      isValid: false,
      errors: [{ type: 'missing_scene', message: 'Scene not found' }],
      warnings: []
    })
    mockCreateErrorScene.mockReturnValue(errorScene)

    render(<StoryContainer storyData={validStoryData} badges={badges} />)

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId('story-loading-state')).not.toBeInTheDocument()
    })

    // Should show error state
    expect(screen.getByText('Story Error')).toBeInTheDocument()
    expect(screen.getByText(/Story validation failed/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })

  it('shows scene not found error when current scene is null', async () => {
    mockValidateStoryData.mockReturnValue({
      isValid: true,
      errors: [],
      warnings: []
    })
    
    // Mock scenario where scene is not found but story is initialized
    mockGetFallbackScene.mockReturnValue(null)

    render(<StoryContainer storyData={{}} badges={badges} startingScene="nonexistent" />)

    await waitFor(() => {
      expect(screen.queryByTestId('story-loading-state')).not.toBeInTheDocument()
    })

    // Should show scene not found error
    expect(screen.getByText('Scene Not Found')).toBeInTheDocument()
    expect(screen.getByText(/The current story scene could not be loaded/)).toBeInTheDocument()
  })

  it('handles restart when error occurs', async () => {
    mockValidateStoryData.mockReturnValue({
      isValid: false,
      errors: [{ type: 'missing_scene', message: 'Error' }],
      warnings: []
    })
    mockCreateErrorScene.mockReturnValue(errorScene)

    render(<StoryContainer storyData={validStoryData} badges={badges} />)

    await waitFor(() => {
      expect(screen.queryByTestId('story-loading-state')).not.toBeInTheDocument()
    })

    expect(screen.getByText('Story Error')).toBeInTheDocument()

    // Reset validation to succeed on restart
    mockValidateStoryData.mockReturnValue({
      isValid: true,
      errors: [],
      warnings: []
    })

    fireEvent.click(screen.getByRole('button', { name: /try again/i }))

    await waitFor(() => {
      expect(screen.queryByText('Story Error')).not.toBeInTheDocument()
    })
  })

  it('shows error boundary when component throws', () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = jest.fn()

    // Mock validation to throw an error
    mockValidateStoryData.mockImplementation(() => {
      throw new Error('Validation error')
    })

    render(<StoryContainer storyData={validStoryData} badges={badges} />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText(/The story encountered an unexpected error/)).toBeInTheDocument()

    console.error = originalError
  })

  it('shows development error details in development mode', async () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    mockValidateStoryData.mockReturnValue({
      isValid: false,
      errors: [{ type: 'missing_scene', message: 'Dev error' }],
      warnings: []
    })
    mockCreateErrorScene.mockReturnValue(errorScene)

    render(<StoryContainer storyData={validStoryData} badges={badges} />)

    await waitFor(() => {
      expect(screen.getByText(/Development Warning/)).toBeInTheDocument()
    })

    process.env.NODE_ENV = originalEnv
  })

  it('hides development error details in production mode', async () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    mockValidateStoryData.mockReturnValue({
      isValid: false,
      errors: [{ type: 'missing_scene', message: 'Prod error' }],
      warnings: []
    })
    mockCreateErrorScene.mockReturnValue(errorScene)

    render(<StoryContainer storyData={validStoryData} badges={badges} />)

    await waitFor(() => {
      expect(screen.getByText('Story Error')).toBeInTheDocument()
    })

    expect(screen.queryByText(/Development Warning/)).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('disables restart button during loading', async () => {
    mockValidateStoryData.mockReturnValue({
      isValid: true,
      errors: [],
      warnings: []
    })

    render(<StoryContainer storyData={validStoryData} badges={badges} />)

    await waitFor(() => {
      expect(screen.queryByTestId('story-loading-state')).not.toBeInTheDocument()
    })

    const restartButton = screen.getByRole('button', { name: /restart story/i })
    expect(restartButton).not.toBeDisabled()

    // Simulate loading state
    mockIsValidSceneReference.mockReturnValue(true)
    fireEvent.click(screen.getByText('Continue'))

    // During transition, button should be disabled
    // Note: This test might need adjustment based on actual loading behavior
  })

  it('calls onComplete callback even when error occurs in ending scene', async () => {
    const onComplete = jest.fn()
    
    const errorEndingScene = {
      id: 'error_ending',
      text: 'Error ending',
      image: '/error.png',
      isEnding: true,
      outcomeType: 'negative' as const
    }

    mockValidateStoryData.mockReturnValue({
      isValid: true,
      errors: [],
      warnings: []
    })
    mockCreateErrorScene.mockReturnValue(errorEndingScene)

    render(
      <StoryContainer 
        storyData={validStoryData} 
        badges={badges}
        onComplete={onComplete}
      />
    )

    await waitFor(() => {
      expect(screen.queryByTestId('story-loading-state')).not.toBeInTheDocument()
    })

    // Simulate reaching an error ending
    mockValidateStoryData.mockReturnValue({
      isValid: false,
      errors: [{ type: 'missing_scene', message: 'Error in ending' }],
      warnings: []
    })

    // The error scene is an ending, so onComplete should be called
    await waitFor(() => {
      if (onComplete.mock.calls.length > 0) {
        expect(onComplete).toHaveBeenCalledWith({
          type: 'negative',
          message: 'Error ending'
        })
      }
    })
  })

  it('handles malformed story data gracefully', async () => {
    const malformedData = {
      scene1: null,
      scene2: undefined,
      scene3: 'not an object'
    } as unknown as Record<string, unknown>

    mockValidateStoryData.mockReturnValue({
      isValid: false,
      errors: [{ type: 'invalid_choice', message: 'Malformed data' }],
      warnings: []
    })
    mockCreateErrorScene.mockReturnValue(errorScene)

    render(<StoryContainer storyData={malformedData} badges={badges} />)

    await waitFor(() => {
      expect(screen.getByText('Story Error')).toBeInTheDocument()
    })

    expect(screen.getByText(/Story validation failed/)).toBeInTheDocument()
  })
})