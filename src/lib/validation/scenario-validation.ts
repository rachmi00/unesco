// Validation utilities for scenario data integrity

import { 
  BaseScenario, 
  TeenScenario, 
  AdultScenario, 
  BaseOption,
  TeenOption,
  AdultOption,
  ScenarioProgress,
  ValidationResult
} from "@/types/scenarios"

// Base validation functions
export function validateBaseScenario(scenario: BaseScenario): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!scenario.id) {
    errors.push("Scenario must have a valid ID")
  }

  if (!scenario.title?.trim()) {
    errors.push("Scenario must have a title")
  }

  if (!scenario.context?.trim()) {
    errors.push("Scenario must have context")
  }

  if (!scenario.question?.trim()) {
    errors.push("Scenario must have a question")
  }

  if (scenario.estimatedTime && scenario.estimatedTime < 1) {
    warnings.push("Estimated time should be at least 1 minute")
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

export function validateBaseOption(option: BaseOption): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!option.id) {
    errors.push("Option must have a valid ID")
  }

  if (!option.text?.trim()) {
    errors.push("Option must have text")
  }

  if (!option.explanation?.trim()) {
    errors.push("Option must have an explanation")
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

// Teen scenario validation
export function validateTeenScenario(scenario: TeenScenario): ValidationResult {
  const baseValidation = validateBaseScenario(scenario)
  const errors = [...baseValidation.errors]
  const warnings = [...baseValidation.warnings]

  if (!scenario.type) {
    errors.push("Teen scenario must have a platform type")
  }

  if (!scenario.content?.trim()) {
    errors.push("Teen scenario must have content")
  }

  if (!scenario.author?.trim()) {
    errors.push("Teen scenario must have an author")
  }

  if (!scenario.options || scenario.options.length < 2) {
    errors.push("Teen scenario must have at least 2 options")
  }

  // Validate each option
  scenario.options?.forEach((option, index) => {
    const optionValidation = validateTeenOption(option)
    optionValidation.errors.forEach(error => 
      errors.push(`Option ${index + 1}: ${error}`)
    )
    optionValidation.warnings.forEach(warning => 
      warnings.push(`Option ${index + 1}: ${warning}`)
    )
  })

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

export function validateTeenOption(option: TeenOption): ValidationResult {
  const baseValidation = validateBaseOption(option)
  const errors = [...baseValidation.errors]
  const warnings = [...baseValidation.warnings]

  if (typeof option.points !== 'number') {
    errors.push("Teen option must have numeric points")
  }

  if (option.points < 0 || option.points > 100) {
    warnings.push("Points should typically be between 0 and 100")
  }

  if (!option.consequence?.trim()) {
    errors.push("Teen option must have a consequence")
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

// Adult scenario validation
export function validateAdultScenario(scenario: AdultScenario): ValidationResult {
  const baseValidation = validateBaseScenario(scenario)
  const errors = [...baseValidation.errors]
  const warnings = [...baseValidation.warnings]

  if (!scenario.category) {
    errors.push("Adult scenario must have a category")
  }

  if (!scenario.situation?.trim()) {
    errors.push("Adult scenario must have a situation")
  }

  if (!scenario.stakeholders || scenario.stakeholders.length === 0) {
    warnings.push("Adult scenario should have stakeholders")
  }

  if (!scenario.legalContext?.trim()) {
    warnings.push("Adult scenario should have legal context")
  }

  if (!scenario.options || scenario.options.length < 2) {
    errors.push("Adult scenario must have at least 2 options")
  }

  // Validate each option
  scenario.options?.forEach((option, index) => {
    const optionValidation = validateAdultOption(option)
    optionValidation.errors.forEach(error => 
      errors.push(`Option ${index + 1}: ${error}`)
    )
    optionValidation.warnings.forEach(warning => 
      warnings.push(`Option ${index + 1}: ${warning}`)
    )
  })

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

export function validateAdultOption(option: AdultOption): ValidationResult {
  const baseValidation = validateBaseOption(option)
  const errors = [...baseValidation.errors]
  const warnings = [...baseValidation.warnings]

  if (!option.impact || !['positive', 'neutral', 'negative'].includes(option.impact)) {
    errors.push("Adult option must have a valid impact level")
  }

  if (!option.consequences || option.consequences.length === 0) {
    errors.push("Adult option must have consequences")
  }

  if (!option.legalNote?.trim()) {
    warnings.push("Adult option should have a legal note")
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

// Progress validation
export function validateScenarioProgress(progress: ScenarioProgress): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (progress.currentScenario < 0) {
    errors.push("Current scenario index cannot be negative")
  }

  if (progress.totalPoints < 0) {
    errors.push("Total points cannot be negative")
  }

  if (progress.selectedOption !== null && progress.selectedOption < 0) {
    errors.push("Selected option index cannot be negative")
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

// Comprehensive validation function
export function validateScenarioData(
  scenarios: TeenScenario[] | AdultScenario[], 
  type: "teen" | "adult"
): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!scenarios || scenarios.length === 0) {
    errors.push("Must have at least one scenario")
    return { isValid: false, errors, warnings }
  }

  scenarios.forEach((scenario, index) => {
    let validation: ValidationResult

    if (type === "teen") {
      validation = validateTeenScenario(scenario as TeenScenario)
    } else {
      validation = validateAdultScenario(scenario as AdultScenario)
    }

    validation.errors.forEach(error => 
      errors.push(`Scenario ${index + 1}: ${error}`)
    )
    validation.warnings.forEach(warning => 
      warnings.push(`Scenario ${index + 1}: ${warning}`)
    )
  })

  // Check for duplicate IDs
  const ids = scenarios.map(s => s.id)
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index)
  if (duplicateIds.length > 0) {
    errors.push(`Duplicate scenario IDs found: ${duplicateIds.join(', ')}`)
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}