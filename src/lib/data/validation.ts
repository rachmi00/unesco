import { TeenScenario, AdultScenario, PlatformType, AdultCategory } from "@/types/scenarios"

// Validation utilities for scenario data integrity

export const validatePlatformType = (type: string): type is PlatformType => {
  const validTypes: PlatformType[] = ["tiktok", "instagram", "whatsapp", "youtube", "twitter", "facebook"]
  return validTypes.includes(type as PlatformType)
}

export const validateAdultCategory = (category: string): category is AdultCategory => {
  const validCategories: AdultCategory[] = ["workplace", "community", "political", "media", "business"]
  return validCategories.includes(category as AdultCategory)
}

export const validateTeenScenario = (scenario: any): scenario is TeenScenario => {
  return (
    typeof scenario.id === 'number' &&
    typeof scenario.title === 'string' &&
    typeof scenario.context === 'string' &&
    typeof scenario.content === 'string' &&
    typeof scenario.author === 'string' &&
    typeof scenario.question === 'string' &&
    validatePlatformType(scenario.type) &&
    Array.isArray(scenario.options) &&
    scenario.options.every((option: any) => 
      typeof option.text === 'string' &&
      typeof option.points === 'number' &&
      typeof option.consequence === 'string' &&
      typeof option.explanation === 'string'
    )
  )
}

export const validateAdultScenario = (scenario: any): scenario is AdultScenario => {
  return (
    typeof scenario.id === 'number' &&
    typeof scenario.title === 'string' &&
    typeof scenario.context === 'string' &&
    typeof scenario.situation === 'string' &&
    typeof scenario.question === 'string' &&
    typeof scenario.legalContext === 'string' &&
    typeof scenario.historicalContext === 'string' &&
    validateAdultCategory(scenario.category) &&
    Array.isArray(scenario.stakeholders) &&
    Array.isArray(scenario.options) &&
    scenario.options.every((option: any) => 
      typeof option.text === 'string' &&
      typeof option.explanation === 'string' &&
      typeof option.legalNote === 'string' &&
      Array.isArray(option.consequences)
    )
  )
}

export const validateScenarioArray = <T>(
  scenarios: any[], 
  validator: (scenario: any) => scenario is T
): T[] => {
  const validScenarios = scenarios.filter(validator)
  
  if (validScenarios.length !== scenarios.length) {
    console.warn(`${scenarios.length - validScenarios.length} invalid scenarios filtered out`)
  }
  
  return validScenarios
}