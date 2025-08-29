import { useState, useEffect, useCallback } from 'react'
import { BadgeInfo } from '@/types/scenarios'

// Local storage key for earned badges
const EARNED_BADGES_KEY = 'clean-media-earned-badges'

export interface EarnedBadge {
  name: string
  earnedAt: string // ISO date string
  badgeInfo: BadgeInfo
}

export function useBadgePersistence() {
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load earned badges from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(EARNED_BADGES_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as EarnedBadge[]
        setEarnedBadges(parsed)
      }
    } catch (error) {
      console.error('Failed to load earned badges:', error)
      // Clear corrupted data
      localStorage.removeItem(EARNED_BADGES_KEY)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save earned badges to localStorage
  const saveBadges = useCallback((badges: EarnedBadge[]) => {
    try {
      localStorage.setItem(EARNED_BADGES_KEY, JSON.stringify(badges))
    } catch (error) {
      console.error('Failed to save earned badges:', error)
    }
  }, [])

  // Award a new badge
  const awardBadge = useCallback((badgeInfo: BadgeInfo) => {
    const newBadge: EarnedBadge = {
      name: badgeInfo.name,
      earnedAt: new Date().toISOString(),
      badgeInfo
    }

    setEarnedBadges(prev => {
      // Check if badge already exists
      const exists = prev.some(badge => badge.name === badgeInfo.name)
      if (exists) {
        console.log(`Badge "${badgeInfo.name}" already earned`)
        return prev
      }

      const updated = [...prev, newBadge]
      saveBadges(updated)
      return updated
    })

    return newBadge
  }, [saveBadges])

  // Check if a badge has been earned
  const hasBadge = useCallback((badgeName: string) => {
    return earnedBadges.some(badge => badge.name === badgeName)
  }, [earnedBadges])

  // Get a specific earned badge
  const getBadge = useCallback((badgeName: string) => {
    return earnedBadges.find(badge => badge.name === badgeName)
  }, [earnedBadges])

  // Remove a badge (for testing or admin purposes)
  const removeBadge = useCallback((badgeName: string) => {
    setEarnedBadges(prev => {
      const updated = prev.filter(badge => badge.name !== badgeName)
      saveBadges(updated)
      return updated
    })
  }, [saveBadges])

  // Clear all badges (for testing or reset purposes)
  const clearAllBadges = useCallback(() => {
    setEarnedBadges([])
    localStorage.removeItem(EARNED_BADGES_KEY)
  }, [])

  // Get badges sorted by earned date (newest first)
  const getBadgesSorted = useCallback(() => {
    return [...earnedBadges].sort((a, b) => 
      new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime()
    )
  }, [earnedBadges])

  // Get badge statistics
  const getBadgeStats = useCallback(() => {
    return {
      totalEarned: earnedBadges.length,
      latestBadge: earnedBadges.length > 0 ? getBadgesSorted()[0] : null,
      badgeNames: earnedBadges.map(badge => badge.name)
    }
  }, [earnedBadges, getBadgesSorted])

  return {
    earnedBadges,
    isLoading,
    awardBadge,
    hasBadge,
    getBadge,
    removeBadge,
    clearAllBadges,
    getBadgesSorted,
    getBadgeStats
  }
}