// Extended types for data handling and UI state

export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ScenarioCardProps extends ComponentProps {
  scenario: any
  showDetails?: boolean
}

export interface OptionCardProps extends ComponentProps {
  option: any
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
  navigation?: React.ReactNode
}

export interface LoadingStateProps extends ComponentProps {
  isLoading: boolean
  error?: Error
  fallback?: React.ReactNode
}

export interface ErrorBoundaryProps extends ComponentProps {
  fallback: React.ComponentType<{error: Error}>
}

// State management types
export interface UseScenarioProgressReturn {
  currentScenario: number
  selectedOption: number | null
  showResult: boolean
  totalPoints: number
  scenarioPoints: number[]
  completed: boolean
  selectOption: (index: number) => void
  nextScenario: () => void
  resetModule: () => void
}

export interface UseModuleStateReturn<T> {
  scenarios: T[]
  progress: UseScenarioProgressReturn
  isLoading: boolean
  error: Error | null
}

// Platform and category specific types
export interface PlatformPostProps extends ComponentProps {
  type: string
  content: string
  author: string
  platformDetails: any
}

export interface StakeholderListProps extends ComponentProps {
  stakeholders: string[]
}

export interface LegalContextProps extends ComponentProps {
  legalContext: string
  historicalContext: string
}