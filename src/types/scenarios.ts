// Core scenario types and interfaces

import { ADULT_CATEGORY_CONFIGS, PLATFORM_CONFIGS } from "@/lib/data/constants";

// Platform and category types derived from constants
export type PlatformType = keyof typeof PLATFORM_CONFIGS;
export type AdultCategory = keyof typeof ADULT_CATEGORY_CONFIGS;

// Impact and difficulty levels
export type ImpactLevel = "positive" | "neutral" | "negative"
export type DifficultyLevel = "beginner" | "intermediate" | "advanced"
export type ScenarioStatus = "not-started" | "in-progress" | "completed"

export interface PlatformDetails {
  followers?: string
  likes?: string
  views?: string
  shares?: string
  comments?: string
  timestamp?: string
  visibility?: "public" | "private" | "friends"
}

export interface BaseScenario {
  id: number
  title: string
  context: string
  question: string
  realWorldContext?: string
  difficulty?: DifficultyLevel
  estimatedTime?: number // in minutes
  tags?: string[]
}

export interface BaseOption {
  id: string | number
  text: string
  explanation: string
  isRecommended?: boolean
}

export interface TeenOption extends BaseOption {
  points: number
  consequence: string
  legalRisk?: string
  socialImpact?: string
}

export interface AdultOption extends BaseOption {
  impact: ImpactLevel
  consequences: string[]
  legalNote: string
  professionalRisk?: string
  stakeholderImpact?: Record<string, ImpactLevel>
}

export interface TeenScenario extends BaseScenario {
  type: PlatformType
  content: string
  author: string
  platform_details: PlatformDetails
  options: TeenOption[]
}

export interface AdultScenario extends BaseScenario {
  category: AdultCategory
  situation: string
  stakeholders: string[]
  legalContext: string
  historicalContext: string
  options: AdultOption[]
}

export interface ScenarioProgress {
  currentScenario: number;
  selectedOption: number | null;
  showResult: boolean;
  totalPoints: number;
  scenarioPoints: Record<number, number>;
  completed: boolean;
}

export interface ModuleState<T extends BaseScenario> {
  scenarios: T[]
  progress: ScenarioProgress
  isLoading: boolean
  error: Error | null
  actions: {
    selectOption: (index: number) => void
    nextScenario: () => void
    resetModule: () => void
    retryOnError: () => void
  }
}

// Badge and achievement system
export interface BadgeInfo {
  id: string
  name: string
  description: string
  icon: React.ElementType | string
  color: string
  criteria: {
    minScore?: number
    completedScenarios?: number
    perfectScores?: number
    timeLimit?: number
  }
}

export interface UserAchievement {
  badgeId: string
  earnedAt: Date
  score: number
  metadata?: Record<string, unknown>
}

// Validation schemas
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export interface ScenarioValidation {
  validateScenario: (scenario: BaseScenario) => ValidationResult
  validateOption: (option: BaseOption) => ValidationResult
  validateProgress: (progress: ScenarioProgress) => ValidationResult
}

// Module configuration
export interface ModuleConfig {
  id: string
  title: string
  description: string
  type: "teen" | "adult"
  maxPoints: number
  passingScore: number
  badges: BadgeInfo[]
  prerequisites?: string[]
}

import React from 'react';