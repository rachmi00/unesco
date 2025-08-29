import { BadgeInfo } from "@/types/scenarios"
import { STORY_BADGES as STORY_BADGE_CONFIGS } from "@/lib/data/constants"

export const CYCLE_BREAKER_BADGE: BadgeInfo = {
  id: "cycle-breaker",
  name: STORY_BADGE_CONFIGS["Cycle Breaker Badge"].name,
  description: "Awarded for successfully breaking negative cycles in relationships",
  icon: STORY_BADGE_CONFIGS["Cycle Breaker Badge"].icon,
  color: STORY_BADGE_CONFIGS["Cycle Breaker Badge"].color,
  criteria: {
    minScore: 80,
    completedScenarios: 5
  }
}

export const STORY_BADGES: Record<string, BadgeInfo> = {
  "Cycle Breaker Badge": CYCLE_BREAKER_BADGE
}