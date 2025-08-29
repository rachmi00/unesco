/**
 * Performance optimization utilities for the story module
 */

import { useCallback, useMemo } from 'react'
import { StoryData } from '@/types/story'

/**
 * Memoized story data processing
 */
export const useOptimizedStoryData = (storyData: StoryData) => {
  return useMemo(() => {
    // Pre-process story data for faster access
    const sceneIds = Object.keys(storyData)
    const endingScenes = sceneIds.filter(id => storyData[id] && storyData[id].isEnding)
    const choiceScenes = sceneIds.filter(id => storyData[id] && storyData[id].choices && storyData[id].choices!.length > 0)
    
    return {
      storyData,
      sceneIds,
      endingScenes,
      choiceScenes,
      totalScenes: sceneIds.length
    }
  }, [storyData])
}

/**
 * Optimized scene transition handler
 */
export const useOptimizedSceneTransition = (onTransition: (sceneId: string) => void) => {
  return useCallback((sceneId: string) => {
    // Use requestAnimationFrame for smooth transitions
    requestAnimationFrame(() => {
      onTransition(sceneId)
    })
  }, [onTransition])
}

/**
 * Image preloader for story scenes
 */
export const preloadStoryImages = (storyData: StoryData): Promise<void[]> => {
  const imageUrls = Object.values(storyData)
    .map(scene => scene.image)
    .filter(Boolean)
  
  const preloadPromises = imageUrls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
      img.src = url
    })
  })
  
  return Promise.all(preloadPromises)
}

/**
 * Debounced choice selection to prevent rapid clicking
 */
export const useDebouncedChoiceSelection = <T>(
  onSelect: (choice: T) => void,
  delay: number = 300
) => {
  return useCallback(
    (choice: T) => {
      const debouncedFn = debounce((c: T) => onSelect(c), delay)
      debouncedFn(choice)
    },
    [onSelect, delay]
  )
}

/**
 * Simple debounce implementation
 */
function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

/**
 * Memory-efficient story progress tracking
 */
interface StoryProgress {
  currentSceneId: string
  visitedScenes: string[]
  startTime: number
  lastInteraction: number
}

export class StoryProgressTracker {
  private static instance: StoryProgressTracker
  private progress: Map<string, StoryProgress> = new Map()
  
  static getInstance(): StoryProgressTracker {
    if (!StoryProgressTracker.instance) {
      StoryProgressTracker.instance = new StoryProgressTracker()
    }
    return StoryProgressTracker.instance
  }
  
  setProgress(storyId: string, progress: StoryProgress): void {
    this.progress.set(storyId, progress)
  }
  
  getProgress(storyId: string): StoryProgress | undefined {
    return this.progress.get(storyId)
  }
  
  clearProgress(storyId: string): void {
    this.progress.delete(storyId)
  }
  
  clearAllProgress(): void {
    this.progress.clear()
  }
}

/**
 * Performance monitoring for story interactions
 */
export const measureStoryPerformance = (actionName: string, action: () => void) => {
  const startTime = performance.now()
  
  action()
  
  const endTime = performance.now()
  const duration = endTime - startTime
  
  // Log performance in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Story ${actionName} took ${duration.toFixed(2)}ms`)
  }
  
  return duration
}