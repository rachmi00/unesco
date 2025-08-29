import React from 'react'
import { render, screen } from '@testing-library/react'
import { BadgeDisplay } from '../BadgeDisplay'
import { BadgeInfo } from '@/types/scenarios'

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  ShieldCheck: ({ className, ...props }: { className?: string }) => (
    <div data-testid="shield-check-icon" className={className} {...props}>ShieldCheck</div>
  ),
  Award: ({ className, ...props }: { className?: string }) => (
    <div data-testid="award-icon" className={className} {...props}>Award</div>
  ),
  Star: ({ className, ...props }: { className?: string }) => (
    <div data-testid="star-icon" className={className} {...props}>Star</div>
  ),
  Trophy: ({ className, ...props }: { className?: string }) => (
    <div data-testid="trophy-icon" className={className} {...props}>Trophy</div>
  ),
}))

describe('BadgeDisplay Component', () => {
  const mockBadge: BadgeInfo = {
    name: 'Cycle Breaker Badge',
    icon: 'ShieldCheck',
    color: 'from-green-500 to-emerald-600'
  }

  const mockBadgeWithComponentIcon: BadgeInfo = {
    name: 'Test Badge',
    icon: ({ className }: { className?: string }) => (
      <div data-testid="custom-icon" className={className}>CustomIcon</div>
    ),
    color: 'from-blue-500 to-indigo-600'
  }

  const mockOnAnimationComplete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders badge with correct name and icon', () => {
      render(<BadgeDisplay badge={mockBadge} showAnimation={false} />)
      
      expect(screen.getByText('Cycle Breaker Badge')).toBeInTheDocument()
      expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
      expect(screen.getByTestId('shield-check-icon')).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const { container } = render(
        <BadgeDisplay badge={mockBadge} showAnimation={false} className="custom-class" />
      )
      
      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('renders different badge sizes correctly', () => {
      const { rerender } = render(
        <BadgeDisplay badge={mockBadge} showAnimation={false} size="sm" />
      )
      
      // Check small size classes are applied
      expect(screen.getByText('Cycle Breaker Badge')).toHaveClass('text-xs')
      
      rerender(<BadgeDisplay badge={mockBadge} showAnimation={false} size="lg" />)
      
      // Check large size classes are applied
      expect(screen.getByText('Cycle Breaker Badge')).toHaveClass('text-base')
    })
  })

  describe('Icon Handling', () => {
    it('renders string-based icons correctly', () => {
      render(<BadgeDisplay badge={mockBadge} showAnimation={false} />)
      
      expect(screen.getByTestId('shield-check-icon')).toBeInTheDocument()
    })

    it('renders React component icons correctly', () => {
      render(<BadgeDisplay badge={mockBadgeWithComponentIcon} showAnimation={false} />)
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })

    it('falls back to ShieldCheck for unknown string icons', () => {
      const badgeWithUnknownIcon: BadgeInfo = {
        ...mockBadge,
        icon: 'UnknownIcon'
      }
      
      render(<BadgeDisplay badge={badgeWithUnknownIcon} showAnimation={false} />)
      
      expect(screen.getByTestId('shield-check-icon')).toBeInTheDocument()
    })

    it('handles different icon types from icon map', () => {
      const iconTypes = ['Award', 'Star', 'Trophy', 'shield-check', 'award', 'star', 'trophy']
      
      iconTypes.forEach(iconType => {
        const testBadge: BadgeInfo = {
          ...mockBadge,
          name: `Test ${iconType}`,
          icon: iconType
        }
        
        const { unmount } = render(<BadgeDisplay badge={testBadge} showAnimation={false} />)
        
        // Should render without errors
        expect(screen.getByText(`Test ${iconType}`)).toBeInTheDocument()
        
        unmount()
      })
    })
  })

  describe('Animation Behavior', () => {
    it('shows animation by default', () => {
      render(<BadgeDisplay badge={mockBadge} />)
      
      // Badge element should have animation classes
      const badgeElement = screen.getByText('Cycle Breaker Badge')
      expect(badgeElement).toHaveClass('animate-bounce')
    })

    it('disables animation when showAnimation is false', () => {
      render(<BadgeDisplay badge={mockBadge} showAnimation={false} />)
      
      // Badge element should not have animation classes
      const badgeElement = screen.getByText('Cycle Breaker Badge')
      expect(badgeElement).not.toHaveClass('animate-bounce')
    })

    it('calls onAnimationComplete after animation duration', async () => {
      render(
        <BadgeDisplay 
          badge={mockBadge} 
          showAnimation={true} 
          onAnimationComplete={mockOnAnimationComplete} 
        />
      )
      
      // Wait for animation to complete (2000ms + buffer)
      await waitFor(() => {
        expect(mockOnAnimationComplete).toHaveBeenCalled()
      }, { timeout: 3000 })
    })

    it('shows celebration particles during animation', () => {
      const { container } = render(<BadgeDisplay badge={mockBadge} showAnimation={true} />)
      
      // Check for particle elements
      const particles = container.querySelectorAll('.animate-ping')
      expect(particles.length).toBeGreaterThan(0)
    })

    it('does not show particles when animation is disabled', () => {
      const { container } = render(<BadgeDisplay badge={mockBadge} showAnimation={false} />)
      
      // Should not have particle elements
      const particles = container.querySelectorAll('.animate-ping')
      expect(particles.length).toBe(0)
    })
  })

  describe('Styling and Colors', () => {
    it('applies badge color gradient correctly', () => {
      render(<BadgeDisplay badge={mockBadge} showAnimation={false} />)
      
      const badgeElement = screen.getByText('Cycle Breaker Badge')
      expect(badgeElement).toHaveClass('from-green-500', 'to-emerald-600')
      
      const iconWrapper = badgeElement.closest('div')?.previousElementSibling
      expect(iconWrapper).toHaveClass('from-green-500', 'to-emerald-600')
    })

    it('applies hover effects correctly', () => {
      const { container } = render(<BadgeDisplay badge={mockBadge} showAnimation={false} />)
      
      const mainContainer = container.firstChild as HTMLElement
      expect(mainContainer).toHaveClass('hover:shadow-xl', 'hover:scale-105')
    })

    it('applies size-specific styling', () => {
      const { rerender } = render(
        <BadgeDisplay badge={mockBadge} showAnimation={false} size="sm" />
      )
      
      // Small size should have smaller padding and text
      expect(screen.getByText('Cycle Breaker Badge')).toHaveClass('text-xs')
      
      rerender(<BadgeDisplay badge={mockBadge} showAnimation={false} size="lg" />)
      
      // Large size should have larger padding and text
      expect(screen.getByText('Cycle Breaker Badge')).toHaveClass('text-base')
    })
  })

  describe('Accessibility', () => {
    it('has proper text content for screen readers', () => {
      render(<BadgeDisplay badge={mockBadge} showAnimation={false} />)
      
      expect(screen.getByText('Cycle Breaker Badge')).toBeInTheDocument()
      expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
    })

    it('maintains focus management during animations', () => {
      const { container } = render(<BadgeDisplay badge={mockBadge} showAnimation={true} />)
      
      // Component should be focusable and not interfere with focus
      expect(container.firstChild).not.toHaveAttribute('tabindex', '-1')
    })

    it('provides proper ARIA labels and roles', () => {
      render(<BadgeDisplay badge={mockBadge} showAnimation={false} />)
      
      const badgeContainer = screen.getByRole('alert')
      expect(badgeContainer).toHaveAttribute('aria-label', 'Badge earned: Cycle Breaker Badge')
      expect(badgeContainer).toHaveAttribute('tabIndex', '0')
    })

    it('has proper focus styles', () => {
      const { container } = render(<BadgeDisplay badge={mockBadge} showAnimation={false} />)
      
      const badgeContainer = container.firstChild as HTMLElement
      expect(badgeContainer.className).toMatch(/focus:outline-none/)
      expect(badgeContainer.className).toMatch(/focus:ring-2/)
      expect(badgeContainer.className).toMatch(/focus:ring-green-500/)
    })

    it('hides decorative elements from screen readers', () => {
      render(<BadgeDisplay badge={mockBadge} showAnimation={false} />)
      
      // Icon should be hidden from screen readers
      const iconContainer = document.querySelector('[aria-hidden="true"]')
      expect(iconContainer).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty badge name gracefully', () => {
      const emptyBadge: BadgeInfo = {
        name: '',
        icon: 'ShieldCheck',
        color: 'from-gray-500 to-gray-600'
      }
      
      render(<BadgeDisplay badge={emptyBadge} showAnimation={false} />)
      
      // Should still render the structure
      expect(screen.getByText('Badge Earned!')).toBeInTheDocument()
    })

    it('handles very long badge names', () => {
      const longNameBadge: BadgeInfo = {
        name: 'This is a very long badge name that might cause layout issues',
        icon: 'ShieldCheck',
        color: 'from-green-500 to-emerald-600'
      }
      
      render(<BadgeDisplay badge={longNameBadge} showAnimation={false} />)
      
      expect(screen.getByText(longNameBadge.name)).toBeInTheDocument()
    })

    it('handles missing color gracefully', () => {
      const badgeWithoutColor: BadgeInfo = {
        name: 'Test Badge',
        icon: 'ShieldCheck',
        color: ''
      }
      
      render(<BadgeDisplay badge={badgeWithoutColor} showAnimation={false} />)
      
      // Should render without crashing
      expect(screen.getByText('Test Badge')).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('memoizes component to prevent unnecessary re-renders', () => {
      const { rerender } = render(<BadgeDisplay badge={mockBadge} showAnimation={false} />)
      
      // Re-render with same props should not cause issues
      rerender(<BadgeDisplay badge={mockBadge} showAnimation={false} />)
      
      expect(screen.getByText('Cycle Breaker Badge')).toBeInTheDocument()
    })

    it('handles rapid prop changes gracefully', () => {
      const { rerender } = render(<BadgeDisplay badge={mockBadge} size="sm" />)
      
      // Rapidly change props
      rerender(<BadgeDisplay badge={mockBadge} size="md" />)
      rerender(<BadgeDisplay badge={mockBadge} size="lg" />)
      rerender(<BadgeDisplay badge={mockBadge} size="sm" />)
      
      expect(screen.getByText('Cycle Breaker Badge')).toBeInTheDocument()
    })
  })
})