"use client"

import { ModuleLayout } from "@/components/layout/module-layout"
import { LoadingState } from "@/components/common/loading-state"
import { ErrorBoundary } from "@/components/common/error-boundary"
import { StoryContainer } from "@/components/modules/story/components"
import { aniseRayStory } from "@/components/modules/story/data/anise-ray-story"
import { STORY_BADGES } from "@/components/modules/story/data/story-badges"
import { StoryOutcome } from "@/types/story"
import { BadgeInfo } from "@/types/scenarios"
import { useState } from "react"

export default function StoryModule() {
  const [isLoading] = useState(false)
  const [error] = useState<Error | null>(null)

  const handleStoryComplete = (outcome: StoryOutcome) => {
    console.log('Story completed with outcome:', outcome)
    // Handle story completion - could save progress, show analytics, etc.
  }

  const handleBadgeEarned = (badge: BadgeInfo) => {
    console.log('Badge earned:', badge)
    // Handle badge earning - could save to user profile, show notification, etc.
  }

  return (
    <ErrorBoundary>
      <ModuleLayout
        title="Interactive Story: Anise & Ray"
        description="Learn to break cycles of hate speech through an interactive narrative experience"
        badge={{ text: "Story Module", variant: "secondary" }}
      >
        <LoadingState
          isLoading={isLoading}
          error={error}
          loadingText="Loading story..."
          errorTitle="Failed to load story module"
        >
          <div className="w-full max-w-4xl mx-auto py-6">
            <StoryContainer
              storyData={aniseRayStory}
              badges={STORY_BADGES}
              onComplete={handleStoryComplete}
              onBadgeEarned={handleBadgeEarned}
              className="min-h-[600px]"
            />
          </div>
        </LoadingState>
      </ModuleLayout>
    </ErrorBoundary>
  )
}