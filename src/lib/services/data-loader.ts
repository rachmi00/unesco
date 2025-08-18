import { TeenScenario, AdultScenario } from "@/types/scenarios"
import { ScenarioService } from "./scenario-service"

export interface DataLoadResult<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}

/**
 * Async data loader for scenarios with error handling
 */
export class DataLoader {
  /**
   * Load teen scenarios with error handling
   */
  static async loadTeenScenarios(): Promise<DataLoadResult<TeenScenario[]>> {
    try {
      // Simulate async loading (in case we add API calls later)
      await new Promise(resolve => setTimeout(resolve, 0))
      
      const data = ScenarioService.getTeenScenarios()
      
      if (data.length === 0) {
        throw new Error("No teen scenarios found")
      }
      
      return {
        data,
        isLoading: false,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Failed to load teen scenarios")
      }
    }
  }

  /**
   * Load adult scenarios with error handling
   */
  static async loadAdultScenarios(): Promise<DataLoadResult<AdultScenario[]>> {
    try {
      // Simulate async loading (in case we add API calls later)
      await new Promise(resolve => setTimeout(resolve, 0))
      
      const data = ScenarioService.getAdultScenarios()
      
      if (data.length === 0) {
        throw new Error("No adult scenarios found")
      }
      
      return {
        data,
        isLoading: false,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Failed to load adult scenarios")
      }
    }
  }

  /**
   * Preload all scenario data
   */
  static async preloadAllScenarios(): Promise<{
    teens: DataLoadResult<TeenScenario[]>
    adults: DataLoadResult<AdultScenario[]>
  }> {
    const [teens, adults] = await Promise.all([
      this.loadTeenScenarios(),
      this.loadAdultScenarios()
    ])

    return { teens, adults }
  }
}