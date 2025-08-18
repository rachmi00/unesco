import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Minus, Scale, Briefcase, Target, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdultOption, ImpactLevel } from "@/types/scenarios"

interface AdultOptionCardProps {
  option: AdultOption
  index: number
  isSelected: boolean
  showResult: boolean
  onSelect: () => void
  disabled?: boolean
}

export const AdultOptionCard = React.memo(function AdultOptionCard({
  option,
  index,
  isSelected,
  showResult,
  onSelect,
  disabled = false
}: AdultOptionCardProps) {
  const getImpactGradient = (impact: ImpactLevel) => {
    switch (impact) {
      case "positive":
        return "from-green-500 to-emerald-600"
      case "negative":
        return "from-red-500 to-pink-600"
      case "neutral":
        return "from-blue-500 to-indigo-600"
      default:
        return "from-gray-500 to-slate-600"
    }
  }

  const getImpactIcon = (impact: ImpactLevel) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="w-4 h-4" />
      case "negative":
        return <TrendingDown className="w-4 h-4" />
      case "neutral":
        return <Target className="w-4 h-4" />
      default:
        return <Minus className="w-4 h-4" />
    }
  }

  const getCardStyle = (impact: ImpactLevel) => {
    switch (impact) {
      case "positive":
        return {
          border: "border-green-200/60",
          bg: "#ecfdf5",
          glow: "shadow-green-100"
        }
      case "negative":
        return {
          border: "border-red-200/60",
          bg: "#fff1f2",
          glow: "shadow-red-100"
        }
      case "neutral":
        return {
          border: "border-blue-200/60",
          bg: "#eef2ff",
          glow: "shadow-blue-100"
        }
      default:
        return {
          border: "border-gray-200/60",
          bg: "#f8fafc",
          glow: "shadow-gray-100"
        }
    }
  }

  const getImpactLabel = (impact: ImpactLevel) => {
    switch (impact) {
      case "positive":
        return "Positive Impact"
      case "negative":
        return "Negative Impact"
      case "neutral":
        return "Neutral Impact"
      default:
        return "Unknown Impact"
    }
  }

  const cardStyle = showResult && isSelected ? getCardStyle(option.impact) : null

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-500 ease-out cursor-pointer",
        "border border-gray-200/60 bg-gradient-to-br from-white via-white to-gray-50/30",
        "hover:shadow-xl hover:shadow-indigo-200/30 hover:scale-[1.02] hover:-translate-y-1",
        "focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2",
        isSelected && !showResult && "ring-2 ring-indigo-500 shadow-lg shadow-indigo-200/50 scale-[1.02] -translate-y-1",
        showResult && isSelected && cardStyle?.border,
        showResult && isSelected && cardStyle?.bg,
        showResult && isSelected && `shadow-xl ${cardStyle?.glow}`,
  disabled && !isSelected && "opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0",
        `stagger-${index + 1} slide-in-up`
      )}
    >
  {/* Animated background gradient (non-interactive, behind content) */}
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

      {/* Professional indicator */}
      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">
        {index + 1}
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
              <p className="text-base font-medium leading-relaxed flex-1 min-w-0 whitespace-normal break-words text-gray-900 group-hover:text-indigo-900 transition-colors duration-300">
                {option.text}
              </p>
              {showResult && isSelected && (
                <Badge className={cn(
                  "shrink-0 text-sm font-bold px-3 py-2 border-0 shadow-lg",
                  "bg-gradient-to-r", getImpactGradient(option.impact),
                  "text-white hover:scale-105 transition-transform duration-200"
                )}>
                  <div className="flex items-center gap-1">
                    {getImpactIcon(option.impact)}
                    <span>{getImpactLabel(option.impact)}</span>
                  </div>
                </Badge>
              )}
            </div>

            {showResult && isSelected && (
                <div className="space-y-4 text-left animate-in slide-in-from-top-2 duration-500 bg-white z-50 p-0">
                {/* Consequences */}
                <div className="relative p-4 rounded-xl bg-white border border-slate-200/50 shadow-sm z-50 backdrop-blur-none">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-slate-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900 mb-2">
                        Key Consequences
                      </div>
                      <ul className="text-sm text-slate-800 space-y-1">
                        {option.consequences.map((consequence, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-slate-500 mt-1">•</span>
                            <span className="leading-relaxed min-w-0 whitespace-normal break-words">{consequence}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="relative p-4 rounded-xl bg-white border border-purple-200/50 shadow-sm z-50 backdrop-blur-none">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-purple-900 mb-2">
                        Professional Analysis
                      </div>
                      <div className="text-sm text-purple-800 leading-relaxed min-w-0 whitespace-normal break-words">
                        {option.explanation}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legal Note */}
                <div className="relative p-4 rounded-xl bg-white border border-blue-200/50 shadow-sm z-50 backdrop-blur-none">
                  <div className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-blue-900 mb-2">
                        Legal Framework
                      </div>
                      <div className="text-sm text-blue-800 leading-relaxed min-w-0 whitespace-normal break-words">
                        {option.legalNote}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Risk */}
                {option.professionalRisk && (
                  <div className="relative p-4 rounded-xl bg-white border border-amber-200/50 shadow-sm z-50 backdrop-blur-none">
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-amber-900 mb-2">
                          Career Impact
                        </div>
                        <div className="text-sm text-amber-800 leading-relaxed min-w-0 whitespace-normal break-words">
                          {option.professionalRisk}
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
          getImpactGradient(option.impact)
        )} />
      )}
    </Card>
  )
})