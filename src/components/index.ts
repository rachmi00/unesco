// Common Components
export { ScenarioCard } from './common/scenario-card'
export { OptionSelection } from './common/option-selection'
export { ProgressTracker } from './common/progress-tracker'
export { LoadingState } from './common/loading-state'
export { ErrorBoundary } from './common/error-boundary'

// Layout Components
export { ModuleLayout } from './layout/module-layout'
export { Navigation } from './layout/navigation'
export { CompletionScreen } from './layout/completion-screen'
export { HeaderSection } from './layout/header-section'

// Teen Module Components
export { PlatformPost } from './modules/teens/platform-post'
export { TeenOptionCard } from './modules/teens/teen-option-card'
export { PlatformBadge } from './modules/teens/platform-badge'
export { TeenResultDisplay } from './modules/teens/teen-result-display'

// Adult Module Components
export { StakeholderList } from './modules/adults/stakeholder-list'
export { LegalContext } from './modules/adults/legal-context'
export { AdultOptionCard } from './modules/adults/adult-option-card'
export { AdultResultDisplay } from './modules/adults/adult-result-display'

// Lazy Loading Components
export { 
  LazyTeenResultDisplay,
  LazyAdultResultDisplay,
  LazyPlatformPost,
  LazyLegalContext
} from './lazy-loading'