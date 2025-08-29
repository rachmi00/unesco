import React from "react"
import { cn } from "@/lib/utils"

interface StoryTransitionProps {
  isVisible: boolean
  message?: string
  className?: string
}

export const StoryTransition = React.memo(function StoryTransition({
  isVisible,
  message = "Loading next scene...",
  className
}: StoryTransitionProps) {
  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-blue-900/90",
        "backdrop-blur-sm",
        "animate-in fade-in duration-300",
        className
      )}
      role="status"
      aria-label={message}
    >
      <div className="text-center space-y-6">
        {/* Fun loading animation */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-4 h-4 bg-white rounded-full animate-bounce" />
          </div>
          
          {/* Sparkle effects */}
          <div className="absolute -top-8 -left-8 w-2 h-2 bg-yellow-300 rounded-full story-sparkle" />
          <div className="absolute -top-6 right-6 w-1.5 h-1.5 bg-pink-300 rounded-full story-sparkle [animation-delay:0.5s]" />
          <div className="absolute top-8 -right-4 w-1 h-1 bg-blue-300 rounded-full story-sparkle [animation-delay:1s]" />
        </div>
        
        {/* Loading message */}
        <p className="text-white text-lg font-medium animate-pulse">
          {message}
        </p>
      </div>
    </div>
  )
})