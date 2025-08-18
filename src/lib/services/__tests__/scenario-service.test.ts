import { ScenarioService } from '../scenario-service'

describe('ScenarioService', () => {
  describe('getTeenScenarios', () => {
    it('returns an array of teen scenarios', () => {
      const scenarios = ScenarioService.getTeenScenarios()
      
      expect(Array.isArray(scenarios)).toBe(true)
      expect(scenarios.length).toBeGreaterThan(0)
      
      // Check first scenario structure
      const firstScenario = scenarios[0]
      expect(firstScenario).toHaveProperty('id')
      expect(firstScenario).toHaveProperty('type')
      expect(firstScenario).toHaveProperty('title')
      expect(firstScenario).toHaveProperty('context')
      expect(firstScenario).toHaveProperty('content')
      expect(firstScenario).toHaveProperty('author')
      expect(firstScenario).toHaveProperty('platform_details')
      expect(firstScenario).toHaveProperty('question')
      expect(firstScenario).toHaveProperty('options')
      expect(Array.isArray(firstScenario.options)).toBe(true)
    })
  })

  describe('getAdultScenarios', () => {
    it('returns an array of adult scenarios', () => {
      const scenarios = ScenarioService.getAdultScenarios()
      
      expect(Array.isArray(scenarios)).toBe(true)
      expect(scenarios.length).toBeGreaterThan(0)
      
      // Check first scenario structure
      const firstScenario = scenarios[0]
      expect(firstScenario).toHaveProperty('id')
      expect(firstScenario).toHaveProperty('category')
      expect(firstScenario).toHaveProperty('title')
      expect(firstScenario).toHaveProperty('context')
      expect(firstScenario).toHaveProperty('situation')
      expect(firstScenario).toHaveProperty('stakeholders')
      expect(firstScenario).toHaveProperty('legalContext')
      expect(firstScenario).toHaveProperty('historicalContext')
      expect(firstScenario).toHaveProperty('question')
      expect(firstScenario).toHaveProperty('options')
      expect(Array.isArray(firstScenario.options)).toBe(true)
      expect(Array.isArray(firstScenario.stakeholders)).toBe(true)
    })
  })

  describe('getScenarioCount', () => {
    it('returns correct count for teen scenarios', () => {
      const count = ScenarioService.getScenarioCount('teen')
      const scenarios = ScenarioService.getTeenScenarios()
      
      expect(count).toBe(scenarios.length)
    })

    it('returns correct count for adult scenarios', () => {
      const count = ScenarioService.getScenarioCount('adult')
      const scenarios = ScenarioService.getAdultScenarios()
      
      expect(count).toBe(scenarios.length)
    })
  })

  describe('getMaxPoints', () => {
    it('calculates max points correctly', () => {
      const teenMaxPoints = ScenarioService.getMaxPoints('teen')
      const teenCount = ScenarioService.getScenarioCount('teen')
      
      expect(teenMaxPoints).toBe(teenCount * 4)
      
      const adultMaxPoints = ScenarioService.getMaxPoints('adult')
      const adultCount = ScenarioService.getScenarioCount('adult')
      
      expect(adultMaxPoints).toBe(adultCount * 4)
    })
  })

  describe('calculateBadgeLevel', () => {
    it('returns correct badge for different score percentages', () => {
      const maxPoints = 32 // 8 scenarios * 4 points
      
      // Test 90%+ score
      const highBadge = ScenarioService.calculateBadgeLevel(30, maxPoints, 'teen')
      expect(highBadge.name).toBe('Digital Rights Defender')
      
      // Test 75%+ score
      const goodBadge = ScenarioService.calculateBadgeLevel(25, maxPoints, 'teen')
      expect(goodBadge.name).toBe('Media Literacy Leader')
      
      // Test 60%+ score
      const okBadge = ScenarioService.calculateBadgeLevel(20, maxPoints, 'teen')
      expect(goodBadge.name).toBe('Awareness Builder')
      
      // Test low score
      const lowBadge = ScenarioService.calculateBadgeLevel(10, maxPoints, 'teen')
      expect(lowBadge.name).toBe('Learning Digital Citizenship')
    })

    it('returns different badges for teen vs adult modules', () => {
      const maxPoints = 32
      const score = 30
      
      const teenBadge = ScenarioService.calculateBadgeLevel(score, maxPoints, 'teen')
      const adultBadge = ScenarioService.calculateBadgeLevel(score, maxPoints, 'adult')
      
      expect(teenBadge.name).not.toBe(adultBadge.name)
      expect(teenBadge.name).toBe('Digital Rights Defender')
      expect(adultBadge.name).toBe('Ethics Champion')
    })
  })
})