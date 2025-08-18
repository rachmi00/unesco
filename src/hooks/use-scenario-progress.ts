import { useState, useCallback } from "react"
import { ScenarioProgress } from "@/types/scenarios"

export interface UseScenarioProgressReturn extends ScenarioProgress {
  selectOption: (index: number) => void
  nextScenario: () => void
  resetModule: () => void
  goToScenario: (index: number) => void
  addPoints: (points: number) => void
}

export function useScenarioProgress(totalScenarios: number): UseScenarioProgressReturn {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [totalPoints, setTotalPoints] = useState(0)
  const [scenarioPoints, setScenarioPoints] = useState<Record<number, number>>({})
  const [completed, setCompleted] = useState(false)

  const selectOption = useCallback((index: number) => {
    setSelectedOption(index)
    setShowResult(true)
  }, [])

  const nextScenario = useCallback(() => {
    if (currentScenario < totalScenarios - 1) {
      setCurrentScenario(prev => prev + 1)
      setSelectedOption(null)
      setShowResult(false)
    } else {
      setCompleted(true)
    }
  }, [currentScenario, totalScenarios])

  const resetModule = useCallback(() => {
    setCurrentScenario(0)
    setSelectedOption(null)
    setShowResult(false)
    setTotalPoints(0)
    setScenarioPoints({})
    setCompleted(false)
  }, [])

  const goToScenario = useCallback((index: number) => {
    if (index >= 0 && index < totalScenarios) {
      // If moving backwards, remove points from scenarios that are now "ahead"
      if (index < currentScenario) {
        const newScenarioPoints = { ...scenarioPoints }
        let pointsToSubtract = 0
        for (let i = index; i < currentScenario; i++) {
          if (newScenarioPoints[i] !== undefined) {
            pointsToSubtract += newScenarioPoints[i]
            delete newScenarioPoints[i]
          }
        }
        setScenarioPoints(newScenarioPoints)
        setTotalPoints(prev => prev - pointsToSubtract)
      }
      setCurrentScenario(index)
      setSelectedOption(null)
      setShowResult(false)
    }
  }, [totalScenarios, currentScenario, scenarioPoints])

  const addPoints = useCallback((points: number) => {
    // Only add points if they haven't been added for this scenario yet
    if (scenarioPoints[currentScenario] === undefined) {
      setTotalPoints(prev => prev + points)
      setScenarioPoints(prev => ({ ...prev, [currentScenario]: points }))
    }
  }, [currentScenario, scenarioPoints])

  return {
    currentScenario,
    selectedOption,
    showResult,
    totalPoints,
    scenarioPoints,
    completed,
    selectOption,
    nextScenario,
    resetModule,
    goToScenario,
    addPoints
  }
}