import { renderHook, act } from '@testing-library/react'
import { useStoryNavigation } from '../use-story-navigation'
import { StoryData } from '@/types/story'

// Mock story data for testing
const mockStoryData: StoryData = {
  scene1: {
    id: "scene1",
    text: "This is the first scene.",
    image: "/test-image1.png",
    choices: [
      { text: "Go to scene 2", nextScene: "scene2" },
      { text: "Go to scene 3", nextScene: "scene3" }
    ],
    isEnding: false,
  },
  scene2: {
    id: "scene2",
    text: "This is the second scene.",
    image: "/test-image2.png",
    choices: [
      { text: "Go to positive ending", nextScene: "positive_ending" }
    ],
    isEnding: false,
  },
  scene3: {
    id: "scene3",
    text: "This is the third scene.",
    image: "/test-image3.png",
    choices: [
      { text: "Go to negative ending", nextScene: "negative_ending" }
    ],
    isEnding: false,
  },
  positive_ending: {
    id: "positive_ending",
    text: "You made a great choice!",
    image: "/test-positive.png",
    isEnding: true,
    outcomeType: "positive",
    badge: "Test Badge"
  },
  negative_ending: {
    id: "negative_ending",
    text: "This didn't go well.",
    image: "/test-negative.png",
    isEnding: true,
    outcomeType: "negative"
  }
}

