// Data Services
export { ScenarioService } from './services/scenario-service'
export { DataLoader } from './services/data-loader'

// Data Models
export { teenScenarios } from './data/teen-scenarios'
export { adultScenarios } from './data/adult-scenarios'
export { 
  validateTeenScenario,
  validateAdultScenario,
  validateScenarioArray
} from './data/validation'

// Constants
export { 
  PLATFORM_CONFIGS,
  ADULT_CATEGORY_CONFIGS,
  BADGE_LEVELS,
  MAX_POINTS_PER_SCENARIO,
  SCENARIOS_PER_MODULE
} from './data/constants'

// Progress Tracking
export {
  getStoredProgress,
  saveProgress,
  updateModuleProgress,
  getDefaultProgress,
  resetProgress
} from './progress-tracker'

// Utilities
export { cn } from './utils'
export { getTranslation, translations } from './translation'

// Re-export types
export type { 
  Language,
  Translations
} from './translation'
export type {
  ModuleProgress,
  UserProgress
} from './progress-tracker'