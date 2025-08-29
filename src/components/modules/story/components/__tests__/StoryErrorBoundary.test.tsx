import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { StoryErrorBoundary } from '../StoryErrorBoundary'

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('StoryErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error
  beforeAll(() => {
    console.error = jest.fn()
  })
  afterAll(() => {
    console.error = originalError
  })

  it('renders children when there is no error', () => {
    render(
      <StoryErrorBoundary>
        <div>Test content</div>
      </StoryErrorBoundary>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders error UI when child component throws', () => {
    render(
      <StoryErrorBoundary>
        <ThrowError shouldThrow={true} />
      </StoryErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText(/The story encountered an unexpected error/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>

    render(
      <StoryErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </StoryErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })

  it('calls onError callback when error occurs', () => {
    const onError = jest.fn()

    render(
      <StoryErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </StoryErrorBoundary>
    )

    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String)
      })
    )
  })

  it('calls onReset callback when reset button is clicked', () => {
    const onReset = jest.fn()

    render(
      <StoryErrorBoundary onReset={onReset}>
        <ThrowError shouldThrow={true} />
      </StoryErrorBoundary>
    )

    fireEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(onReset).toHaveBeenCalled()
  })

  it('resets error state when reset button is clicked', () => {
    const TestComponent = () => {
      const [shouldThrow, setShouldThrow] = React.useState(true)

      return (
        <StoryErrorBoundary onReset={() => setShouldThrow(false)}>
          <ThrowError shouldThrow={shouldThrow} />
        </StoryErrorBoundary>
      )
    }

    render(<TestComponent />)

    // Initially shows error
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    // Click reset
    fireEvent.click(screen.getByRole('button', { name: /try again/i }))

    // Should show normal content
    expect(screen.getByText('No error')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <StoryErrorBoundary>
        <ThrowError shouldThrow={true} />
      </StoryErrorBoundary>
    )

    expect(screen.getByText('Error Details (Development)')).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('hides error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    render(
      <StoryErrorBoundary>
        <ThrowError shouldThrow={true} />
      </StoryErrorBoundary>
    )

    expect(screen.queryByText('Error Details (Development)')).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })
})