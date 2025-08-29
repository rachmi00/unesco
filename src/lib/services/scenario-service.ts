import { TeenScenario, AdultScenario, BadgeInfo } from "@/types/scenarios"
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
  static calculateBadgeLevel(points: number, maxPoints: number, type: 'teen' | 'adult'): BadgeInfo {
    const percentage = (points / maxPoints) * 100
    
    if (type === 'teen') {
      if (percentage >= 90) return { 
        id: "digital-rights-defender",
        name: "Digital Rights Defender", 
        description: "Mastered digital rights and ethical online behavior",
        icon: "Shield", 
        color: "text-blue-600",
        criteria: { minScore: 90 }
      }
      if (percentage >= 75) return { 
        id: "media-literacy-leader",
        name: "Media Literacy Leader", 
        description: "Demonstrated strong media literacy skills",
        icon: "Users", 
        color: "text-green-600",
        criteria: { minScore: 75 }
      }
      if (percentage >= 60) return { 
        id: "awareness-builder",
        name: "Awareness Builder", 
        description: "Building awareness of digital citizenship",
        icon: "AlertTriangle", 
        color: "text-orange-600",
        criteria: { minScore: 60 }
      }
      return { 
        id: "learning-digital-citizenship",
        name: "Learning Digital Citizenship", 
        description: "Starting the journey of digital citizenship",
        icon: "Scale", 
        color: "text-gray-600",
        criteria: { minScore: 0 }
      }
    } else {
      if (percentage >= 90) return { 
        id: "ethics-champion",
        name: "Ethics Champion", 
        description: "Exemplary ethical leadership and decision-making",
        icon: "Award", 
        color: "text-blue-600",
        criteria: { minScore: 90 }
      }
      if (percentage >= 75) return { 
        id: "professional-leader",
        name: "Professional Leader", 
        description: "Strong professional ethics and leadership",
        icon: "Shield", 
        color: "text-green-600",
        criteria: { minScore: 75 }
      }
      if (percentage >= 60) return { 
        id: "responsible-citizen",
        name: "Responsible Citizen", 
        description: "Demonstrates responsible citizenship",
        icon: "CheckCircle", 
        color: "text-orange-600",
        criteria: { minScore: 60 }
      }
      return { 
        id: "building-awareness",
        name: "Building Awareness", 
        description: "Building awareness of ethical responsibilities",
        icon: "BookOpen", 
        color: "text-gray-600",
        criteria: { minScore: 0 }
      }
    }
  }
}