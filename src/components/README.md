# UNESCO App Components

This directory contains the modular component architecture for the UNESCO Media Literacy app.

## Structure

```
components/
├── common/           # Shared components across modules
├── layout/           # Layout and navigation components  
├── modules/          # Module-specific components
│   ├── teens/       # Teen module components
│   └── adults/      # Adult module components
└── ui/              # shadcn/ui components
```

## Common Components

### ScenarioCard
Displays scenario information with context and questions.

```tsx
import { ScenarioCard } from '@/components/common/scenario-card'

<ScenarioCard
  title="Scenario Title"
  context="Background information"
  question="What would you do?"
  badge={{ text: "Scenario 1", variant: "outline" }}
>
  <div>Additional content</div>
</ScenarioCard>
```

### OptionSelection
Generic component for displaying and selecting from multiple options.

```tsx
import { OptionSelection } from '@/components/common/option-selection'

<OptionSelection
  options={options}
  selectedIndex={selectedIndex}
  showResult={showResult}
  onSelect={(option, index) => handleSelect(index)}
/>
```

### ProgressTracker
Shows progress through scenarios with optional points display.

```tsx
import { ProgressTracker } from '@/components/common/progress-tracker'

<ProgressTracker
  current={3}
  total={8}
  points={12}
  maxPoints={32}
  showPoints={true}
/>
```

## Module-Specific Components

### Teen Components

#### PlatformPost
Displays social media posts with platform-specific styling.

```tsx
import { PlatformPost } from '@/components/modules/teens/platform-post'

<PlatformPost
  type="tiktok"
  content="Post content"
  author="username"
  platformDetails={{ followers: "45.2K", likes: "12.8K" }}
/>
```

#### TeenOptionCard
Specialized option card for teen scenarios with points and consequences.

```tsx
import { TeenOptionCard } from '@/components/modules/teens/teen-option-card'

<TeenOptionCard
  option={teenOption}
  index={0}
  isSelected={selectedIndex === 0}
  showResult={showResult}
  onSelect={() => handleSelect(0)}
/>
```

### Adult Components

#### StakeholderList
Displays affected stakeholders with categorized badges.

```tsx
import { StakeholderList } from '@/components/modules/adults/stakeholder-list'

<StakeholderList
  stakeholders={["Employees", "Legal Compliance", "Company Reputation"]}
  title="Key Stakeholders"
/>
```

#### LegalContext
Shows legal and historical context for adult scenarios.

```tsx
import { LegalContext } from '@/components/modules/adults/legal-context'

<LegalContext
  legalContext="Legal framework information"
  historicalContext="Historical background"
/>
```

## Layout Components

### ModuleLayout
Main layout wrapper for module pages.

```tsx
import { ModuleLayout } from '@/components/layout/module-layout'

<ModuleLayout
  title="Module Title"
  description="Module description"
  badge={{ text: "Ages 13-19", variant: "secondary" }}
  navigation={<ProgressTracker />}
>
  <div>Module content</div>
</ModuleLayout>
```

### Navigation
Navigation controls for scenarios.

```tsx
import { Navigation } from '@/components/layout/navigation'

<Navigation
  currentScenario={2}
  totalScenarios={8}
  canGoPrevious={true}
  canGoNext={true}
  onPrevious={() => {}}
  onNext={() => {}}
  nextButtonText="Next Scenario"
/>
```

## Error Handling

### ErrorBoundary
Catches and displays component errors gracefully.

```tsx
import { ErrorBoundary } from '@/components/common/error-boundary'

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### LoadingState
Handles loading and error states consistently.

```tsx
import { LoadingState } from '@/components/common/loading-state'

<LoadingState
  isLoading={isLoading}
  error={error}
  loadingText="Loading scenarios..."
  errorTitle="Failed to load"
>
  <YourContent />
</LoadingState>
```

## Performance

Components are optimized with:
- React.memo for preventing unnecessary re-renders
- Lazy loading for heavy components
- Efficient state management
- Tree-shaking friendly exports

## Testing

All components include comprehensive tests:
- Unit tests with Jest and React Testing Library
- Type checking with TypeScript
- Integration tests for user workflows

Run tests with:
```bash
npm test
```