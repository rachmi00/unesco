// UI-specific types and component interfaces

import { ReactNode, ComponentType } from 'react'
import { 
  BaseScenario, 
  TeenScenario, 
  AdultScenario, 
  TeenOption,
  AdultOption,
  ScenarioProgress
} from '@/types/scenarios'

// Base component props with strict typing
export interface ComponentProps {
  className?: string
  children?: ReactNode
}

// Component props with strict typing
export interface ScenarioCardProps extends ComponentProps {
  scenario: BaseScenario
  showDetails?: boolean
  onStart?: () => void
}

export interface TeenOptionCardProps extends ComponentProps {
  option: TeenOption
  index: number
  isSelected: boolean
  showResult: boolean
  onSelect: () => void
}

export interface AdultOptionCardProps extends ComponentProps {
  option: AdultOption
  index: number
  isSelected: boolean
  showResult: boolean
  onSelect: () => void
}

export interface ProgressTrackerProps extends ComponentProps {
  current: number
  total: number
  points?: number
  maxPoints?: number
}

export interface ModuleLayoutProps extends ComponentProps {
  title: string
  description: string
  navigation?: ReactNode
}

export interface LoadingStateProps extends ComponentProps {
  isLoading: boolean
  error?: Error | null
  fallback?: ReactNode
}

export interface ErrorBoundaryProps extends ComponentProps {
  fallback: ComponentType<{ error: Error }>
  children: ReactNode
}

// Hook return types
export interface UseScenarioProgressReturn extends ScenarioProgress {
  selectOption: (index: number) => void
  nextScenario: () => void
  resetModule: () => void
}

export interface UseModuleStateReturn<T extends BaseScenario = BaseScenario> {
  scenarios: T[]
  progress: UseScenarioProgressReturn
  isLoading: boolean
  error: Error | null
  retryOnError: () => void
}

// Teen module specific component props
export interface PlatformPostProps extends ComponentProps {
  type: 'text' | 'image' | 'video' | 'link'
  content: string
  author: string
  scenario: TeenScenario
}

// Adult module specific component props
export interface StakeholderListProps extends ComponentProps {
  stakeholders: string[]
  scenario: AdultScenario
}

export interface LegalContextProps extends ComponentProps {
  scenario: AdultScenario
}

// Navigation and layout types
export interface NavigationProps extends ComponentProps {
  currentStep: number
  totalSteps: number
  canGoNext: boolean
  canGoPrevious: boolean
  onNext: () => void
  onPrevious: () => void
}

// Event handlers with proper typing
export interface ScenarioEventHandlers {
  onOptionSelect: (scenarioId: number, optionIndex: number) => void
  onScenarioComplete: (scenarioId: number, score: number) => void
  onModuleComplete: (totalScore: number) => void
  onError: (error: Error) => void
}

// Result display component props
export interface TeenResultDisplayProps extends ComponentProps {
  scenario: TeenScenario
  selectedOption: TeenOption
  points: number
  showBadges?: boolean
}

export interface AdultResultDisplayProps extends ComponentProps {
  scenario: AdultScenario
  selectedOption: AdultOption
  showImpactAnalysis?: boolean
}

// Completion screen props
export interface CompletionScreenProps extends ComponentProps {
  totalScore: number
  maxScore: number
  scenarios: BaseScenario[]
  badges: string[]
  onRestart: () => void
  onContinue?: () => void
}