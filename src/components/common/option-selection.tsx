import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ComponentProps } from "@/lib/data/types"

interface Option {
  text: string
  points?: number
  consequence?: string
  explanation?: string
  impact?: "positive" | "neutral" | "negative"
}

interface OptionSelectionProps<T extends Option> extends ComponentProps {
  options: T[]
  selectedIndex: number | null
  showResult: boolean
  onSelect: (option: T, index: number) => void
  disabled?: boolean
}

export function OptionSelection<T extends Option>({ 
  options,
  selectedIndex,
  showResult,
  onSelect,
  disabled = false,
  className 
}: OptionSelectionProps<T>) {
  const getImpactColor = (impact?: string, points?: number) => {
    if (impact) {
      switch (impact) {
        case "positive":
          return "border-green-600 bg-green-100"
        case "negative":
          return "border-red-600 bg-red-100"
        case "neutral":
          return "border-yellow-500 bg-yellow-100"
        default:
          return ""
      }
    }
    
    if (points !== undefined) {
      if (points >= 3) return "border-green-600 bg-green-100"
      if (points <= 1) return "border-red-600 bg-red-100"
      return "border-orange-500 bg-orange-100"
    }

    return ""
  }

  const getPointsBadgeColor = (points?: number) => {
    if (points === undefined) return "bg-blue-600 text-white"
    if (points >= 3) return "bg-green-600 text-white"
    if (points <= 1) return "bg-red-600 text-white"
    return "bg-orange-500 text-white"
  }

  return (
    <div className={cn("space-y-3 sm:space-y-4", className)}>
      {options.map((option, index) => {
        const isSelected = selectedIndex === index
        const shouldShowResult = showResult && isSelected
        
        return (
          <Card 
            key={index}
            className={cn(
              "cursor-pointer transition-all duration-200 border-2",
              "hover:shadow-lg active:scale-[0.98]",
              isSelected 
                ? shouldShowResult 
                  ? cn("border-blue-600", getImpactColor(option.impact, option.points))
                  : "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-blue-300",
              disabled && !isSelected && "opacity-50 cursor-not-allowed hover:border-gray-200"
            )}
            onClick={() => !disabled && onSelect(option, index)}
          >
            <CardContent className={cn(
              "p-4 sm:p-5",
              // Ensure full clickable area
              "w-full"
            )}>
              <div className="space-y-3">
                {/* Main option text and points */}
                <div className="flex items-start justify-between gap-3">
                  <p className={cn(
                    "font-medium leading-relaxed flex-1",
                    // Better mobile text sizing
                    "text-sm sm:text-base",
                    "text-gray-900",
                    // allow wrapping in flex containers
                    "min-w-0 whitespace-normal break-words"
                  )}>
                    {option.text}
                  </p>
                  
                  {option.points !== undefined && shouldShowResult && (
                    <Badge 
                      className={cn(
                        "shrink-0 border-0 font-medium",
                        "px-2 py-1 text-xs sm:text-sm",
                        getPointsBadgeColor(option.points)
                      )}
                    >
                      {option.points} pts
                    </Badge>
                  )}
                </div>
                
                {/* Result details */}
                {shouldShowResult && (
                  <div className="space-y-2 pt-2 border-t relative z-50 backdrop-blur-none">
                    {option.consequence && (
                      <div className="text-xs sm:text-sm text-gray-700">
                          <span className="font-semibold text-gray-900">Consequence:</span>
                          <span className="ml-1 min-w-0 whitespace-normal break-words">{option.consequence}</span>
                        </div>
                    )}
                    
                    {option.explanation && (
                      <div className="text-xs sm:text-sm">
                        <span className="font-semibold text-gray-900">Explanation:</span>
                        <span className="ml-1 min-w-0 whitespace-normal break-words">{option.explanation}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}