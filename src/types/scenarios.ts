// Core scenario types and interfaces

export type PlatformType = "tiktok" | "instagram" | "whatsapp" | "youtube" | "twitter" | "facebook"
export type AdultCategory = "workplace" | "community" | "political" | "media" | "business"
export type ImpactLevel = "positive" | "neutral" | "negative"

export interface PlatformDetails {
  followers?: string
  likes?: string
  views?: string
  shares?: string
  comments?: string
}

export interface BaseScenario {
  id: number
  title: string
  context: string
  question: string
  realWorldContext?: string
}

export interface TeenOption {
  text: string
  points: number
  consequence: string
  explanation: string
  legalRisk?: string
}

export interface AdultOption {
  text: string
  impact: ImpactLevel
  consequences: string[]
  explanation: string
  legalNote: string
  professionalRisk?: string
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

export interface ModuleState<T> {
  scenarios: T[]
  progress: ScenarioProgress
  actions: {
    selectOption: (index: number) => void
    nextScenario: () => void
    resetModule: () => void
  }
}

import React from 'react';

// ... existing code ...

export interface BadgeInfo {
  name: string;
  // Icons are provided as either a React component (ElementType) or
  // a short identifier string from the service. Accept both to avoid
  // brittle conversions at the call site.
  icon: React.ElementType | string;
  color: string;
}