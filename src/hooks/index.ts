// State Management Hooks
export { useScenarioProgress } from './use-scenario-progress'
export { useTeenModuleState, useAdultModuleState } from './use-module-state'
export { useScenarioNavigation } from './use-scenario-navigation'
export { useStoryNavigation } from './use-story-navigation'
export { 
  useBadgeCalculation,
  useTeenBadgeCalculation,
  useAdultBadgeCalculation
} from './use-badge-calculation'

// Re-export types
export type { UseScenarioProgressReturn } from './use-scenario-progress'
export type { UseModuleStateReturn } from './use-module-state'
export type { UseScenarioNavigationReturn } from './use-scenario-navigation'
export type { UseStoryNavigationReturn } from './use-story-navigation'
export type { UseBadgeCalculationReturn } from './use-badge-calculation'