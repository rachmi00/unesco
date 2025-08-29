import { useState, useCallback, useMemo, useEffect } from 'react'
import { StoryData, StoryScene, StoryChoice, StoryOutcome } from '@/types/story'
import { validateStoryData, getFallbackScene, isValidSceneReference } from '../utils/storyValidation'

interface UseStoryNavigationProps {
  storyData: StoryData
  startingScene?: string
}

interface UseStoryNavigationReturn {
  currentScene: StoryScene | null
  isLoading: boolean
  isComplete: boolean
  outcome: StoryOutcome | null
  choiceHistory: string[]
  error: string | null
  isInitialized: boolean
  navigateToScene: (sceneId: string) => void
  selectChoice: (choice: StoryChoice) => void
  restartStory: () => void
}

export function useStoryNavigation({
  storyData,
  startingScene = 'scene1'
}: UseStoryNavigationProps): UseStoryNavigationReturn {
  const [currentSceneId, setCurrentSceneId] = useState<string>(startingScene)
  const [choiceHistory, setChoiceHistory] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize and validate story data
  useEffect(() => {
    const initializeStory = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Validate story data
        const validation = validateStoryData(storyData, startingScene)
        
        if (!validation.isValid) {
          const errorMessages = validation.errors.map(err => err.message).join('; ')
          throw new Error(`Story validation failed: ${errorMessages}`)
        }

        // Log warnings in development
        if (process.env.NODE_ENV === 'development' && validation.warnings.length > 0) {
          console.warn('Story validation warnings:', validation.warnings)
        }

        // Simulate initialization delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500))

        setIsInitialized(true)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        setError(errorMessage)
        console.error('Story initialization error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    initializeStory()
  }, [storyData, startingScene])

  // Get current scene from story data with fallback handling
  const currentScene = useMemo(() => {
    if (!isInitialized) {
      return null
    }

    if (error) {
      return null // Return null for error state, let container handle error display
    }

    const scene = storyData[currentSceneId]
    if (!scene) {
      // Try to get fallback scene
      const fallbackScene = getFallbackScene(storyData, currentSceneId, startingScene)
      if (fallbackScene) {
        // Update current scene ID to the fallback
        setCurrentSceneId(fallbackScene.id)
        return fallbackScene
      }
      
      // Set error if no fallback available
      setError(`Scene "${currentSceneId}" not found and no fallback available`)
      return null
    }

    return scene
  }, [storyData, currentSceneId, isInitialized, error, startingScene])

  // Check if story is complete
  const isComplete = useMemo(() => {
    return currentScene?.isEnding || false
  }, [currentScene])

  // Generate outcome when story is complete
  const outcome = useMemo((): StoryOutcome | null => {
    if (!isComplete || !currentScene) return null

    return {
      type: currentScene.outcomeType || 'negative',
      badge: currentScene.badge,
      message: currentScene.text
    }
  }, [isComplete, currentScene])

  // Navigate to a specific scene with validation
  const navigateToScene = useCallback((sceneId: string) => {
    if (!isInitialized || error) {
      console.error('Cannot navigate: story not initialized or has error')
      return
    }

    if (!isValidSceneReference(storyData, sceneId)) {
      console.error(`Scene "${sceneId}" not found in story data`)
      
      // Try to get fallback scene
      const fallbackScene = getFallbackScene(storyData, sceneId, startingScene)
      if (fallbackScene) {
        setCurrentSceneId(fallbackScene.id)
        return
      }
      
      // Set error if no fallback available
      setError(`Invalid scene reference: "${sceneId}"`)
      return
    }

    setIsLoading(true)
    
    // Simulate brief loading for smooth transitions
    setTimeout(() => {
      setCurrentSceneId(sceneId)
      setIsLoading(false)
    }, 300)
  }, [storyData, isInitialized, error, startingScene])

  // Handle choice selection and scene transition
  const selectChoice = useCallback((choice: StoryChoice) => {
    if (isLoading || isComplete || !isInitialized || error) {
      console.warn('Cannot select choice: story not ready or complete')
      return
    }

    if (!choice || !choice.text || !choice.nextScene) {
      console.error('Invalid choice object:', choice)
      setError('Invalid choice selected')
      return
    }

    // Add choice to history
    setChoiceHistory(prev => [...prev, choice.text])
    
    // Navigate to next scene
    navigateToScene(choice.nextScene)
  }, [isLoading, isComplete, isInitialized, error, navigateToScene])

  // Restart the story
  const restartStory = useCallback(() => {
    setCurrentSceneId(startingScene)
    setChoiceHistory([])
    setError(null)
    setIsLoading(false)
    setIsInitialized(true)
  }, [startingScene])

  return {
    currentScene,
    isLoading,
    isComplete,
    outcome,
    choiceHistory,
    error,
    isInitialized,
    navigateToScene,
    selectChoice,
    restartStory
  }
}