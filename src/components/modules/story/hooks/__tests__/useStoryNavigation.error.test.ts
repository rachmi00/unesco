import { renderHook, act, waitFor } from '@testing-library/react'
import { useStoryNavigation } from '../useStoryNavigation'
import { StoryData } from '@/types/story'

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

describe('useStoryNavigation - Error Handling', () => {
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

  const errorScene = {
    id: 'error',
    text: 'Error occurred',
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

  it('handles story validation errors during initialization', async () => {
    mockValidateStoryData.mockReturnValue({
      isValid: false,
      errors: [{ type: 'missing_scene', message: 'Scene not found' }],
      warnings: []
    })
    mockCreateErrorScene.mockReturnValue(errorScene)

    const { result } = renderHook(() =>
      useStoryNavigation({ storyData: validStoryData })
    )

    // Initially loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.isInitialized).toBe(false)

    // Wait for initialization to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toBe('Story validation failed: Scene not found')
    expect(result.current.isInitialized).toBe(false)
    expect(result.current.currentScene).toEqual(errorScene)
  })

  it('handles invalid scene references with fallback', async () => {
    mockValidateStoryData.mockReturnValue({
      isValid: true,
      errors: [],
      warnings: []
    })
    mockIsValidSceneReference.mockReturnValue(false)
    mockGetFallbackScene.mockReturnValue(validStoryData.scene1)

    const { result } = renderHook(() =>
      useStoryNavigation({ storyData: validStoryData, startingScene: 'invalid' })
    )

    await waitFor(() => {
      expect(result.current.isInitialized).toBe(true)
    })

    expect(result.current.currentScene).toEqual(validStoryData.scene1)
    expect(mockGetFallbackScene).toHaveBeenCalledWith(validStoryData, 'invalid', 'invalid')
  })

  it('handles navigation to invalid scenes', async () => {
    mockValidateStoryData.mockReturnValue({
      isValid: true,
      errors: [],
      warnings: []
    })

    const { result } = renderHook(() =>
      useStoryNavigation({ storyData: validStoryData })
    )

    await waitFor(() => {
      expect(result.current.isInitialized).toBe(true)
    })

    // Mock invalid scene reference for navigation
    mockIsValidSceneReference.mockReturnValue(false)
    mockGetFallbackScene.mockReturnValue(validStoryData.scene1)

    act(() => {
      result.current.navigateToScene('invalid_scene')
    })

    expect(mockGetFallbackScene).toHaveBeenCalledWith(
      validStoryData,
      'invalid_scene',
      'scene1'
    )
  })

  it('handles navigation when no fallback is available', async () => {
    mockValidateStoryData.mockReturnValue({
      isValid: true,
      errors: [],
      warnings: []
    })

    const { result } = renderHook(() =>
      useStoryNavigation({ storyData: validStoryData })
    )

    await waitFor(() => {
      expect(result.current.isInitialized).toBe(true)
    })

    // Mock invalid scene reference with no fallback
    mockIsValidSceneReference.mockReturnValue(false)
    mockGetFallbackScene.mockReturnValue(null)

    act(() => {
      result.current.navigateToScene('invalid_scene')
    })

    expect(result.current.error).toBe('Invalid scene reference: "invalid_scene"')
  })

  it('handles invalid choice selection', async () => {
    mockValidateStoryData.mockReturnValue({
      isValid: true,
      errors: [],
      warnings: []
    })

    const { result } = renderHook(() =>
      useStoryNavigation({ storyData: validStoryData })
    )

    await waitFor(() => {
      expect(result.current.isInitialized).toBe(true)
    })

    // Try to select invalid choice
    act(() => {
      result.current.selectChoice({ text: '', nextScene: '' })
    })

    expect(result.current.error).toBe('Invalid choice selected')
  })

  it('prevents actions when story has error', async () => {
    mockValidateStoryData.mockReturnValue({
      isValid: false,
      errors: [{ type: 'missing_scene', message: 'Error' }],
      warnings: []
    })
    mockCreateErrorScene.mockReturnValue(errorScene)

    const { result } = renderHook(() =>
      useStoryNavigation({ storyData: validStoryData })
    )

    await waitFor(() => {
      expect(result.current.error).toBeTruthy()
    })

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    // Try to navigate when there's an error
    act(() => {
      result.current.navigateToScene('scene2')
    })

    expect(consoleSpy).toHaveBeenCalledWith(
      'Cannot navigate: story not initialized or has error'
    )

    // Try to select choice when there's an error
    act(() => {
      result.current.selectChoice({ text: 'Test', nextScene: 'scene2' })
    })

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Cannot select choice')
    )

    consoleSpy.mockRestore()
  })

  it('resets error state when restarting story', async () => {
    mockValidateStoryData.mockReturnValue({
      isValid: false,
      errors: [{ type: 'missing_scene', message: 'Error' }],
      warnings: []
    })
    mockCreateErrorScene.mockReturnValue(errorScene)

    const { result } = renderHook(() =>
      useStoryNavigation({ storyData: validStoryData })
    )

    await waitFor(() => {
      expect(result.current.error).toBeTruthy()
    })

    // Reset validation to succeed
    mockValidateStoryData.mockReturnValue({
      isValid: true,
      errors: [],
      warnings: []
    })

    act(() => {
      result.current.restartStory()
    })

    expect(result.current.error).toBeNull()
    expect(result.current.isInitialized).toBe(true)
  })

  it('logs warnings in development mode', async () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    mockValidateStoryData.mockReturnValue({
      isValid: true,
      errors: [],
      warnings: [{ type: 'invalid_choice', message: 'Warning message' }]
    })

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

    renderHook(() =>
      useStoryNavigation({ storyData: validStoryData })
    )

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Story validation warnings:',
        [{ type: 'invalid_choice', message: 'Warning message' }]
      )
    })

    consoleSpy.mockRestore()
    process.env.NODE_ENV = originalEnv
  })

  it('handles initialization timeout gracefully', async () => {
    mockValidateStoryData.mockImplementation(() => {
      // Simulate long validation
      return new Promise(resolve => {
        setTimeout(() => resolve({
          isValid: true,
          errors: [],
          warnings: []
        }), 1000)
      })
    })

    const { result } = renderHook(() =>
      useStoryNavigation({ storyData: validStoryData })
    )

    expect(result.current.isLoading).toBe(true)
    expect(result.current.isInitialized).toBe(false)

    // Fast-forward time
    await act(async () => {
      jest.advanceTimersByTime(1500)
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.isInitialized).toBe(true)
  }, 10000)
})