import React from "react"
import { cn } from "@/lib/utils"
import { Trophy, Target, Zap, Star } from "lucide-react"
import { Progress } from "@/components/ui/progress" // Recommended: Use shadcn/ui Progress

// If you don't have shadcn/ui Progress, you can use this simple fallback:
// const Progress = ({ value, className, indicatorClassName }: { value: number, className?: string, indicatorClassName?: string }) => (
//   <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
//     <div 
//       className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)} 
//       style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
//     />
//   </div>
// );


interface ProgressTrackerProps {
  current: number
  total: number
  points?: number
  maxPoints?: number
  showPoints?: boolean
  label?: string
  className?: string
}

// Helper functions can be defined outside the component for better performance
const getProgressColor = (percentage: number) => {
  if (percentage >= 80) return "from-green-500 to-emerald-500"
  if (percentage >= 60) return "from-blue-400 to-cyan-400"
  if (percentage >= 40) return "from-yellow-400 to-orange-400"
  return "from-gray-400 to-gray-500"
}

const getScoreIcon = (percentage: number) => {
  const iconProps = { className: "w-4 h-4" }
  if (percentage >= 80) return <Trophy {...iconProps} />
  if (percentage >= 60) return <Star {...iconProps} />
  if (percentage >= 40) return <Target {...iconProps} />
  return <Zap {...iconProps} />
}

export const ProgressTracker = React.memo(function ProgressTracker({ 
  current, 
  total, 
  points, 
  maxPoints,
  showPoints = true,
  label = "Progress",
  className 
}: ProgressTrackerProps) {
  
  // Ensure we don't divide by zero
  const progressPercentage = total > 0 ? (current / total) * 100 : 0
  const pointsPercentage = (points && maxPoints) ? (points / maxPoints) * 100 : 0
  
  const hasScore = showPoints && points !== undefined && maxPoints !== undefined;

  return (
    <div 
      className={cn(
        "w-full rounded-lg border bg-card text-card-foreground p-3 sm:p-4",
        className
      )}
    >
      {/* This layout is mobile-first:
        - It's a column on small screens (`flex-col`).
        - It becomes a row on larger screens (`sm:flex-row`).
      */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        {/* Left Side: Label and status text */}
        <div className="flex-shrink-0">
          <p className="font-semibold text-sm">{label}</p>
          <p className="text-xs text-muted-foreground">
            {current} of {total} completed
          </p>
        </div>

        {/* Right Side: Score and Progress Bar */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          
          {/* Score Indicator */}
          {hasScore && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              {getScoreIcon(pointsPercentage)}
              <span className="text-foreground font-semibold">{points}</span>
              <span>/ {maxPoints} pts</span>
            </div>
          )}
          
          {/* Unified Progress Bar */}
          <div className="w-24 flex-shrink-0">
            <Progress 
              value={progressPercentage} 
              className={cn("h-2 [&>div]:bg-gradient-to-r", getProgressColor(hasScore ? pointsPercentage : progressPercentage))}
            />
            <p className="text-xs text-right text-muted-foreground mt-1">
              {Math.round(progressPercentage)}%
            </p>
          </div>

        </div>
      </div>
    </div>
  )
})