import { StoryData, StoryScene } from '@/types/story'

export interface ValidationError {
  type: 'missing_scene' | 'invalid_choice' | 'circular_reference' | 'missing_starting_scene'
  message: string
  sceneId?: string
  choiceText?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

/**
 * Validates story data structure and references
 */
export function validateStoryData(storyData: StoryData, startingScene = 'scene1'): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Check if starting scene exists
  if (!storyData[startingScene]) {
    errors.push({
      type: 'missing_starting_scene',
      message: `Starting scene "${startingScene}" not found in story data`,
      sceneId: startingScene
    })
  }

  // Validate each scene
  for (const [sceneId, scene] of Object.entries(storyData)) {
    // Validate scene structure
    if (!scene.id || !scene.text) {
      errors.push({
        type: 'invalid_choice',
        message: `Scene "${sceneId}" is missing required properties (id, text)`,
        sceneId
      })
      continue
    }

    // Validate choices if present
    if (scene.choices && scene.choices.length > 0) {
      for (const choice of scene.choices) {
        if (!choice.text || !choice.nextScene) {
          errors.push({
            type: 'invalid_choice',
            message: `Invalid choice in scene "${sceneId}": missing text or nextScene`,
            sceneId,
            choiceText: choice.text
          })
          continue
        }

        // Check if referenced scene exists
        if (!storyData[choice.nextScene]) {
          errors.push({
            type: 'missing_scene',
            message: `Scene "${choice.nextScene}" referenced by choice "${choice.text}" in scene "${sceneId}" does not exist`,
            sceneId,
            choiceText: choice.text
          })
        }
      }
    }

    // Check for ending scenes without choices
    if (scene.isEnding && scene.choices && scene.choices.length > 0) {
      warnings.push({
        type: 'invalid_choice',
        message: `Ending scene "${sceneId}" has choices but should not`,
        sceneId
      })
    }

    // Check for non-ending scenes without choices
    if (!scene.isEnding && (!scene.choices || scene.choices.length === 0)) {
      warnings.push({
        type: 'invalid_choice',
        message: `Non-ending scene "${sceneId}" has no choices`,
        sceneId
      })
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Checks if a scene reference is valid
 */
export function isValidSceneReference(storyData: StoryData, sceneId: string): boolean {
  return sceneId in storyData
}

/**
 * Gets a fallback scene when the requested scene is invalid
 */
export function getFallbackScene(storyData: StoryData, invalidSceneId: string, startingScene = 'scene1'): StoryScene | null {
  // Try to return to starting scene
  if (storyData[startingScene]) {
    console.warn(`Invalid scene "${invalidSceneId}", falling back to starting scene "${startingScene}"`)
    return storyData[startingScene]
  }

  // If starting scene doesn't exist, try to find any valid scene
  const availableScenes = Object.keys(storyData)
  if (availableScenes.length > 0) {
    const fallbackSceneId = availableScenes[0]
    console.warn(`Invalid scene "${invalidSceneId}" and starting scene "${startingScene}" not found, falling back to "${fallbackSceneId}"`)
    return storyData[fallbackSceneId]
  }

  // No valid scenes found
  console.error(`No valid scenes found in story data. Invalid scene: "${invalidSceneId}"`)
  return null
}

/**
 * Creates an error scene for display when story data is completely invalid
 */
export function createErrorScene(errorMessage: string): StoryScene {
  return {
    id: 'error',
    text: errorMessage,
    image: '/pixel-art/error-placeholder.png',
    isEnding: true,
    outcomeType: 'negative'
  }
}