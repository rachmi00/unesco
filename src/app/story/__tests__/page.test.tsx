import { render, screen } from '@testing-library/react'
import StoryModule from '../page'

// Mock the story components and data
jest.mock('@/components/modules/story/components', () => ({
  StoryContainer: jest.fn(({ storyData, badges, onComplete, onBadgeEarned }) => (
    <div data-testid="story-container">
      <div data-testid="story-data">{JSON.stringify(Object.keys(storyData))}</div>
      <div data-testid="badges">{JSON.stringify(Object.keys(badges))}</div>
      <button 
        onClick={() => onComplete({ type: 'positive', message: 'Test completion' })}
        data-testid="complete-story"
      >
        Complete Story
      </button>
      <button 
        onClick={() => onBadgeEarned({ name: 'Test Badge', icon: 'test', color: 'blue' })}
        data-testid="earn-badge"
      >
        Earn Badge
      </button>
    </div>
  ))
}))

jest.mock('@/components/modules/story/data/anise-ray-story', () => ({
  aniseRayStory: {
    scene1: { id: 'scene1', text: 'Test scene', image: '/test.png', isEnding: false },
    scene2: { id: 'scene2', text: 'Test ending', image: '/test2.png', isEnding: true }
  }
}))

jest.mock('@/components/modules/story/data/story-badges', () => ({
  STORY_BADGES: {
    'Cycle Breaker Badge': {
      name: 'Cycle Breaker Badge',
      icon: 'shield-check',
      color: 'green'
    }
  }
}))

jest.mock('@/components/layout/module-layout', () => ({
  ModuleLayout: jest.fn(({ title, description, badge, children }) => (
    <div data-testid="module-layout">
      <h1 data-testid="module-title">{title}</h1>
      <p data-testid="module-description">{description}</p>
      {badge && <span data-testid="module-badge">{badge.text}</span>}
      {children}
    </div>
  ))
}))

jest.mock('@/components/common/loading-state', () => ({
  LoadingState: jest.fn(({ isLoading, error, children }) => (
    <div data-testid="loading-state">
      {isLoading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error}</div>}
      {!isLoading && !error && children}
    </div>
  ))
}))

jest.mock('@/components/common/error-boundary', () => ({
  ErrorBoundary: jest.fn(({ children }) => (
    <div data-testid="error-boundary">{children}</div>
  ))
}))

describe('Story Module Page', () => {
  it('renders the story module with correct layout', () => {
    render(<StoryModule />)
    
    expect(screen.getByTestId('module-layout')).toBeInTheDocument()
    expect(screen.getByTestId('module-title')).toHaveTextContent('Interactive Story: Anise & Ray')
    expect(screen.getByTestId('module-description')).toHaveTextContent('Learn to break cycles of hate speech through an interactive narrative experience')
    expect(screen.getByTestId('module-badge')).toHaveTextContent('Story Module')
  })

  it('renders the story container with correct props', () => {
    render(<StoryModule />)
    
    expect(screen.getByTestId('story-container')).toBeInTheDocument()
    expect(screen.getByTestId('story-data')).toHaveTextContent('["scene1","scene2"]')
    expect(screen.getByTestId('badges')).toHaveTextContent('["Cycle Breaker Badge"]')
  })

  it('wraps content in error boundary and loading state', () => {
    render(<StoryModule />)
    
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument()
    expect(screen.getByTestId('loading-state')).toBeInTheDocument()
  })

  it('handles story completion callback', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    
    render(<StoryModule />)
    
    const completeButton = screen.getByTestId('complete-story')
    completeButton.click()
    
    expect(consoleSpy).toHaveBeenCalledWith('Story completed with outcome:', {
      type: 'positive',
      message: 'Test completion'
    })
    
    consoleSpy.mockRestore()
  })

  it('handles badge earned callback', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    
    render(<StoryModule />)
    
    const badgeButton = screen.getByTestId('earn-badge')
    badgeButton.click()
    
    expect(consoleSpy).toHaveBeenCalledWith('Badge earned:', {
      name: 'Test Badge',
      icon: 'test',
      color: 'blue'
    })
    
    consoleSpy.mockRestore()
  })
})