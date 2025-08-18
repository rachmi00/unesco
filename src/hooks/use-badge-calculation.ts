import { useMemo } from "react"
import { ScenarioService } from "@/lib/services/scenario-service"
import { BadgeInfo } from "@/types/scenarios"

export interface UseBadgeCalculationReturn {
  currentBadge: BadgeInfo
  nextBadge: BadgeInfo | null
  progressToNextBadge: number
  badgePercentage: number
}

export function useBadgeCalculation(
  points: number,
  maxPoints: number,
  moduleType: 'teen' | 'adult'
): UseBadgeCalculationReturn {
  
  const badges = useMemo(() => {
    const thresholds = [90, 75, 60, 0]
    return thresholds.map(threshold => ({
      threshold,
      badge: ScenarioService.calculateBadgeLevel(
        Math.ceil((threshold / 100) * maxPoints), 
        maxPoints, 
        moduleType
      )
    }))
  }, [maxPoints, moduleType])

  const currentPercentage = (points / maxPoints) * 100

  const currentBadge = useMemo(() => {
    const badge = badges.find(b => currentPercentage >= b.threshold)
    return badge?.badge || badges[badges.length - 1].badge
  }, [badges, currentPercentage])

  const nextBadge = useMemo(() => {
    const nextBadgeData = badges.find(b => b.threshold > currentPercentage)
    return nextBadgeData?.badge || null
  }, [badges, currentPercentage])

  const progressToNextBadge = useMemo(() => {
    if (!nextBadge) return 100 // Already at highest badge
    
    const nextThreshold = badges.find(b => b.badge === nextBadge)?.threshold || 100
    const currentThreshold = badges.find(b => b.badge === currentBadge)?.threshold || 0
    
    if (nextThreshold === currentThreshold) return 100
    
    const progress = ((currentPercentage - currentThreshold) / (nextThreshold - currentThreshold)) * 100
    return Math.max(0, Math.min(100, progress))
  }, [badges, currentBadge, nextBadge, currentPercentage])

  return {
    currentBadge,
    nextBadge,
    progressToNextBadge,
    badgePercentage: currentPercentage
  }
}

export function useTeenBadgeCalculation(points: number, maxPoints: number) {
  return useBadgeCalculation(points, maxPoints, 'teen')
}

export function useAdultBadgeCalculation(points: number, maxPoints: number) {
  return useBadgeCalculation(points, maxPoints, 'adult')
}