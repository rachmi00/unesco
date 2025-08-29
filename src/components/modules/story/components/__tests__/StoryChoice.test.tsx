import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { StoryChoice } from '../StoryChoice'
import { StoryChoice as StoryChoiceType } from '@/types/story'

const mockChoice: StoryChoiceType = {
  text: "Screenshot and post revenge comment",
  nextScene: "retaliation"
}

const mockOnSelect = jest.fn()

describe('StoryChoice', () => {
  beforeEach(() => {
    mockOnSelect.mockClear()
  })

  it('renders choice text correctly', () => {
    render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
      />
    )

    expect(screen.getByText(mockChoice.text)).toBeInTheDocument()
  })

  it('displays correct choice number', () => {
    render(
      <StoryChoice
        choice={mockChoice}
        index={2}
        onSelect={mockOnSelect}
      />
    )

    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('calls onSelect when button is clicked', () => {
    render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
      />
    )

    fireEvent.click(screen.getByRole('button'))
    expect(mockOnSelect).toHaveBeenCalledTimes(1)
  })

  it('calls onSelect when card is clicked', () => {
    const { container } = render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
      />
    )

    // Click on the card itself
    const card = container.firstChild as HTMLElement
    fireEvent.click(card)
    expect(mockOnSelect).toHaveBeenCalledTimes(1)
  })

  it('does not call onSelect when disabled', () => {
    render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
        disabled={true}
      />
    )

    fireEvent.click(screen.getByRole('button'))
    expect(mockOnSelect).not.toHaveBeenCalled()
  })

  it('applies disabled styling when disabled', () => {
    const { container } = render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
        disabled={true}
      />
    )

    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('opacity-50')
    expect(card).toHaveClass('cursor-not-allowed')
  })

  it('applies selected styling when selected', () => {
    const { container } = render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
        isSelected={true}
      />
    )

    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('ring-2')
    expect(card).toHaveClass('ring-indigo-500')
  })

  it('shows selection indicator when selected', () => {
    const { container } = render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
        isSelected={true}
      />
    )

    const indicator = container.querySelector('[class*="bg-gradient-to-r"]')
    expect(indicator).toBeInTheDocument()
  })

  it('has proper touch target size for mobile', () => {
    render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toHaveClass('min-h-[44px]')
  })

  it('has touch-manipulation class for mobile optimization', () => {
    render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
      />
    )

    const card = screen.getByText(mockChoice.text).closest('[class*="cursor-pointer"]')
    expect(card).toHaveClass('touch-manipulation')
  })

  it('supports keyboard navigation with Enter key', () => {
    render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
      />
    )

    const button = screen.getByRole('button')
    button.focus()
    
    fireEvent.keyDown(button, { key: 'Enter' })
    expect(mockOnSelect).toHaveBeenCalledTimes(1)
  })

  it('supports keyboard navigation with Space key', () => {
    render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
      />
    )

    const button = screen.getByRole('button')
    button.focus()
    
    fireEvent.keyDown(button, { key: ' ' })
    expect(mockOnSelect).toHaveBeenCalledTimes(1)
  })

  it('removes button from tab order when disabled', () => {
    render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
        disabled={true}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('tabIndex', '-1')
  })

  it('handles long choice text properly', () => {
    const longChoice: StoryChoiceType = {
      text: "This is a very long choice text that should wrap properly on mobile devices and not break the layout or cause any visual issues",
      nextScene: "next"
    }

    render(
      <StoryChoice
        choice={longChoice}
        index={0}
        onSelect={mockOnSelect}
      />
    )

    const text = screen.getByText(longChoice.text)
    expect(text).toHaveClass('whitespace-normal', 'break-words')
  })

  it('applies hover effects correctly', () => {
    const { container } = render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
      />
    )

    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('hover:shadow-lg')
    expect(card).toHaveClass('hover:scale-[1.02]')
    expect(card).toHaveClass('hover:-translate-y-0.5')
  })

  it('applies active state for touch feedback', () => {
    const { container } = render(
      <StoryChoice
        choice={mockChoice}
        index={0}
        onSelect={mockOnSelect}
      />
    )

    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('active:scale-[0.98]')
    expect(card).toHaveClass('active:translate-y-0')
  })
})