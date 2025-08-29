export {
  validateStoryData,
  isValidSceneReference,
  getFallbackScene,
  createErrorScene,
  type ValidationError,
  type ValidationResult
} from './storyValidation'

export { 
  useOptimizedStoryData, 
  useOptimizedSceneTransition,
  useDebouncedChoiceSelection,
  preloadStoryImages,
  measureStoryPerformance,
  StoryProgressTracker
} from './performance'