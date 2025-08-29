import { useState, useCallback, useMemo } from "react"
import { StoryData, StoryScene, StoryChoice, StoryOutcome } from "@/types/story"

export interface UseStoryNavigationReturn {
  currentScene: StoryScene | null
  currentSceneId: string
  selectedChoice: StoryChoice | null
  isCompleted: boolean
  outcome: StoryOutcome | null
  choiceHistory: string[]
  selectChoice: (choice: StoryChoice) => void
  navigateToScene: (sceneId: string) => void
  resetStory: () => void
  getProgressPercentage: () => number
}

export function useStoryNavigation(
  storyData: StoryData,
  startingSceneId: string = "scene1"
): UseStoryNavigationReturn {
  const [currentSceneId, setCurrentSceneId] = useState<string>(startingSceneId)
  const [selectedChoice, setSelectedChoice] = useState<StoryChoice | null>(null)
  const [choiceHistory, setChoiceHistory] = useState<string[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  // Get current scene from story data
  const currentScene = useMemo(() => {
    return storyData[currentSceneId] || null
  }, [storyData, currentSceneId])

  // Calculate story outcome when completed
  const outcome = useMemo((): StoryOutcome | null => {
    if (!isCompleted || !currentScene?.isEnding) {
      return null
    }

    const outcomeType = currentScene.outcomeType || 'neutral'
    let message = ""

    if (outcomeType === 'positive') {
      message = "You chose to break the cycle of hate speech. Your constructive approach helps build a more understanding community."
    } else if (outcomeType === 'negative') {
      message = "The cycle of hate speech continues. Consider how different choices might lead to better outcomes for everyone."
    } else {
      message = "You've completed the story. Reflect on the choices and their consequences."
    }

    return {
      type: outcomeType as 'positive' | 'negative',
      badge: currentScene.badge,
      message
    }
  }, [isCompleted, currentScene])

  // Select a choice and navigate to next scene
  const selectChoice = useCallback((choice: StoryChoice) => {
    if (!choice || isCompleted) return

    setSelectedChoice(choice)
    
    // Add choice to history
    setChoiceHistory(prev => [...prev, choice.text])

    // Navigate to next scene
    const nextScene = storyData[choice.nextScene]
    if (nextScene) {
      setCurrentSceneId(choice.nextScene)
      
      // Check if story is completed
      if (nextScene.isEnding) {
        setIsCompleted(true)
      }
    } else {
      console.error(`Scene "${choice.nextScene}" not found in story data`)
    }
  }, [storyData, isCompleted])

  // Navigate directly to a scene (for testing or special cases)
  const navigateToScene = useCallback((sceneId: string) => {
    if (!storyData[sceneId]) {
      console.error(`Scene "${sceneId}" not found in story data`)
      return
    }

    setCurrentSceneId(sceneId)
    setSelectedChoice(null)
    
    // Check if navigating to an ending scene
    if (storyData[sceneId].isEnding) {
      setIsCompleted(true)
    } else {
      setIsCompleted(false)
    }
  }, [storyData])

  // Reset story to beginning
  const resetStory = useCallback(() => {
    setCurrentSceneId(startingSceneId)
    setSelectedChoice(null)
    setChoiceHistory([])
    setIsCompleted(false)
  }, [startingSceneId])

  // Calculate progress percentage based on scenes visited
  const getProgressPercentage = useCallback(() => {
    const totalScenes = Object.keys(storyData).length
    const scenesVisited = choiceHistory.length + 1 // +1 for current scene
    return Math.min((scenesVisited / totalScenes) * 100, 100)
  }, [storyData, choiceHistory])

  return {
    currentScene,
    currentSceneId,
    selectedChoice,
    isCompleted,
    outcome,
    choiceHistory,
    selectChoice,
    navigateToScene,
    resetStory,
    getProgressPercentage
  }
}