import {
  validateStoryData,
  isValidSceneReference,
  getFallbackScene,
  createErrorScene
} from '../storyValidation'
import { StoryData } from '@/types/story'

describe('storyValidation', () => {
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
      choices: [
        { text: 'Choice A', nextScene: 'ending1' },
        { text: 'Choice B', nextScene: 'ending2' }
      ],
      isEnding: false
    },
    ending1: {
      id: 'ending1',
      text: 'Good ending',
      image: '/good.png',
      isEnding: true,
      outcomeType: 'positive',
      badge: 'Test Badge'
    },
    ending2: {
      id: 'ending2',
      text: 'Bad ending',
      image: '/bad.png',
      isEnding: true,
      outcomeType: 'negative'
    }
  }

  describe('validateStoryData', () => {
    it('validates correct story data', () => {
      const result = validateStoryData(validStoryData)
      
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('detects missing starting scene', () => {
      const result = validateStoryData(validStoryData, 'nonexistent')
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContainEqual({
        type: 'missing_starting_scene',
        message: 'Starting scene "nonexistent" not found in story data',
        sceneId: 'nonexistent'
      })
    })

    it('detects missing scene properties', () => {
      const invalidData: StoryData = {
        scene1: {
          id: '',
          text: '',
          image: '/test.png',
          isEnding: false
        }
      }

      const result = validateStoryData(invalidData)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContainEqual({
        type: 'invalid_choice',
        message: 'Scene "scene1" is missing required properties (id, text)',
        sceneId: 'scene1'
      })
    })

    it('detects invalid choice references', () => {
      const invalidData: StoryData = {
        scene1: {
          id: 'scene1',
          text: 'First scene',
          image: '/test.png',
          choices: [{ text: 'Continue', nextScene: 'nonexistent' }],
          isEnding: false
        }
      }

      const result = validateStoryData(invalidData)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContainEqual({
        type: 'missing_scene',
        message: 'Scene "nonexistent" referenced by choice "Continue" in scene "scene1" does not exist',
        sceneId: 'scene1',
        choiceText: 'Continue'
      })
    })

    it('detects invalid choice structure', () => {
      const invalidData: StoryData = {
        scene1: {
          id: 'scene1',
          text: 'First scene',
          image: '/test.png',
          choices: [{ text: '', nextScene: '' }],
          isEnding: false
        }
      }

      const result = validateStoryData(invalidData)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContainEqual({
        type: 'invalid_choice',
        message: 'Invalid choice in scene "scene1": missing text or nextScene',
        sceneId: 'scene1',
        choiceText: ''
      })
    })

    it('warns about ending scenes with choices', () => {
      const warningData: StoryData = {
        ending: {
          id: 'ending',
          text: 'The end',
          image: '/end.png',
          choices: [{ text: 'Continue', nextScene: 'scene1' }],
          isEnding: true
        }
      }

      const result = validateStoryData(warningData, 'ending')
      
      expect(result.isValid).toBe(true)
      expect(result.warnings).toContainEqual({
        type: 'invalid_choice',
        message: 'Ending scene "ending" has choices but should not',
        sceneId: 'ending'
      })
    })

    it('warns about non-ending scenes without choices', () => {
      const warningData: StoryData = {
        scene1: {
          id: 'scene1',
          text: 'Scene without choices',
          image: '/test.png',
          isEnding: false
        }
      }

      const result = validateStoryData(warningData)
      
      expect(result.isValid).toBe(true)
      expect(result.warnings).toContainEqual({
        type: 'invalid_choice',
        message: 'Non-ending scene "scene1" has no choices',
        sceneId: 'scene1'
      })
    })
  })

  describe('isValidSceneReference', () => {
    it('returns true for valid scene references', () => {
      expect(isValidSceneReference(validStoryData, 'scene1')).toBe(true)
      expect(isValidSceneReference(validStoryData, 'ending1')).toBe(true)
    })

    it('returns false for invalid scene references', () => {
      expect(isValidSceneReference(validStoryData, 'nonexistent')).toBe(false)
      expect(isValidSceneReference(validStoryData, '')).toBe(false)
    })
  })

  describe('getFallbackScene', () => {
    it('returns starting scene when it exists', () => {
      const fallback = getFallbackScene(validStoryData, 'invalid', 'scene1')
      
      expect(fallback).toEqual(validStoryData.scene1)
    })

    it('returns first available scene when starting scene does not exist', () => {
      const fallback = getFallbackScene(validStoryData, 'invalid', 'nonexistent')
      
      expect(fallback).toBeTruthy()
      expect(fallback?.id).toBe('scene1') // First scene in the object
    })

    it('returns null when no scenes are available', () => {
      const emptyData: StoryData = {}
      const fallback = getFallbackScene(emptyData, 'invalid')
      
      expect(fallback).toBeNull()
    })

    it('logs appropriate warnings', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
      
      getFallbackScene(validStoryData, 'invalid', 'scene1')
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid scene "invalid", falling back to starting scene "scene1"'
      )
      
      consoleSpy.mockRestore()
    })

    it('logs error when no valid scenes found', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const emptyData: StoryData = {}
      
      getFallbackScene(emptyData, 'invalid')
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'No valid scenes found in story data. Invalid scene: "invalid"'
      )
      
      consoleSpy.mockRestore()
    })
  })

  describe('createErrorScene', () => {
    it('creates error scene with provided message', () => {
      const errorMessage = 'Test error message'
      const errorScene = createErrorScene(errorMessage)
      
      expect(errorScene).toEqual({
        id: 'error',
        text: errorMessage,
        image: '/pixel-art/error-placeholder.png',
        isEnding: true,
        outcomeType: 'negative'
      })
    })

    it('creates error scene with different messages', () => {
      const message1 = 'Scene not found'
      const message2 = 'Invalid story data'
      
      const scene1 = createErrorScene(message1)
      const scene2 = createErrorScene(message2)
      
      expect(scene1.text).toBe(message1)
      expect(scene2.text).toBe(message2)
      expect(scene1.id).toBe('error')
      expect(scene2.id).toBe('error')
    })
  })
})