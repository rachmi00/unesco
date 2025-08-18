export interface ModuleProgress {
  completed: boolean
  score?: number
  maxScore?: number
  completedAt?: string
  badge?: string
}

export interface UserProgress {
  teens: ModuleProgress
  adults: ModuleProgress
  totalModulesCompleted: number
  overallCompletionPercentage: number
}

const STORAGE_KEY = "mil-app-progress"

export const getStoredProgress = (): UserProgress => {
  if (typeof window === "undefined") {
    return getDefaultProgress()
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("Error reading progress from localStorage:", error)
  }

  return getDefaultProgress()
}

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error("Error saving progress to localStorage:", error)
  }
}

export const updateModuleProgress = (module: "teens" | "adults", moduleProgress: ModuleProgress): UserProgress => {
  const currentProgress = getStoredProgress()
  const updatedProgress = {
    ...currentProgress,
    [module]: moduleProgress,
  }

  const modules = [updatedProgress.teens, updatedProgress.adults]
  updatedProgress.totalModulesCompleted = modules.filter((m) => m.completed).length
  updatedProgress.overallCompletionPercentage = (updatedProgress.totalModulesCompleted / 2) * 100

  saveProgress(updatedProgress)
  return updatedProgress
}

export const getDefaultProgress = (): UserProgress => ({
  teens: { completed: false },
  adults: { completed: false },
  totalModulesCompleted: 0,
  overallCompletionPercentage: 0,
})

export const resetProgress = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}