describe('useStoryNavigation', () => {
  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useStoryNavigation(mockStoryData))
    
    expect(result.current.currentSceneId).toBe("scene1")
    expect(result.current.currentScene).toEqual(mockStoryData.scene1)
    expect(result.current.selectedChoice).toBe(null)
    expect(result.current.isCompleted).toBe(false)
    expect(result.current.outcome).toBe(null)
    expect(result.current.choiceHistory).toEqual([])
  })

  it('initializes with custom starting scene', () => {
    const { result } = renderHook(() => useStoryNavigation(mockStoryData, "scene2"))
    
    expect(result.current.currentSceneId).toBe("scene2")
    expect(result.current.currentScene).toEqual(mockStoryData.scene2)
  })

  it('selects choice and navigates to next scene', () => {
    const { result } = renderHook(() => useStoryNavigation(mockStoryData))
    
    const choice = mockStoryData.scene1.choices![0] // "Go to scene 2"
    
    act(() => {
      result.current.selectChoice(choice)
    })
    
    expect(result.current.selectedChoice).toEqual(choice)
    expect(result.current.currentSceneId).toBe("scene2")
    expect(result.current.currentScene).toEqual(mockStoryData.scene2)
    expect(result.current.choiceHistory).toEqual(["Go to scene 2"])
    expect(result.current.isCompleted).toBe(false)
  })

  it('completes story when reaching ending scene', () => {
    const { result } = renderHook(() => useStoryNavigation(mockStoryData))
    
    // Navigate to scene2
    act(() => {
      result.current.selectChoice(mockStoryData.scene1.choices![0])
    })
    
    // Navigate to positive ending
    act(() => {
      result.current.selectChoice(mockStoryData.scene2.choices![0])
    })
    
    expect(result.current.currentSceneId).toBe("positive_ending")
    expect(result.current.isCompleted).toBe(true)
    expect(result.current.outcome).toEqual({
      type: "positive",
      badge: "Test Badge",
      message: "You chose to break the cycle of hate speech. Your constructive approach helps build a more understanding community."
    })
  })

  it('handles negative ending correctly', () => {
    const { result } = renderHook(() => useStoryNavigation(mockStoryData))
    
    // Navigate to scene3
    act(() => {
      result.current.selectChoice(mockStoryData.scene1.choices![1])
    })
    
    // Navigate to negative ending
    act(() => {
      result.current.selectChoice(mockStoryData.scene3.choices![0])
    })
    
    expect(result.current.currentSceneId).toBe("negative_ending")
    expect(result.current.isCompleted).toBe(true)
    expect(result.current.outcome).toEqual({
      type: "negative",
      badge: undefined,
      message: "The cycle of hate speech continues. Consider how different choices might lead to better outcomes for everyone."
    })
  })

  it('tracks choice history correctly', () => {
    const { result } = renderHook(() => useStoryNavigation(mockStoryData))
    
    // Make first choice
    act(() => {
      result.current.selectChoice(mockStoryData.scene1.choices![0])
    })
    
    expect(result.current.choiceHistory).toEqual(["Go to scene 2"])
    
    // Make second choice
    act(() => {
      result.current.selectChoice(mockStoryData.scene2.choices![0])
    })
    
    expect(result.current.choiceHistory).toEqual([
      "Go to scene 2",
      "Go to positive ending"
    ])
  })

  it('navigates directly to scene', () => {
    const { result } = renderHook(() => useStoryNavigation(mockStoryData))
    
    act(() => {
      result.current.navigateToScene("scene3")
    })
    
    expect(result.current.currentSceneId).toBe("scene3")
    expect(result.current.currentScene).toEqual(mockStoryData.scene3)
    expect(result.current.selectedChoice).toBe(null)
    expect(result.current.isCompleted).toBe(false)
  })

  it('handles navigation to ending scene directly', () => {
    const { result } = renderHook(() => useStoryNavigation(mockStoryData))
    
    act(() => {
      result.current.navigateToScene("positive_ending")
    })
    
    expect(result.current.currentSceneId).toBe("positive_ending")
    expect(result.current.isCompleted).toBe(true)
  })

  it('resets story correctly', () => {
    const { result } = renderHook(() => useStoryNavigation(mockStoryData))
    
    // Make some progress
    act(() => {
      result.current.selectChoice(mockStoryData.scene1.choices![0])
    })
    
    act(() => {
      result.current.selectChoice(mockStoryData.scene2.choices![0])
    })
    
    expect(result.current.isCompleted).toBe(true)
    expect(result.current.choiceHistory.length).toBe(2)
    
    // Reset
    act(() => {
      result.current.resetStory()
    })
    
    expect(result.current.currentSceneId).toBe("scene1")
    expect(result.current.currentScene).toEqual(mockStoryData.scene1)
    expect(result.current.selectedChoice).toBe(null)
    expect(result.current.isCompleted).toBe(false)
    expect(result.current.outcome).toBe(null)
    expect(result.current.choiceHistory).toEqual([])
  })

  it('calculates progress percentage correctly', () => {
    const { result } = renderHook(() => useStoryNavigation(mockStoryData))
    
    // Initial progress (1 scene visited out of 5 total)
    expect(result.current.getProgressPercentage()).toBe(20)
    
    // After first choice (2 scenes visited)
    act(() => {
      result.current.selectChoice(mockStoryData.scene1.choices![0])
    })
    
    expect(result.current.getProgressPercentage()).toBe(40)
    
    // After second choice (3 scenes visited)
    act(() => {
      result.current.selectChoice(mockStoryData.scene2.choices![0])
    })
    
    expect(result.current.getProgressPercentage()).toBe(60)
  })

  it('handles invalid scene navigation gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const { result } = renderHook(() => useStoryNavigation(mockStoryData))
    
    act(() => {
      result.current.navigateToScene("invalid_scene")
    })
    
    // Should stay on current scene
    expect(result.current.currentSceneId).toBe("scene1")
    expect(consoleSpy).toHaveBeenCalledWith('Scene "invalid_scene" not found in story data')
    
    consoleSpy.mockRestore()
  })

  it('handles invalid choice navigation gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const { result } = renderHook(() => useStoryNavigation(mockStoryData))
    
    const invalidChoice = { text: "Invalid choice", nextScene: "invalid_scene" }
    
    act(() => {
      result.current.selectChoice(invalidChoice)
    })
    
    expect(result.current.selectedChoice).toEqual(invalidChoice)
    expect(result.current.choiceHistory).toEqual(["Invalid choice"])
    expect(consoleSpy).toHaveBeenCalledWith('Scene "invalid_scene" not found in story data')
    
    consoleSpy.mockRestore()
  })

  it('prevents choice selection when story is completed', () => {
    const { result } = renderHook(() => useStoryNavigation(mockStoryData))
    
    // Complete the story
    act(() => {
      result.current.navigateToScene("positive_ending")
    })
    
    expect(result.current.isCompleted).toBe(true)
    
    // Try to select a choice
    const choice = { text: "Should not work", nextScene: "scene1" }
    act(() => {
      result.current.selectChoice(choice)
    })
    
    // Should remain on ending scene
    expect(result.current.currentSceneId).toBe("positive_ending")
    expect(result.current.selectedChoice).toBe(null)
  })

  it('handles story with no choices gracefully', () => {
    const storyWithNoChoices: StoryData = {
      scene1: {
        id: "scene1",
        text: "This scene has no choices.",
        image: "/test.png",
        isEnding: true,
        outcomeType: "positive"
      }
    }
    
    const { result } = renderHook(() => useStoryNavigation(storyWithNoChoices))
    
    expect(result.current.currentScene?.choices).toBeUndefined()
    expect(result.current.isCompleted).toBe(false) // Not completed until navigated to ending
    
    // Navigate to the ending scene
    act(() => {
      result.current.navigateToScene("scene1")
    })
    
    expect(result.current.isCompleted).toBe(true)
  })
})