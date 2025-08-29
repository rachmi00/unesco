// Central export for all type definitions

// Core scenario types
export type {
  PlatformType,
  AdultCategory,
  ImpactLevel,
  DifficultyLevel,
  ScenarioStatus,
  PlatformDetails,
  BaseScenario,
  BaseOption,
  TeenOption,
  AdultOption,
  TeenScenario,
  AdultScenario,
  ScenarioProgress,
  ModuleState,
  BadgeInfo,
  UserAchievement,
  ValidationResult,
  ScenarioValidation,
  ModuleConfig
} from './scenarios'

// UI component types
export type {
  ComponentProps,
  ScenarioCardProps,
  TeenOptionCardProps,
  AdultOptionCardProps,
  ProgressTrackerProps,
  ModuleLayoutProps,
  LoadingStateProps,
  ErrorBoundaryProps,
  UseScenarioProgressReturn,
  UseModuleStateReturn,
  PlatformPostProps,
  StakeholderListProps,
  LegalContextProps,
  NavigationProps,
  ScenarioEventHandlers,
  TeenResultDisplayProps,
  AdultResultDisplayProps,
  CompletionScreenProps
} from '../lib/data/types'

// Validation functions
export {
  validateBaseScenario,
  validateBaseOption,
  validateTeenScenario,
  validateTeenOption,
  validateAdultScenario,
  validateAdultOption,
  validateScenarioProgress,
  validateScenarioData
} from '../lib/validation/scenario-validation'