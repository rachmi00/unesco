# Custom Hooks

This directory contains custom React hooks for state management and business logic.

## Available Hooks

### useScenarioProgress
Manages progress through scenarios including current position, selected options, and points.

```tsx
import { useScenarioProgress } from '@/hooks/use-scenario-progress'

const progress = useScenarioProgress(totalScenarios)

// Available properties and methods:
progress.currentScenario      // Current scenario index
progress.selectedOption       // Selected option index
progress.showResult          // Whether to show result
progress.totalPoints         // Total points earned
progress.scenarioPoints      // Points per scenario
progress.completed           // Module completion status

progress.selectOption(index) // Select an option
progress.nextScenario()      // Move to next scenario
progress.resetModule()       // Reset all progress
progress.goToScenario(index) // Jump to specific scenario
progress.addPoints(points)   // Add points to total
```

### useTeenModuleState / useAdultModuleState
High-level hooks that combine scenario data loading with progress management.

```tsx
import { useTeenModuleState } from '@/hooks/use-module-state'

const {
  scenarios,           // Array of scenarios
  progress,           // Progress state and actions
  isLoading,          // Loading state
  error,              // Error state
  handleOptionSelect, // Handle option selection
  handleNext,         // Handle next scenario
  getCurrentScenario, // Get current scenario
  getMaxPoints        // Get maximum possible points
} = useTeenModuleState()
```

### useScenarioNavigation
Provides navigation controls and validation for scenario progression.

```tsx
import { useScenarioNavigation } from '@/hooks/use-scenario-navigation'

const navigation = useScenarioNavigation(
  currentScenario,
  totalScenarios,
  selectedOption,
  onNext,
  onGoToScenario
)

// Available properties and methods:
navigation.canGoNext         // Can advance to next
navigation.canGoPrevious     // Can go to previous
navigation.goNext()          // Go to next scenario
navigation.goPrevious()      // Go to previous scenario
navigation.goToScenario(i)   // Go to specific scenario
navigation.getProgressPercentage() // Get completion percentage
```

### useBadgeCalculation
Calculates achievement badges based on points and module type.

```tsx
import { useTeenBadgeCalculation } from '@/hooks/use-badge-calculation'

const {
  currentBadge,        // Current achievement badge
  nextBadge,           // Next badge to achieve
  progressToNextBadge, // Progress to next badge (0-100)
  badgePercentage      // Overall badge percentage
} = useTeenBadgeCalculation(points, maxPoints)
```

## Hook Patterns

### State Management
Hooks follow consistent patterns for state management:
- Use `useState` for local component state
- Use `useCallback` for stable function references
- Use `useMemo` for expensive calculations
- Use `useEffect` for side effects

### Error Handling
All hooks include proper error handling:
- Try-catch blocks for data operations
- Error state management
- Graceful fallbacks

### Performance
Hooks are optimized for performance:
- Memoized callbacks to prevent unnecessary re-renders
- Efficient state updates
- Minimal re-computation

## Testing

Hooks are tested with:
- `@testing-library/react-hooks` for hook testing
- Mock data for consistent testing
- Edge case coverage
- Performance testing

Example test:
```tsx
import { renderHook, act } from '@testing-library/react'
import { useScenarioProgress } from '../use-scenario-progress'

test('should initialize with correct defaults', () => {
  const { result } = renderHook(() => useScenarioProgress(5))
  
  expect(result.current.currentScenario).toBe(0)
  expect(result.current.completed).toBe(false)
})
```