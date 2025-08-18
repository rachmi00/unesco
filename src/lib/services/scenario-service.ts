import { TeenScenario, AdultScenario } from "@/types/scenarios"
import { teenScenarios } from "@/lib/data/teen-scenarios"
import { adultScenarios } from "@/lib/data/adult-scenarios"
import { validateTeenScenario, validateAdultScenario, validateScenarioArray } from "@/lib/data/validation"

export class ScenarioService {
  /**
   * Get all teen scenarios with validation
   */
  static getTeenScenarios(): TeenScenario[] {
    return validateScenarioArray(teenScenarios, validateTeenScenario)
  }

  /**
   * Get all adult scenarios with validation
   */
  static getAdultScenarios(): AdultScenario[] {
    return validateScenarioArray(adultScenarios, validateAdultScenario)
  }

  /**
   * Get a specific teen scenario by ID
   */
  static getTeenScenarioById(id: number): TeenScenario | null {
    const scenarios = this.getTeenScenarios()
    return scenarios.find(scenario => scenario.id === id) || null
  }

  /**
   * Get a specific adult scenario by ID
   */
  static getAdultScenarioById(id: number): AdultScenario | null {
    const scenarios = this.getAdultScenarios()
    return scenarios.find(scenario => scenario.id === id) || null
  }

  /**
   * Get scenario count for a module
   */
  static getScenarioCount(type: 'teen' | 'adult'): number {
    return type === 'teen' ? this.getTeenScenarios().length : this.getAdultScenarios().length
  }

  /**
   * Get maximum possible points for a module
   */
  static getMaxPoints(type: 'teen' | 'adult'): number {
    return this.getScenarioCount(type) * 4 // 4 points max per scenario
  }

  /**
   * Calculate badge level based on points and module type
   */
  static calculateBadgeLevel(points: number, maxPoints: number, type: 'teen' | 'adult') {
    const percentage = (points / maxPoints) * 100
    
    if (type === 'teen') {
      if (percentage >= 90) return { name: "Digital Rights Defender", icon: "Shield", color: "text-blue-600" }
      if (percentage >= 75) return { name: "Media Literacy Leader", icon: "Users", color: "text-green-600" }
      if (percentage >= 60) return { name: "Awareness Builder", icon: "AlertTriangle", color: "text-orange-600" }
      return { name: "Learning Digital Citizenship", icon: "Scale", color: "text-gray-600" }
    } else {
      if (percentage >= 90) return { name: "Ethics Champion", icon: "Award", color: "text-blue-600" }
      if (percentage >= 75) return { name: "Professional Leader", icon: "Shield", color: "text-green-600" }
      if (percentage >= 60) return { name: "Responsible Citizen", icon: "CheckCircle", color: "text-orange-600" }
      return { name: "Building Awareness", icon: "BookOpen", color: "text-gray-600" }
    }
  }
}