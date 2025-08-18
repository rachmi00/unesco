import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Minus, Zap, Shield, Brain } from "lucide-react"
import { cn } from "@/lib/utils"
import { TeenOption } from "@/types/scenarios"

interface TeenOptionCardProps {
  option: TeenOption
  index: number
  isSelected: boolean
  showResult: boolean
  onSelect: () => void
  disabled?: boolean
}

export const TeenOptionCard = React.memo(function TeenOptionCard({ 
  option, 
  index, 
  isSelected, 
  showResult, 
  onSelect, 
  disabled = false 
}: TeenOptionCardProps) {
  const getPointsGradient = (points: number) => {
    if (points >= 3) return "from-green-500 to-emerald-600"
    if (points <= 1) return "from-red-500 to-pink-600"
    return "from-yellow-500 to-orange-600"
  }

  const getPointsIcon = (points: number) => {
    if (points >= 3) return <CheckCircle className="w-4 h-4" />
    if (points <= 1) return <AlertTriangle className="w-4 h-4" />
    return <Minus className="w-4 h-4" />
  }

  const getCardStyle = (points: number) => {
    if (points >= 3) return {
      border: "border-green-200/60",
      bg: "bg-gradient-to-br from-green-50/80 via-white to-emerald-50/60",
      glow: "shadow-green-200/50"
    }
    if (points <= 1) return {
      border: "border-red-200/60", 
      bg: "bg-gradient-to-br from-red-50/80 via-white to-pink-50/60",
      glow: "shadow-red-200/50"
    }
    return {
      border: "border-yellow-200/60",
      bg: "bg-gradient-to-br from-yellow-50/80 via-white to-orange-50/60", 
      glow: "shadow-yellow-200/50"
    }
  }

  const cardStyle = showResult && isSelected ? getCardStyle(option.points) : null

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-500 ease-out cursor-pointer",
        "border hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1",
        "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
        isSelected && !showResult && "ring-2 ring-blue-500 shadow-lg scale-[1.02] -translate-y-1",
  disabled && !isSelected && "opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0"
      )}
      style={{
        background: showResult && isSelected 
          ? cardStyle?.bg || '#ffffff'
          : '#ffffff',
        borderColor: showResult && isSelected 
          ? (option.points >= 3 ? '#10b981' : option.points <= 1 ? '#ef4444' : '#f59e0b')
          : '#e5e7eb',
        boxShadow: showResult && isSelected 
          ? `0 12px 24px -8px rgba(16,16,16,0.06)`
          : undefined,
        animationDelay: `${(index + 1) * 0.1}s`
      }}
    >
  {/* Animated background gradient (non-interactive, behind content) */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
      
      {/* Option number indicator */}
      <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">
        {String.fromCharCode(65 + index)}
      </div>

  <CardContent className="p-6 pt-16 relative z-10">
        <Button
          variant="ghost"
          className="w-full h-auto p-0 text-left justify-start hover:bg-transparent"
          onClick={onSelect}
          disabled={disabled}
        >
          <div className="w-full space-y-4">
              <div className="flex items-start justify-between gap-4">
              <p className="text-base font-medium leading-relaxed flex-1 min-w-0 whitespace-normal break-words text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                {option.text}
              </p>
              {showResult && isSelected && (
                <Badge className={cn(
                  "shrink-0 text-sm font-bold px-3 py-2 border-0 shadow-lg",
                  "bg-gradient-to-r", getPointsGradient(option.points),
                  "text-white hover:scale-105 transition-transform duration-200"
                )}>
                  <div className="flex items-center gap-1">
                    {getPointsIcon(option.points)}
                    <span>{option.points} pts</span>
                  </div>
                </Badge>
              )}
            </div>
            
              {showResult && isSelected && (
              <div className="space-y-4 text-left animate-in slide-in-from-top-2 duration-500 relative z-50">
                {/* Consequence */}
                <div className="relative p-4 rounded-xl bg-white border border-blue-200/50 shadow-sm z-50 backdrop-blur-none">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-blue-900 mb-2">
                        Immediate Consequence
                      </div>
                      <div className="text-sm text-blue-800 leading-relaxed min-w-0 whitespace-normal break-words">
                        {option.consequence}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Explanation */}
                <div className="relative p-4 rounded-xl bg-white border border-purple-200/50 shadow-sm z-50 backdrop-blur-none">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-purple-900 mb-2">
                        Why This Matters
                      </div>
                      <div className="text-sm text-purple-800 leading-relaxed min-w-0 whitespace-normal break-words">
                        {option.explanation}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Legal Risk */}
                {option.legalRisk && (
                  <div className="relative p-4 rounded-xl bg-white border border-orange-200/50 shadow-sm z-50 backdrop-blur-none">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-orange-900 mb-2">
                          Legal & Safety Risk
                        </div>
                        <div className="text-sm text-orange-800 leading-relaxed min-w-0 whitespace-normal break-words">
                          {option.legalRisk}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Button>
      </CardContent>
      
      {/* Bottom accent line */}
      {showResult && isSelected && (
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r",
          getPointsGradient(option.points)
        )} />
      )}
    </Card>
  )
})