import { TeenScenario, AdultScenario, PlatformType, AdultCategory, PlatformDetails } from "@/types/scenarios"

// Helper guard for plain objects
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null

export const validatePlatformType = (value: unknown): value is PlatformType => {
  if (typeof value !== 'string') return false
  const validTypes: PlatformType[] = ["tiktok", "instagram", "whatsapp", "youtube", "twitter", "facebook"]
  return validTypes.includes(value as PlatformType)
}

export const validateAdultCategory = (value: unknown): value is AdultCategory => {
  if (typeof value !== 'string') return false
  const validCategories: AdultCategory[] = ["workplace", "community", "political", "media", "business"]
  return validCategories.includes(value as AdultCategory)
}

const isPlatformDetails = (value: unknown): value is PlatformDetails => {
  if (!isObject(value)) return false
  // All fields are optional strings; accept objects where present fields are strings
  const allowedKeys = ['followers', 'likes', 'views', 'shares', 'comments'] as const
  const v = value as Record<string, unknown>
  return Object.keys(v).every((key) => {
    if ((allowedKeys as readonly string[]).includes(key)) {
      const field = v[key]
      return typeof field === 'string' || typeof field === 'undefined'
    }
    return true
  })
}

export const validateTeenScenario = (scenario: unknown): scenario is TeenScenario => {
  if (!isObject(scenario)) return false

  const s = scenario as Record<string, unknown>
  if (
    typeof s.id !== 'number' ||
    typeof s.title !== 'string' ||
    typeof s.context !== 'string' ||
    typeof s.content !== 'string' ||
    typeof s.author !== 'string' ||
    typeof s.question !== 'string'
  ) return false

  if (!validatePlatformType(s.type)) return false
  if (!isPlatformDetails(s.platform_details)) return false

  const opts = s.options
  if (!Array.isArray(opts)) return false
  return opts.every((option) => {
    if (!isObject(option)) return false
    const o = option as Record<string, unknown>
    return (
      typeof o.text === 'string' &&
      typeof o.points === 'number' &&
      typeof o.consequence === 'string' &&
      typeof o.explanation === 'string'
    )
  })
}

export const validateAdultScenario = (scenario: unknown): scenario is AdultScenario => {
  if (!isObject(scenario)) return false

  const s = scenario as Record<string, unknown>
  if (
    typeof s.id !== 'number' ||
    typeof s.title !== 'string' ||
    typeof s.context !== 'string' ||
    typeof s.question !== 'string'
  ) return false

  if (typeof s.situation !== 'string') return false
  if (typeof s.legalContext !== 'string') return false
  if (typeof s.historicalContext !== 'string') return false
  if (!validateAdultCategory(s.category)) return false

  if (!Array.isArray(s.stakeholders)) return false
  const opts = s.options
  if (!Array.isArray(opts)) return false
  return opts.every((option) => {
    if (!isObject(option)) return false
    const o = option as Record<string, unknown>
    return (
      typeof o.text === 'string' &&
      typeof o.explanation === 'string' &&
      typeof o.legalNote === 'string' &&
      Array.isArray(o.consequences)
    )
  })
}

export const validateScenarioArray = <T>(
  scenarios: unknown,
  validator: (scenario: unknown) => scenario is T
): T[] => {
  if (!Array.isArray(scenarios)) return []

  const validScenarios: T[] = []
  for (const s of scenarios) {
    if (validator(s)) validScenarios.push(s)
  }

  if (validScenarios.length !== scenarios.length) {
    const total = Array.isArray(scenarios) ? scenarios.length : 0
    console.warn(`${total - validScenarios.length} invalid scenarios filtered out`)
  }

  return validScenarios
}