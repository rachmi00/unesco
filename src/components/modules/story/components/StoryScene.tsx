import React, { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StoryScene as StorySceneType, StoryChoice } from "@/types/story"
import Image from "next/image"

interface StorySceneProps {
  scene: StorySceneType
  onChoiceSelect: (choice: StoryChoice) => void
  isActive: boolean
  className?: string
}

export const StoryScene = React.memo(function StoryScene({
  scene,
  onChoiceSelect,
  isActive,
  className
}: StorySceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const announcementRef = useRef<HTMLDivElement>(null)

  // Announce scene changes to screen readers
  useEffect(() => {
    if (isActive && announcementRef.current) {
      // Clear previous announcement
      announcementRef.current.textContent = ''
      
      // Add new announcement after a brief delay
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = `New scene: ${scene.text}`
        }
      }, 100)
    }
  }, [isActive, scene.text])

  // Focus management for keyboard navigation
  useEffect(() => {
    if (isActive && sceneRef.current) {
      // Focus the scene container when it becomes active
      sceneRef.current.focus()
    }
  }, [isActive])

  return (
    <>
      {/* Screen reader announcements */}
      <div
        ref={announcementRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
      
      <Card
        ref={sceneRef}
        tabIndex={-1}
        role="region"
        aria-label={`Story scene: ${scene.text.substring(0, 50)}...`}
        className={cn(
          "story-card group relative overflow-hidden transition-all duration-700 ease-out",
          "border border-gray-200/60 bg-gradient-to-br from-white via-white to-gray-50/30",
          "shadow-lg hover:shadow-xl hover:shadow-indigo-200/50",
          // Enhanced desktop experience
          "mx-2 sm:mx-0 max-w-2xl lg:max-w-4xl",
          // Animation classes
          isActive ? "animate-in slide-in-from-bottom-4 fade-in duration-700" : "opacity-0",
          // Focus styles for accessibility
          "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          className
        )}
      >
      {/* Animated background gradient with sparkle effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Fun sparkle effects for desktop */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 animate-pulse" />
      <div className="absolute top-8 right-8 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-400 animate-pulse" />
      <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 animate-pulse" />

      <CardContent className="p-0 relative z-10">
        {/* Image Section with enhanced desktop layout */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors duration-500">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Pixel art placeholder with loading state */}
            <div className="relative w-full h-full bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">
              <Image
                src={scene.image}
                alt={`Scene illustration showing: ${scene.text}`}
                fill
                className="object-cover transition-all duration-500 pixel-art group-hover:scale-105"
                onError={(e) => {
                  // Fallback to placeholder on error
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
              />
              {/* Pixel art style overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />


            </div>
          </div>
        </div>

        {/* Text Content Section with enhanced desktop spacing */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Scene Text - Mobile optimized (1-2 sentences max) */}
          <div className="space-y-3">
            <p className={cn(
              "text-gray-900 leading-relaxed font-medium",
              // Enhanced text sizing for desktop
              "text-base sm:text-lg lg:text-xl",
              // Fun text shadow on hover
              "group-hover:text-indigo-900 transition-colors duration-300",
              // Smooth text animation
              isActive ? "animate-in slide-in-from-left-2 fade-in duration-500 delay-200" : ""
            )}>
              {scene.text}
            </p>
          </div>

          {/* Choices Section with enhanced desktop layout */}
          {scene.choices && scene.choices.length > 0 && (
            <div 
              className={cn(
                "space-y-3 sm:space-y-4 lg:space-y-5",
                // Desktop grid layout for multiple choices
                scene.choices.length > 2 ? "lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0" : "",
                isActive ? "animate-in slide-in-from-bottom-2 fade-in duration-500 delay-400" : ""
              )}
              role="group"
              aria-label="Story choices"
            >
              {scene.choices.map((choice, index) => (
                <Button
                  key={`${choice.nextScene}-${index}`}
                  variant="outline"
                  className={cn(
                    "story-choice w-full h-auto p-4 lg:p-5 text-left justify-start transition-all duration-300",
                    "border-2 border-gray-200 hover:border-indigo-300",
                    "bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50",
                    "text-gray-900 hover:text-indigo-900",
                    "shadow-sm hover:shadow-lg hover:shadow-indigo-200/50",
                    // Mobile-friendly touch targets
                    "min-h-[44px] sm:min-h-[48px] lg:min-h-[56px]",
                    // Enhanced focus styles for keyboard navigation
                    "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none",
                    // Touch optimization
                    "touch-manipulation",
                    // Staggered animation
                    `animate-in slide-in-from-right-2 fade-in duration-500`,
                    `delay-${500 + (index * 100)}`
                  )}
                  onClick={() => onChoiceSelect(choice)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onChoiceSelect(choice)
                    }
                  }}
                  aria-label={`Choice ${index + 1}: ${choice.text}`}
                  aria-describedby={`choice-description-${index}`}
                >
                  <div className="flex items-center gap-3 w-full">
                    {/* Choice indicator with fun animations */}
                    <div 
                      className={cn(
                        "shrink-0 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full",
                        "bg-gradient-to-br from-indigo-500 to-purple-600",
                        "text-white text-sm font-bold flex items-center justify-center",
                        "transition-all duration-300 group-hover:scale-110 group-hover:rotate-12",
                        "shadow-md group-hover:shadow-lg"
                      )}
                      aria-hidden="true"
                    >
                      {index + 1}
                    </div>

                    {/* Choice text with enhanced desktop styling */}
                    <span 
                      id={`choice-description-${index}`}
                      className={cn(
                        "flex-1 font-medium leading-relaxed",
                        "text-sm sm:text-base lg:text-lg",
                        "whitespace-normal break-words",
                        "group-hover:text-indigo-800 transition-colors duration-200"
                      )}
                    >
                      {choice.text}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      {/* Bottom accent line for visual appeal */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-60" />
    </Card>
    </>
  )
})