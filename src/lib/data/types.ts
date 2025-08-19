// Extended types for data handling and UI state

import { ReactNode, ComponentType } from 'react'

// Base component props with strict typing
export interface ComponentProps {
  className?: string
  children?: ReactNode
}

// Core data models with proper typing
export interface Scenario {
  id: string | number
  title: string
  description: string
  options: Option[]
  context?: string
  metadata?: Record<string, unknown>
}

export interface Option {
  id: string | number
  text: string
  points: number
  feedback?: string
  isCorrect?: boolean
  explanation?: string
}

// Component props with strict typing
export interface ScenarioCardProps extends ComponentProps {
  scenario: Scenario
  showDetails?: boolean
}

export interface OptionCardProps extends ComponentProps {
  option: Option
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

// State management types with proper return type definitions
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

export interface UseModuleStateReturn<T extends Scenario = Scenario> {
  scenarios: T[]
  progress: UseScenarioProgressReturn
  isLoading: boolean
  error: Error | null
}

// Platform-specific types with proper structure
export interface PlatformDetails {
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'tiktok' | string
  timestamp?: string
  engagement?: {
    likes?: number
    shares?: number
    comments?: number
  }
  visibility?: 'public' | 'private' | 'friends' | string
}

export interface PlatformPostProps extends ComponentProps {
  type: 'text' | 'image' | 'video' | 'link' | string
  content: string
  author: string
  platformDetails: PlatformDetails
}

export interface StakeholderListProps extends ComponentProps {
  stakeholders: Array<{
    name: string
    role: string
    impact?: 'high' | 'medium' | 'low'
    description?: string
  }>
}

export interface LegalContextProps extends ComponentProps {
  legalContext: string
  historicalContext: string
  jurisdiction?: string
  relevantLaws?: string[]
  precedents?: Array<{
    case: string
    year: number
    summary: string
  }>
}

// Utility types for better type safety
export type ScenarioStatus = 'not-started' | 'in-progress' | 'completed'
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'
export type ModuleType = 'ethics' | 'legal' | 'social-media' | 'stakeholder-analysis'

// Enhanced module configuration
export interface ModuleConfig {
  id: string
  title: string
  description: string
  type: ModuleType
  difficulty: DifficultyLevel
  estimatedTime: number // in minutes
  prerequisites?: string[]
  maxPoints: number
}

// Event handlers with proper typing
export interface ScenarioEventHandlers {
  onOptionSelect: (scenarioId: string | number, optionId: string | number) => void
  onScenarioComplete: (scenarioId: string | number, score: number) => void
  onModuleComplete: (moduleId: string, totalScore: number) => void
  onError: (error: Error) => void
}

// API response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  timestamp: string
}

export type ScenarioApiResponse = ApiResponse<Scenario[]>

// Form validation types
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: unknown) => boolean | string
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio'
  validation?: ValidationRule
  options?: Array<{ value: string; label: string }>
}

// Analytics and tracking types
export interface UserInteraction {
  type: 'click' | 'select' | 'complete' | 'error'
  elementId: string
  timestamp: Date
  metadata?: Record<string, unknown>
}

export interface PerformanceMetrics {
  moduleId: string
  userId?: string
  startTime: Date
  endTime?: Date
  score: number
  attempts: number
  timeSpent: number // in seconds
}