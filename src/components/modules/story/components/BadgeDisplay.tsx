import React, { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { BadgeInfo } from "@/types/scenarios"
import { ShieldCheck, Award, Star, Trophy } from "lucide-react"

interface BadgeDisplayProps {
  badge: BadgeInfo
  showAnimation?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onAnimationComplete?: () => void
}

// Icon mapping for string-based icons
const iconMap: Record<string, React.ElementType> = {
  'ShieldCheck': ShieldCheck,
  'shield-check': ShieldCheck,
  'Award': Award,
  'award': Award,
  'Star': Star,
  'star': Star,
  'Trophy': Trophy,
  'trophy': Trophy,
}

export const BadgeDisplay = React.memo(function BadgeDisplay({
  badge,
  showAnimation = true,
  size = 'md',
  className,
  onAnimationComplete
}: BadgeDisplayProps) {
  const [isAnimating, setIsAnimating] = useState(showAnimation)
  const [isVisible, setIsVisible] = useState(false)

  // Handle animation lifecycle
  useEffect(() => {
    if (showAnimation) {
      // Start animation after a brief delay
      const showTimer = setTimeout(() => {
        setIsVisible(true)
      }, 100)

      // Complete animation after duration
      const completeTimer = setTimeout(() => {
        setIsAnimating(false)
        onAnimationComplete?.()
      }, 2000)

      return () => {
        clearTimeout(showTimer)
        clearTimeout(completeTimer)
      }
    } else {
      setIsVisible(true)
    }
  }, [showAnimation, onAnimationComplete])

  // Get icon component
  const getIconComponent = () => {
    if (typeof badge.icon === 'string') {
      return iconMap[badge.icon] || ShieldCheck
    }
    return badge.icon
  }

  const IconComponent = getIconComponent()

  // Size configurations
  const sizeConfig = {
    sm: {
      container: "p-3",
      iconWrapper: "w-8 h-8",
      icon: "w-4 h-4",
      badge: "text-xs px-3 py-1",
      label: "text-xs",
      spacing: "gap-2"
    },
    md: {
      container: "p-4",
      iconWrapper: "w-10 h-10",
      icon: "w-6 h-6",
      badge: "text-sm px-4 py-2",
      label: "text-xs",
      spacing: "gap-3"
    },
    lg: {
      container: "p-6",
      iconWrapper: "w-12 h-12",
      icon: "w-8 h-8",
      badge: "text-base px-6 py-3",
      label: "text-sm",
      spacing: "gap-4"
    }
  }

  const config = sizeConfig[size]

  return (
    <div
      role="alert"
      aria-label={`Badge earned: ${badge.name}`}
      className={cn(
        "flex items-center justify-center rounded-xl border-2 transition-all duration-500",
        "bg-gradient-to-r from-white to-green-50/50",
        "border-green-200/60 shadow-lg",
        config.container,
        // Animation classes
        isVisible && showAnimation && "animate-in slide-in-from-bottom-2 fade-in duration-700",
        !isVisible && "opacity-0 translate-y-4",
        // Hover effects
        "hover:shadow-xl hover:scale-105 transition-transform duration-300",
        // Focus styles for accessibility
        "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
        className
      )}
      tabIndex={0}
    >
      <div className={cn("flex items-center", config.spacing)}>
        {/* Animated Icon */}
        <div
          className={cn(
            "rounded-full flex items-center justify-center transition-all duration-500",
            "bg-gradient-to-br", badge.color,
            config.iconWrapper,
            // Animation effects
            isAnimating && "animate-pulse",
            showAnimation && "hover:rotate-12 transition-transform duration-300"
          )}
          aria-hidden="true"
        >
          <IconComponent className={cn(config.icon, "text-white")} />
        </div>

        {/* Badge Content */}
        <div className="flex flex-col items-start">
          <Badge
            className={cn(
              "font-bold border-0 shadow-md transition-all duration-300",
              "bg-gradient-to-r", badge.color,
              "text-white hover:scale-105",
              config.badge,
              // Animation effects
              isAnimating && "animate-bounce"
            )}
          >
            {badge.name}
          </Badge>
          
          {/* Badge Earned Label */}
          <p className={cn(
            "text-green-700 mt-1 font-medium transition-opacity duration-500",
            config.label,
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            Badge Earned!
          </p>
        </div>
      </div>

      {/* Celebration particles effect (CSS-only) */}
      {showAnimation && isAnimating && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {/* Sparkle effects */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
          <div className="absolute top-4 left-3 w-1 h-1 bg-green-400 rounded-full animate-ping delay-300" />
          <div className="absolute bottom-3 right-4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping delay-500" />
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-700" />
        </div>
      )}
    </div>
  )
})