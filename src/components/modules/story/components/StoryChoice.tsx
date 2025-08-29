import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { StoryChoice as StoryChoiceType } from "@/types/story"

interface StoryChoiceProps {
  choice: StoryChoiceType
  index: number
  onSelect: () => void
  disabled?: boolean
  isSelected?: boolean
}

export const StoryChoice = React.memo(function StoryChoice({
  choice,
  index,
  onSelect,
  disabled = false,
  isSelected = false
}: StoryChoiceProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-out cursor-pointer",
        "border border-gray-200/60 bg-gradient-to-br from-white via-white to-gray-50/30",
        "hover:shadow-lg hover:shadow-indigo-200/20 hover:scale-[1.02] hover:-translate-y-0.5",
        "focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2",
        "active:scale-[0.98] active:translate-y-0",
        isSelected && "ring-2 ring-indigo-500 shadow-lg shadow-indigo-200/50 scale-[1.02] -translate-y-0.5",
        disabled && "opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0 hover:shadow-none",
        "touch-manipulation" // Optimizes touch interactions on mobile
      )}
      onClick={!disabled ? onSelect : undefined}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Choice number indicator */}
      <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold flex items-center justify-center shadow-md">
        {index + 1}
      </div>

      <CardContent className="p-4 pt-12 relative">
        <Button
          variant="ghost"
          className="w-full h-auto p-0 text-left justify-start hover:bg-transparent min-h-[44px]" // Minimum touch target size
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault()
              onSelect()
            }
          }}
        >
          <div className="w-full">
            <p className="text-base font-medium leading-relaxed text-gray-900 group-hover:text-indigo-900 transition-colors duration-300 whitespace-normal break-words">
              {choice.text}
            </p>
          </div>
        </Button>
      </CardContent>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
      )}
    </Card>
  )
})