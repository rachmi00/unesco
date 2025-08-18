import { renderHook, act } from '@testing-library/react'
import { useScenarioProgress } from '../use-scenario-progress'

describe('useScenarioProgress', () => {
  const totalScenarios = 5

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useScenarioProgress(totalScenarios))
    
    expect(result.current.currentScenario).toBe(0)
    expect(result.current.selectedOption).toBe(null)
    expect(result.current.showResult).toBe(false)
    expect(result.current.totalPoints).toBe(0)
    expect(result.current.scenarioPoints).toEqual([])
    expect(result.current.completed).toBe(false)
  })

  it('selects option correctly', () => {
    const { result } = renderHook(() => useScenarioProgress(totalScenarios))
    
    act(() => {
      result.current.selectOption(2)
    })
    
    expect(result.current.selectedOption).toBe(2)
    expect(result.current.showResult).toBe(true)
  })

  it('adds points correctly', () => {
    const { result } = renderHook(() => useScenarioProgress(totalScenarios))
    
    act(() => {
      result.current.addPoints(4)
    })
    
    expect(result.current.totalPoints).toBe(4)
    expect(result.current.scenarioPoints).toEqual([4])
    
    act(() => {
      result.current.addPoints(2)
    })
    
    expect(result.current.totalPoints).toBe(6)
    expect(result.current.scenarioPoints).toEqual([4, 2])
  })

  it('advances to next scenario correctly', () => {
    const { result } = renderHook(() => useScenarioProgress(totalScenarios))
    
    // Select an option first
    act(() => {
      result.current.selectOption(1)
    })
    
    act(() => {
      result.current.nextScenario()
    })
    
    expect(result.current.currentScenario).toBe(1)
    expect(result.current.selectedOption).toBe(null)
    expect(result.current.showResult).toBe(false)
  })

  it('completes module when reaching last scenario', () => {
    const { result } = renderHook(() => useScenarioProgress(totalScenarios))
    
    // Go to last scenario
    act(() => {
      result.current.goToScenario(totalScenarios - 1)
    })
    
    expect(result.current.currentScenario).toBe(totalScenarios - 1)
    
    // Complete last scenario
    act(() => {
      result.current.nextScenario()
    })
    
    expect(result.current.completed).toBe(true)
  })

  it('resets module correctly', () => {
    const { result } = renderHook(() => useScenarioProgress(totalScenarios))
    
    // Make some progress
    act(() => {
      result.current.selectOption(1)
      result.current.addPoints(3)
      result.current.nextScenario()
    })
    
    // Reset
    act(() => {
      result.current.resetModule()
    })
    
    expect(result.current.currentScenario).toBe(0)
    expect(result.current.selectedOption).toBe(null)
    expect(result.current.showResult).toBe(false)
    expect(result.current.totalPoints).toBe(0)
    expect(result.current.scenarioPoints).toEqual([])
    expect(result.current.completed).toBe(false)
  })

  it('navigates to specific scenario correctly', () => {
    const { result } = renderHook(() => useScenarioProgress(totalScenarios))
    
    act(() => {
      result.current.goToScenario(3)
    })
    
    expect(result.current.currentScenario).toBe(3)
    expect(result.current.selectedOption).toBe(null)
    expect(result.current.showResult).toBe(false)
  })

  it('prevents navigation to invalid scenario indices', () => {
    const { result } = renderHook(() => useScenarioProgress(totalScenarios))
    
    // Try to go to negative index
    act(() => {
      result.current.goToScenario(-1)
    })
    
    expect(result.current.currentScenario).toBe(0)
    
    // Try to go beyond total scenarios
    act(() => {
      result.current.goToScenario(totalScenarios + 1)
    })
    
    expect(result.current.currentScenario).toBe(0)
  })
})