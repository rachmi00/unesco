import React, { useCallback, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { StoryData, StoryOutcome } from '@/types/story'
import { BadgeInfo } from '@/types/scenarios'
import { useStoryNavigation } from '../hooks/useStoryNavigation'
import { StoryScene } from './StoryScene'
import { StoryOutcome as StoryOutcomeComponent } from './StoryOutcome'
import { StoryErrorBoundary } from './StoryErrorBoundary'
import { Loader2, AlertTriangle } from 'lucide-react'
import { RotateCcw } from 'lucide-react'
import { useOptimizedStoryData, preloadStoryImages, measureStoryPerformance } from '../utils/performance'

interface StoryContainerProps {
  storyData: StoryData
  badges?: Record<string, BadgeInfo>
  onComplete?: (outcome: StoryOutcome) => void
  onBadgeEarned?: (badge: BadgeInfo) => void
  className?: string
  startingScene?: string
}

export const StoryContainer = React.memo(function StoryContainer({
  storyData,
  badges = {},
  onComplete,
  onBadgeEarned,
  className,
  startingScene = 'scene1'
}: StoryContainerProps) {
  // Optimize story data processing
  const optimizedStoryData = useOptimizedStoryData(storyData)
  
  const {
    currentScene,
    isLoading,
    isComplete,
    outcome,
    choiceHistory,
    error,
    isInitialized,
    selectChoice,
    restartStory
  } = useStoryNavigation({
    storyData,
    startingScene
  })

  // Preload images for better performance
  useEffect(() => {
    if (optimizedStoryData.storyData) {
      preloadStoryImages(optimizedStoryData.storyData).catch(err => {
        console.warn('Failed to preload some story images:', err)
      })
    }
  }, [optimizedStoryData.storyData])

  // Handle story completion
  useEffect(() => {
    if (isComplete && outcome && onComplete) {
      onComplete(outcome)
    }
  }, [isComplete, outcome, onComplete])

  // Handle badge earning
  useEffect(() => {
    if (isComplete && outcome?.badge && onBadgeEarned) {
      const badgeInfo = badges[outcome.badge]
      if (badgeInfo) {
        onBadgeEarned(badgeInfo)
      }
    }
  }, [isComplete, outcome, badges, onBadgeEarned])

  // Handle restart with performance measurement
  const handleRestart = useCallback(() => {
    measureStoryPerformance('restart', () => {
      restartStory()
    })
  }, [restartStory])

  // Optimized choice selection handler
  const handleChoiceSelect = useCallback((choice: { text: string; nextScene: string }) => {
    measureStoryPerformance('choice-selection', () => {
      selectChoice(choice)
    })
  }, [selectChoice])

  // Loading state during initialization
  if (isLoading && !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-[400px]" data-testid="story-loading-state">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading story...</span>
        </div>
      </div>
    )
  }

  // Error state - story initialization failed
  if (error && !currentScene) {
    return (
      <Card className="max-w-2xl mx-auto border-red-200 bg-red-50">
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-red-800">Story Error</h3>
            <p className="text-sm text-red-600 mt-2">
              {error || 'Unable to load the story. Please try again.'}
            </p>
          </div>

          <Button 
            onClick={handleRestart} 
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-100"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Error state - no current scene but story is initialized
  if (!currentScene) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 text-center space-y-4">
          <div className="text-red-600">
            <h3 className="text-lg font-semibold">Scene Not Found</h3>
            <p className="text-sm text-gray-600 mt-2">
              The current story scene could not be loaded.
            </p>
          </div>
          <Button onClick={handleRestart} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart Story
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <StoryErrorBoundary onReset={handleRestart}>
      <div className={cn(
        "w-full max-w-4xl lg:max-w-6xl mx-auto space-y-6 lg:space-y-8",
        "px-4 sm:px-6 lg:px-8",
        // Fun background pattern for desktop
        "relative",
        className
      )}>
        {/* Decorative background elements for desktop */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-100/30 to-blue-100/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-100/20 to-yellow-100/20 rounded-full blur-3xl" />
        </div>
        {/* Enhanced Story Header */}
        <header className="text-center space-y-4 lg:space-y-6">
          <div className="relative">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 story-float">
              Anise & Ray
            </h1>
            {/* Fun decorative elements */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full story-sparkle" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full story-sparkle [animation-delay:0.5s]" />
          </div>
          <p className="text-sm lg:text-base text-gray-600 max-w-2xl mx-auto">
            An Interactive Story About Breaking Cycles of Hate Speech
          </p>
          
          {/* Enhanced Progress indicator */}
          <div 
            className="flex items-center justify-center gap-3 mt-4 lg:mt-6"
            role="progressbar"
            aria-label="Story progress"
            aria-valuenow={choiceHistory.length}
            aria-valuemin={0}
            aria-valuemax={2}
          >
            <div className="flex items-center gap-2" aria-hidden="true">
              {Object.keys(storyData).slice(0, 3).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-500",
                    "shadow-sm",
                    choiceHistory.length > index 
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 scale-110 story-bounce" 
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                />
              ))}
            </div>
            <span className="text-xs lg:text-sm text-gray-500 ml-2 font-medium">
              {choiceHistory.length} / 2 choices made
            </span>
          </div>
        </header>

        {/* Main Story Content */}
        <main className="relative" role="main" aria-label="Interactive story content">
          {isComplete && outcome ? (
            // Story Outcome
            <StoryOutcomeComponent
              scene={currentScene}
              badge={outcome.badge ? badges[outcome.badge] : undefined}
              onRestart={handleRestart}
              className="animate-in slide-in-from-bottom-4 fade-in duration-700"
            />
          ) : (
            // Active Story Scene
            <StoryScene
              scene={currentScene}
              onChoiceSelect={handleChoiceSelect}
              isActive={!isLoading && isInitialized}
              className="animate-in slide-in-from-bottom-4 fade-in duration-700"
            />
          )}
        </main>

        {/* Enhanced Loading overlay for scene transitions */}
        {isLoading && isInitialized && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-indigo-50/50 to-purple-50/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
            <div className="text-center space-y-4">
              <div className="relative">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-yellow-400 rounded-full story-sparkle" />
              </div>
              <p className="text-sm text-indigo-700 font-medium">Loading next scene...</p>
            </div>
          </div>
        )}

        {/* Enhanced Story Controls */}
        {!isComplete && (
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleRestart}
              variant="ghost"
              size="sm"
              className={cn(
                "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50",
                "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none",
                "touch-manipulation min-h-[44px] lg:min-h-[48px]",
                "transition-all duration-300 hover:scale-105",
                "border border-transparent hover:border-indigo-200"
              )}
              disabled={isLoading}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !isLoading) {
                  e.preventDefault()
                  handleRestart()
                }
              }}
              aria-label="Restart the story from the beginning"
            >
              <RotateCcw className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
              Restart Story
            </Button>
          </div>
        )}

        {/* Error indicator for development */}
        {process.env.NODE_ENV === 'development' && error && (
          <Card className="mt-4 border-yellow-200 bg-yellow-50">
            <CardContent className="p-3">
              <div className="text-sm text-yellow-800">
                <strong>Development Warning:</strong> {error}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Choice History (for debugging/testing) */}
        {process.env.NODE_ENV === 'development' && choiceHistory.length > 0 && (
          <Card className="mt-8 border-dashed border-gray-300">
            <CardContent className="p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Choice History (Dev Mode)
              </h4>
              <div className="space-y-1">
                {choiceHistory.map((choice, index) => (
                  <div key={index} className="text-xs text-gray-600">
                    {index + 1}. {choice}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </StoryErrorBoundary>
  )
})