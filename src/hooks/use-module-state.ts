import { useState, useEffect, useCallback } from "react"
import { TeenScenario, AdultScenario } from "@/types/scenarios"
import { ScenarioService } from "@/lib/services/scenario-service"
import { updateModuleProgress } from "@/lib/progress-tracker"
import { useScenarioProgress } from "./use-scenario-progress"

export interface UseModuleStateReturn<T> {
  scenarios: T[]
  progress: ReturnType<typeof useScenarioProgress>
  isLoading: boolean
  error: Error | null
  handleOptionSelect: (optionIndex: number, points?: number) => void
  handleNext: () => void
  getCurrentScenario: () => T | null
  getMaxPoints: () => number
}

export function useTeenModuleState(): UseModuleStateReturn<TeenScenario> {
  const [scenarios, setScenarios] = useState<TeenScenario[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  const progress = useScenarioProgress(scenarios.length)

  useEffect(() => {
    try {
      const teenScenarios = ScenarioService.getTeenScenarios()
      setScenarios(teenScenarios)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load teen scenarios"))
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleOptionSelect = useCallback((optionIndex: number, points?: number) => {
    progress.selectOption(optionIndex)
    
    if (points !== undefined) {
      progress.addPoints(points)
    } else {
      // Get points from the current scenario option
      const currentScenario = scenarios[progress.currentScenario]
      if (currentScenario && currentScenario.options[optionIndex]) {
        progress.addPoints(currentScenario.options[optionIndex].points)
      }
    }
  }, [progress, scenarios]);

  const teenGetMaxPoints = useCallback(() => {
    return scenarios.length * 4; // 4 points max per scenario
  }, [scenarios.length]);

  const handleNext = useCallback(() => {
    if (progress.currentScenario < scenarios.length - 1) {
      progress.nextScenario();
    } else {
      // Module completed
      const maxPoints = teenGetMaxPoints();
      const badge = ScenarioService.calculateBadgeLevel(
        progress.totalPoints,
        maxPoints,
        "teen"
      );
      updateModuleProgress("teens", {
        completed: true,
        score: progress.totalPoints,
        maxScore: maxPoints,
        completedAt: new Date().toISOString(),
        badge: badge.name,
      });
      progress.nextScenario(); // This will set completed to true
    }
  }, [progress, scenarios.length, teenGetMaxPoints]);

  const getCurrentScenario = useCallback(() => {
    return scenarios[progress.currentScenario] || null;
  }, [scenarios, progress.currentScenario]);

  return {
    scenarios,
    progress,
    isLoading,
    error,
    handleOptionSelect,
    handleNext,
    getCurrentScenario,
    getMaxPoints: teenGetMaxPoints,
  };
}

export function useAdultModuleState(): UseModuleStateReturn<AdultScenario> {
  const [scenarios, setScenarios] = useState<AdultScenario[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  const progress = useScenarioProgress(scenarios.length)

  useEffect(() => {
    try {
      const adultScenarios = ScenarioService.getAdultScenarios()
      setScenarios(adultScenarios)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load adult scenarios"))
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleOptionSelect = useCallback((optionIndex: number, points?: number) => {
    progress.selectOption(optionIndex)
    
    // For adult scenarios, we calculate points based on impact
    const currentScenario = scenarios[progress.currentScenario]
    if (currentScenario && currentScenario.options[optionIndex]) {
      const option = currentScenario.options[optionIndex]
      let calculatedPoints = 0
      
      switch (option.impact) {
        case "positive":
          calculatedPoints = 4
          break
        case "neutral":
          calculatedPoints = 2
          break
        case "negative":
          calculatedPoints = 0
          break
      }
      
      progress.addPoints(points !== undefined ? points : calculatedPoints)
    }
  }, [progress, scenarios])

  const getMaxPoints = useCallback(() => {
    return scenarios.length * 4 // 4 points max per scenario
  }, [scenarios.length])

  const handleNext = useCallback(() => {
    if (progress.currentScenario < scenarios.length - 1) {
      progress.nextScenario()
    } else {
      // Module completed
      const badge = ScenarioService.calculateBadgeLevel(progress.totalPoints, getMaxPoints(), 'adult')
      updateModuleProgress("adults", {
        completed: true,
        score: progress.totalPoints,
        maxScore: getMaxPoints(),
        completedAt: new Date().toISOString(),
        badge: badge.name,
      })
      progress.nextScenario() // This will set completed to true
    }
  }, [progress, scenarios.length, getMaxPoints])

  const getCurrentScenario = useCallback(() => {
    return scenarios[progress.currentScenario] || null
  }, [scenarios, progress.currentScenario])


  return {
    scenarios,
    progress,
    isLoading,
    error,
    handleOptionSelect,
    handleNext,
    getCurrentScenario,
    getMaxPoints,
  }
}