import { useCallback } from "react"

export interface UseScenarioNavigationReturn {
  canGoNext: boolean
  canGoPrevious: boolean
  goNext: () => void
  goPrevious: () => void
  goToScenario: (index: number) => void
  getProgressPercentage: () => number
}

export function useScenarioNavigation(
  currentScenario: number,
  totalScenarios: number,
  selectedOption: number | null,
  onNext: () => void,
  onGoToScenario: (index: number) => void,
  showResult: boolean,
): UseScenarioNavigationReturn {
  
  const canGoNext = selectedOption !== null && showResult
  const canGoPrevious = currentScenario > 0

  const goNext = useCallback(() => {
    if (canGoNext) {
      onNext()
    }
  }, [canGoNext, onNext])

  const goPrevious = useCallback(() => {
    if (canGoPrevious) {
      onGoToScenario(currentScenario - 1)
    }
  }, [canGoPrevious, currentScenario, onGoToScenario])

  const goToScenario = useCallback((index: number) => {
    if (index >= 0 && index < totalScenarios) {
      onGoToScenario(index)
    }
  }, [totalScenarios, onGoToScenario])

  const getProgressPercentage = useCallback(() => {
    return ((currentScenario + 1) / totalScenarios) * 100
  }, [currentScenario, totalScenarios])

  return {
    canGoNext,
    canGoPrevious,
    goNext,
    goPrevious,
    goToScenario,
    getProgressPercentage
  }
}