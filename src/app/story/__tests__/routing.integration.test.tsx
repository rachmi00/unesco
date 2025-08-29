import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import StoryModule from '../page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

// Mock all the components
jest.mock('@/components/modules/story/components', () => ({
  StoryContainer: jest.fn(() => (
    <div data-testid="story-container">Story Container</div>
  ))
}))

jest.mock('@/components/modules/story/data/anise-ray-story', () => ({
  aniseRayStory: {}
}))

jest.mock('@/components/modules/story/data/story-badges', () => ({
  STORY_BADGES: {}
}))

jest.mock('@/components/layout/module-layout', () => ({
  ModuleLayout: jest.fn(({ children }) => (
    <div data-testid="module-layout">{children}</div>
  ))
}))

jest.mock('@/components/common/loading-state', () => ({
  LoadingState: jest.fn(({ children }) => (
    <div data-testid="loading-state">{children}</div>
  ))
}))

jest.mock('@/components/common/error-boundary', () => ({
  ErrorBoundary: jest.fn(({ children }) => (
    <div data-testid="error-boundary">{children}</div>
  ))
}))

describe('Story Module Routing Integration', () => {
  const mockPush = jest.fn()
  const mockRouter = {
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.MockedFunction<typeof useRouter>).mockReturnValue(mockRouter)
  })

  it('renders story module at /story route', () => {
    render(<StoryModule />)
    
    expect(screen.getByTestId('module-layout')).toBeInTheDocument()
    expect(screen.getByTestId('story-container')).toBeInTheDocument()
  })

  it('loads story module independently without affecting other routes', () => {
    // Simulate loading the story module
    render(<StoryModule />)
    
    // Verify the module loads without router navigation
    expect(mockPush).not.toHaveBeenCalled()
    expect(screen.getByTestId('story-container')).toBeInTheDocument()
  })

  it('integrates with existing app structure', () => {
    render(<StoryModule />)
    
    // Verify it uses the same layout components as other modules
    expect(screen.getByTestId('module-layout')).toBeInTheDocument()
    expect(screen.getByTestId('loading-state')).toBeInTheDocument()
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument()
  })

  it('follows the same page pattern as adults and teens modules', () => {
    render(<StoryModule />)
    
    // Verify it follows the established patterns:
    // 1. Uses ModuleLayout
    // 2. Wraps in ErrorBoundary
    // 3. Uses LoadingState
    // 4. Has main content container
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument()
    expect(screen.getByTestId('module-layout')).toBeInTheDocument()
    expect(screen.getByTestId('loading-state')).toBeInTheDocument()
    expect(screen.getByTestId('story-container')).toBeInTheDocument()
  })
})