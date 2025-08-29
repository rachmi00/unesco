import { renderHook, act } from '@testing-library/react'
import { useBadgePersistence } from '../useBadgePersistence'
import { BadgeInfo } from '@/types/scenarios'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('useBadgePersistence Hook', () => {
  const mockBadge: BadgeInfo = {
    name: 'Cycle Breaker Badge',
    icon: 'ShieldCheck',
    color: 'from-green-500 to-emerald-600'
  }

  const mockBadge2: BadgeInfo = {
    name: 'Peacemaker Award',
    icon: 'Award',
    color: 'from-blue-500 to-indigo-600'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  describe('Initialization', () => {
    it('initializes with empty badges when localStorage is empty', () => {
      const { result } = renderHook(() => useBadgePersistence())
      
      expect(result.current.earnedBadges).toEqual([])
      expect(result.current.isLoading).toBe(false)
    })

    it('loads existing badges from localStorage', () => {
      const existingBadges = [
        {
          name: 'Cycle Breaker Badge',
          earnedAt: '2024-01-01T00:00:00.000Z',
          badgeInfo: mockBadge
        }
      ]
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(existingBadges))
      
      const { result } = renderHook(() => useBadgePersistence())
      
      expect(result.current.earnedBadges).toEqual(existingBadges)
      expect(localStorageMock.getItem).toHaveBeenCalledWith('clean-media-earned-badges')
    })

    it('handles corrupted localStorage data gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json')
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      const { result } = renderHook(() => useBadgePersistence())
      
      expect(result.current.earnedBadges).toEqual([])
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('clean-media-earned-badges')
      expect(consoleSpy).toHaveBeenCalledWith('Failed to load earned badges:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })
  })

  describe('Badge Awarding', () => {
    it('awards a new badge successfully', () => {
      const { result } = renderHook(() => useBadgePersistence())
      
      act(() => {
        const earnedBadge = result.current.awardBadge(mockBadge)
        
        expect(earnedBadge.name).toBe(mockBadge.name)
        expect(earnedBadge.badgeInfo).toBe(mockBadge)
        expect(earnedBadge.earnedAt).toBeDefined()
        expect(new Date(earnedBadge.earnedAt)).toBeInstanceOf(Date)
      })
      
      expect(result.current.earnedBadges).toHaveLength(1)
      expect(result.current.earnedBadges[0].name).toBe(mockBadge.name)
    })

    it('prevents duplicate badge awards', () => {
      const { result } = renderHook(() => useBadgePersistence())
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      
      act(() => {
        result.current.awardBadge(mockBadge)
        result.current.awardBadge(mockBadge) // Try to award same badge again
      })
      
      expect(result.current.earnedBadges).toHaveLength(1)
      expect(consoleSpy).toHaveBeenCalledWith('Badge "Cycle Breaker Badge" already earned')
      
      consoleSpy.mockRestore()
    })

    it('saves badges to localStorage when awarded', () => {
      const { result } = renderHook(() => useBadgePersistence())
      
      act(() => {
        result.current.awardBadge(mockBadge)
      })
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'clean-media-earned-badges',
        expect.stringContaining(mockBadge.name)
      )
    })

    it('handles localStorage save errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded')
      })
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      const { result } = renderHook(() => useBadgePersistence())
      
      act(() => {
        result.current.awardBadge(mockBadge)
      })
      
      // Badge should still be added to state even if save fails
      expect(result.current.earnedBadges).toHaveLength(1)
      expect(consoleSpy).toHaveBeenCalledWith('Failed to save earned badges:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })
  })

  describe('Badge Queries', () => {
    it('checks if badge has been earned correctly', () => {
      const { result } = renderHook(() => useBadgePersistence())
      
      act(() => {
        result.current.awardBadge(mockBadge)
      })
      
      expect(result.current.hasBadge('Cycle Breaker Badge')).toBe(true)
      expect(result.current.hasBadge('Nonexistent Badge')).toBe(false)
    })

    it('retrieves specific earned badge', () => {
      const { result } = renderHook(() => useBadgePersistence())
      
      act(() => {
        result.current.awardBadge(mockBadge)
      })
      
      const retrievedBadge = result.current.getBadge('Cycle Breaker Badge')
      expect(retrievedBadge).toBeDefined()
      expect(retrievedBadge?.name).toBe(mockBadge.name)
      
      const nonexistentBadge = result.current.getBadge('Nonexistent Badge')
      expect(nonexistentBadge).toBeUndefined()
    })

    it('returns badges sorted by earned date', async () => {
      const { result } = renderHook(() => useBadgePersistence())
      
      act(() => {
        result.current.awardBadge(mockBadge)
      })
      
      // Wait a bit to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 10))
      
      act(() => {
        result.current.awardBadge(mockBadge2)
      })
      
      const sortedBadges = result.current.getBadgesSorted()
      expect(sortedBadges).toHaveLength(2)
      
      // Most recent should be first
      const firstBadgeTime = new Date(sortedBadges[0].earnedAt).getTime()
      const secondBadgeTime = new Date(sortedBadges[1].earnedAt).getTime()
      expect(firstBadgeTime).toBeGreaterThanOrEqual(secondBadgeTime)
    })

    it('provides accurate badge statistics', () => {
      const { result } = renderHook(() => useBadgePersistence())
      
      // Initially no badges
      let stats = result.current.getBadgeStats()
      expect(stats.totalEarned).toBe(0)
      expect(stats.latestBadge).toBeNull()
      expect(stats.badgeNames).toEqual([])
      
      act(() => {
        result.current.awardBadge(mockBadge)
        result.current.awardBadge(mockBadge2)
      })
      
      stats = result.current.getBadgeStats()
      expect(stats.totalEarned).toBe(2)
      expect(stats.latestBadge).toBeDefined()
      expect(stats.badgeNames).toContain(mockBadge.name)
      expect(stats.badgeNames).toContain(mockBadge2.name)
    })
  })

  describe('Badge Management', () => {
    it('removes specific badge successfully', () => {
      const { result } = renderHook(() => useBadgePersistence())
      
      act(() => {
        result.current.awardBadge(mockBadge)
        result.current.awardBadge(mockBadge2)
      })
      
      expect(result.current.earnedBadges).toHaveLength(2)
      
      act(() => {
        result.current.removeBadge(mockBadge.name)
      })
      
      expect(result.current.earnedBadges).toHaveLength(1)
      expect(result.current.hasBadge(mockBadge.name)).toBe(false)
      expect(result.current.hasBadge(mockBadge2.name)).toBe(true)
    })

    it('clears all badges successfully', () => {
      const { result } = renderHook(() => useBadgePersistence())
      
      act(() => {
        result.current.awardBadge(mockBadge)
        result.current.awardBadge(mockBadge2)
      })
      
      expect(result.current.earnedBadges).toHaveLength(2)
      
      act(() => {
        result.current.clearAllBadges()
      })
      
      expect(result.current.earnedBadges).toHaveLength(0)
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('clean-media-earned-badges')
    })

    it('updates localStorage when removing badges', () => {
      const { result } = renderHook(() => useBadgePersistence())
      
      act(() => {
        result.current.awardBadge(mockBadge)
        result.current.awardBadge(mockBadge2)
      })
      
      act(() => {
        result.current.removeBadge(mockBadge.name)
      })
      
      // Should save updated list to localStorage
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'clean-media-earned-badges',
        expect.not.stringContaining(mockBadge.name)
      )
    })
  })

  describe('Edge Cases', () => {
    it('handles empty badge name gracefully', () => {
      const { result } = renderHook(() => useBadgePersistence())
      
      const emptyBadge: BadgeInfo = {
        name: '',
        icon: 'ShieldCheck',
        color: 'from-gray-500 to-gray-600'
      }
      
      act(() => {
        result.current.awardBadge(emptyBadge)
      })
      
      expect(result.current.earnedBadges).toHaveLength(1)
      expect(result.current.hasBadge('')).toBe(true)
    })

    it('handles removing nonexistent badge gracefully', () => {
      const { result } = renderHook(() => useBadgePersistence())
      
      act(() => {
        result.current.awardBadge(mockBadge)
      })
      
      const initialLength = result.current.earnedBadges.length
      
      act(() => {
        result.current.removeBadge('Nonexistent Badge')
      })
      
      expect(result.current.earnedBadges).toHaveLength(initialLength)
    })

    it('maintains data integrity across multiple operations', () => {
      const { result } = renderHook(() => useBadgePersistence())
      
      // Perform multiple operations
      act(() => {
        result.current.awardBadge(mockBadge)
        result.current.awardBadge(mockBadge2)
        result.current.removeBadge(mockBadge.name)
        result.current.awardBadge(mockBadge) // Re-award
      })
      
      expect(result.current.earnedBadges).toHaveLength(2)
      expect(result.current.hasBadge(mockBadge.name)).toBe(true)
      expect(result.current.hasBadge(mockBadge2.name)).toBe(true)
    })
  })
})