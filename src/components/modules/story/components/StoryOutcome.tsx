import React, { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StoryScene } from "@/types/story"
import { BadgeInfo } from "@/types/scenarios"
import { RotateCcw, TrendingUp, TrendingDown, ShieldCheck, AlertTriangle } from "lucide-react"
import Image from "next/image"

interface StoryOutcomeProps {
  scene: StoryScene
  badge?: BadgeInfo
  onRestart: () => void
  className?: string
}

export const StoryOutcome = React.memo(function StoryOutcome({
  scene,
  badge,
  onRestart,
  className
}: StoryOutcomeProps) {
  const isPositive = scene.outcomeType === 'positive'
  const isNeutral = scene.outcomeType === 'neutral'
  const outcomeRef = useRef<HTMLDivElement>(null)
  const announcementRef = useRef<HTMLDivElement>(null)

  // Announce outcome to screen readers
  useEffect(() => {
    if (announcementRef.current) {
      const outcomeType = isPositive ? 'positive' : 'negative'
      const badgeText = badge ? ` You earned the ${badge.name}!` : ''
      announcementRef.current.textContent = `Story completed with ${outcomeType} outcome. ${scene.text}${badgeText}`
    }

    // Focus the outcome container for keyboard users
    if (outcomeRef.current) {
      outcomeRef.current.focus()
    }
  }, [scene.text, isPositive, badge])
  
  // Styling configurations for positive vs negative vs neutral outcomes
  const outcomeConfig = {
    positive: {
      cardBorder: "border-green-200/60",
      cardBg: "from-green-50/50 via-emerald-50/30 to-white",
      cardShadow: "shadow-green-100/50",
      accentGradient: "from-green-500 to-emerald-600",
      icon: TrendingUp,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      titleColor: "text-green-900",
      textColor: "text-green-800",
      badgeGradient: "from-green-500 to-emerald-600"
    },
    negative: {
      cardBorder: "border-red-200/60", 
      cardBg: "from-red-50/50 via-pink-50/30 to-white",
      cardShadow: "shadow-red-100/50",
      accentGradient: "from-red-500 to-pink-600",
      icon: TrendingDown,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      titleColor: "text-red-900",
      textColor: "text-red-800",
      badgeGradient: "from-red-500 to-pink-600"
    },
    neutral: {
      cardBorder: "border-gray-200/60",
      cardBg: "from-gray-50/50 via-slate-50/30 to-white",
      cardShadow: "shadow-gray-100/50",
      accentGradient: "from-gray-500 to-slate-600",
      icon: ShieldCheck,
      iconColor: "text-gray-600",
      iconBg: "bg-gray-100",
      titleColor: "text-gray-900",
      textColor: "text-gray-800",
      badgeGradient: "from-gray-500 to-slate-600"
    }
  }

  const config = outcomeConfig[isPositive ? 'positive' : isNeutral ? 'neutral' : 'negative']
  const IconComponent = config.icon

  // Educational messages based on outcome type
  const getEducationalMessage = () => {
    if (isPositive) {
      return {
        title: "Cycle Broken Successfully",
        message: "By choosing dialogue over retaliation, you've demonstrated how individual choices can break cycles of hate speech and build stronger communities.",
        impact: "Your response shows that empathy and direct communication are powerful tools for addressing stereotypes and promoting understanding."
      }
    } else if (isNeutral) {
      return {
        title: "Status Quo Maintained",
        message: "Sometimes choosing not to engage prevents immediate conflict, but it also means missed opportunities for positive change.",
        impact: "While avoiding confrontation can be self-protective, consider how small actions might contribute to breaking cycles of harmful speech."
      }
    } else {
      return {
        title: "The Cycle Continues", 
        message: "Retaliation often escalates conflicts and reinforces the very stereotypes we want to challenge, creating more division in our communities.",
        impact: "Consider how different responses might lead to more constructive outcomes and help break cycles of hate speech."
      }
    }
  }

  const educationalContent = getEducationalMessage()

  return (
    <>
      {/* Screen reader announcements */}
      <div
        ref={announcementRef}
        className="sr-only"
        aria-live="assertive"
        aria-atomic="true"
      />
      
      <Card
        ref={outcomeRef}
        tabIndex={-1}
        role="region"
        aria-label={`Story outcome: ${isPositive ? 'positive' : isNeutral ? 'neutral' : 'negative'} ending`}
        className={cn(
          "story-card group relative overflow-hidden transition-all duration-700 ease-out",
          "border-2", config.cardBorder,
          "bg-gradient-to-br", config.cardBg,
          "shadow-xl", config.cardShadow,
          // Enhanced desktop experience
          "mx-2 sm:mx-0 max-w-2xl lg:max-w-4xl",
          // Animation
          "animate-in slide-in-from-bottom-4 fade-in duration-700",
          // Focus styles for accessibility
          "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          className
        )}
      >
      {/* Animated background gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
        isPositive ? "from-green-500/5 via-emerald-500/5 to-green-500/5" : 
        isNeutral ? "from-gray-500/5 via-slate-500/5 to-gray-500/5" :
        "from-red-500/5 via-pink-500/5 to-red-500/5"
      )} />
      
      {/* Fun celebration effects for positive outcomes */}
      {isPositive && (
        <>
          <div className="absolute top-6 left-6 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 story-sparkle" />
          <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 story-sparkle" />
          <div className="absolute bottom-8 left-8 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-500 story-sparkle" />
          <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 story-sparkle" />
          <div className="absolute bottom-16 right-16 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-400 story-sparkle" />
        </>
      )}

      <CardContent className="p-0 relative z-10">
        {/* Image Section with enhanced desktop layout */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn(
              "relative w-full h-full",
              isPositive ? "bg-gradient-to-br from-green-100 via-emerald-100 to-blue-100" : 
              isNeutral ? "bg-gradient-to-br from-gray-100 via-slate-100 to-blue-100" :
              "bg-gradient-to-br from-red-100 via-pink-100 to-orange-100"
            )}>
              <Image
                src={scene.image}
                alt={`${isPositive ? 'Positive' : isNeutral ? 'Neutral' : 'Negative'} outcome illustration: ${scene.text}`}
                fill
                className="object-cover transition-all duration-500 pixel-art group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
              />
              
              {/* Outcome overlay */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-t to-transparent",
                isPositive ? "from-green-900/10" : 
                isNeutral ? "from-gray-900/10" :
                "from-red-900/10"
              )} />
              

            </div>
          </div>

          {/* Outcome indicator overlay */}
          <div className="absolute top-4 right-4">
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm border",
              config.iconBg, config.cardBorder
            )}>
              <IconComponent className={cn("w-4 h-4", config.iconColor)} />
              <span className={cn("text-sm font-semibold", config.titleColor)}>
                {isPositive ? "Positive" : isNeutral ? "Neutral" : "Negative"} Outcome
              </span>
            </div>
          </div>
        </div>

        {/* Content Section with enhanced desktop spacing */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Scene Text */}
          <div className="space-y-3 animate-in slide-in-from-left-2 fade-in duration-500 delay-200">
            <p className={cn(
              "leading-relaxed font-medium",
              "text-base sm:text-lg lg:text-xl",
              config.textColor,
              "group-hover:scale-[1.01] transition-transform duration-300"
            )}>
              {scene.text}
            </p>
          </div>

          {/* Badge Display for Positive Outcomes */}
          {isPositive && badge && (
            <div 
              className="animate-in slide-in-from-bottom-2 fade-in duration-500 delay-300"
              role="alert"
              aria-label={`Congratulations! You earned the ${badge.name}`}
            >
              <div className={cn(
                "flex items-center justify-center p-4 rounded-xl border-2",
                "bg-gradient-to-r from-white to-green-50/50",
                "border-green-200/60 shadow-lg"
              )}>
                <div className="flex items-center gap-3">
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      "bg-gradient-to-br", config.badgeGradient,
                      "animate-pulse story-bounce shadow-lg"
                    )}
                    aria-hidden="true"
                  >
                    <ShieldCheck className="w-6 h-6 text-white story-wiggle" />
                  </div>
                  <div>
                    <Badge className={cn(
                      "text-sm font-bold px-4 py-2 border-0 shadow-md",
                      "bg-gradient-to-r", config.badgeGradient,
                      "text-white hover:scale-105 transition-transform duration-200"
                    )}>
                      {badge.name}
                    </Badge>
                    <p className="text-xs text-green-700 mt-1" aria-hidden="true">Badge Earned!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Educational Messaging */}
          <div className="space-y-4 animate-in slide-in-from-bottom-2 fade-in duration-500 delay-400">
            {/* Main Educational Message */}
            <div className={cn(
              "p-4 rounded-xl border-2 bg-white/80 backdrop-blur-sm",
              config.cardBorder
            )}>
              <div className="flex items-start gap-3">
                <div className={cn(
                  "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5",
                  config.iconBg
                )}>
                  {isPositive ? (
                    <ShieldCheck className={cn("w-5 h-5", config.iconColor)} />
                  ) : (
                    <AlertTriangle className={cn("w-5 h-5", config.iconColor)} />
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className={cn("font-semibold text-sm", config.titleColor)}>
                    {educationalContent.title}
                  </h3>
                  <p className={cn("text-sm leading-relaxed", config.textColor)}>
                    {educationalContent.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Analysis */}
            <div className={cn(
              "p-4 rounded-xl border bg-white/60 backdrop-blur-sm",
              "border-gray-200/60"
            )}>
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mt-0.5">
                  <IconComponent className="w-5 h-5 text-gray-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-gray-900">
                    Community Impact
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-800">
                    {educationalContent.impact}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Restart Button */}
          <div className="pt-2 animate-in slide-in-from-bottom-2 fade-in duration-500 delay-500">
            <Button
              onClick={onRestart}
              variant="outline"
              className={cn(
                "story-choice w-full h-12 lg:h-14 text-base lg:text-lg font-semibold transition-all duration-300",
                "border-2 border-gray-300 hover:border-indigo-400",
                "bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50",
                "text-gray-900 hover:text-indigo-900",
                "shadow-sm hover:shadow-lg hover:shadow-indigo-200/50",
                "active:scale-[0.98]",
                // Enhanced accessibility
                "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none",
                "touch-manipulation min-h-[44px]"
              )}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onRestart()
                }
              }}
              aria-label="Restart the story from the beginning"
            >
              <RotateCcw className="w-5 h-5 mr-2" aria-hidden="true" />
              Try Story Again
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Bottom accent line */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r",
        config.accentGradient
      )} />
    </Card>
    </>
  )
})