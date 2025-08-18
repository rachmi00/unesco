import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  currentScenario: number
  totalScenarios: number
  canGoPrevious: boolean
  canGoNext: boolean
  onPrevious: () => void
  onNext: () => void
  onReset?: () => void
  nextButtonText?: string
  showReset?: boolean
  className?: string
}

export const Navigation = React.memo(function Navigation({ 
  currentScenario, 
  totalScenarios, 
  canGoPrevious, 
  canGoNext, 
  onPrevious, 
  onNext,
  onReset,
  nextButtonText = "Next",
  showReset = false,
  className 
}: NavigationProps) {
  const isLastScenario = currentScenario === totalScenarios - 1

  return (
    <div className={cn(
      "flex flex-col sm:flex-row items-center justify-between gap-4 p-6",
      "bg-gradient-to-r from-white via-gray-50/50 to-white",
      "rounded-2xl border border-gray-200/60 shadow-lg",
      "backdrop-blur-sm",
      className
    )}>
      {/* Left side - Previous & Reset */}
      <div className="flex items-center gap-3">
        <Button 
          variant="outline"
          size="lg"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={cn(
            "px-6 py-3 font-semibold transition-all duration-300",
            "border-gray-300 hover:border-gray-400",
            "hover:shadow-md hover:scale-105",
            "disabled:opacity-50 disabled:hover:scale-100",
            canGoPrevious && "hover:bg-gray-50"
          )}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>
        
        {showReset && onReset && (
          <Button 
            variant="ghost"
            size="lg"
            onClick={onReset}
            className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        )}
      </div>

      {/* Center - Progress indicator */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 font-medium">Progress</span>
        </div>
        
        <div className="flex items-center gap-2">
          {Array.from({ length: totalScenarios }, (_, i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                i < currentScenario 
                  ? "bg-green-500 shadow-sm scale-110" 
                  : i === currentScenario
                  ? "bg-blue-500 shadow-md scale-125 ring-2 ring-blue-200"
                  : "bg-gray-300 scale-90"
              )}
            />
          ))}
        </div>
        
        <Badge className={cn(
          "px-3 py-1 font-bold text-sm",
          "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0",
          "shadow-sm hover:shadow-md transition-shadow duration-300"
        )}>
          {currentScenario + 1} / {totalScenarios}
        </Badge>
      </div>

      {/* Right side - Next button */}
      <div className="flex items-center gap-3">
        <Button 
          onClick={onNext}
          disabled={!canGoNext}
          size="lg"
          className={cn(
            "px-8 py-3 font-bold text-base transition-all duration-300",
            "shadow-lg hover:shadow-xl",
            isLastScenario 
              ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
            "text-white border-0",
            "hover:scale-105 active:scale-95",
            "disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed",
            canGoNext && "animate-pulse"
          )}
        >
          {isLastScenario && <CheckCircle className="w-5 h-5 mr-2" />}
          {nextButtonText}
          {!isLastScenario && <ArrowRight className="w-5 h-5 ml-2" />}
        </Button>
      </div>
    </div>
  )
})