import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  Award, 
  Shield, 
  CheckCircle, 
  BookOpen, 
  Home, 
  TrendingUp,
  Target,
  AlertTriangle,
  Scale
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ImpactLevel } from "@/types/scenarios"

interface AdultResultDisplayProps {
  totalScore: number
  maxScore: number
  impactCounts: Record<ImpactLevel, number>
  onRestart?: () => void
  className?: string
}

export function AdultResultDisplay({ 
  totalScore, 
  maxScore, 
  impactCounts,
  onRestart,
  className 
}: AdultResultDisplayProps) {
  const getBadgeLevel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return { name: "Ethics Champion", icon: Award, color: "text-blue-600" }
    if (percentage >= 75) return { name: "Professional Leader", icon: Shield, color: "text-green-600" }
    if (percentage >= 60) return { name: "Responsible Citizen", icon: CheckCircle, color: "text-orange-600" }
    return { name: "Building Awareness", icon: BookOpen, color: "text-gray-600" }
  }

  const badge = getBadgeLevel(totalScore, maxScore)
  const BadgeIcon = badge.icon
  const percentage = (totalScore / maxScore) * 100

  const getPerformanceMessage = () => {
    if (percentage >= 90) {
      return "Exceptional! You've demonstrated outstanding ethical leadership and professional judgment in complex situations."
    }
    if (percentage >= 75) {
      return "Excellent work! You show strong professional ethics and understand how to navigate discrimination effectively."
    }
    if (percentage >= 60) {
      return "Good progress! You're developing awareness of professional responsibilities and ethical decision-making."
    }
    return "Keep learning! Professional ethics requires continuous development. Review the scenarios to strengthen your responses."
  }

  const getImpactAnalysis = () => {
    const total = Object.values(impactCounts).reduce((sum, count) => sum + count, 0)
    if (total === 0) return null

    return {
      positive: Math.round((impactCounts.positive / total) * 100),
      neutral: Math.round((impactCounts.neutral / total) * 100),
      negative: Math.round((impactCounts.negative / total) * 100)
    }
  }

  const impactAnalysis = getImpactAnalysis()

  return (
    <div className={cn("max-w-2xl mx-auto space-y-6", className)}>
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-accent/30">
            <BadgeIcon className={`w-14 h-14 ${badge.color}`} />
          </div>
          <CardTitle className="text-2xl text-foreground">
            Professional Ethics Assessment Complete
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge className="text-lg px-6 py-3 mb-4 bg-accent text-accent-foreground">
              <BadgeIcon className="w-5 h-5 mr-2" />
              {badge.name}
            </Badge>
            <p className="text-muted-foreground">
              You achieved {totalScore} out of {maxScore} points
            </p>
            <div className="mt-2">
              <Progress value={percentage} className="h-3" />
            </div>
          </div>

          {impactAnalysis && (
            <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-4 border border-accent/20">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Your Decision Impact Profile
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{impactAnalysis.positive}%</div>
                  <div className="text-muted-foreground">Positive Impact</div>
                  <div className="text-xs text-green-600 mt-1">{impactCounts.positive} decisions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{impactAnalysis.neutral}%</div>
                  <div className="text-muted-foreground">Neutral Impact</div>
                  <div className="text-xs text-yellow-600 mt-1">{impactCounts.neutral} decisions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{impactAnalysis.negative}%</div>
                  <div className="text-muted-foreground">Negative Impact</div>
                  <div className="text-xs text-red-600 mt-1">{impactCounts.negative} decisions</div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white border border-blue-200 rounded-lg p-4 z-20 backdrop-blur-none">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Performance Summary
            </h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              {getPerformanceMessage()}
            </p>
          </div>

          <div className="bg-white border border-amber-200 rounded-lg p-4 z-20 backdrop-blur-none">
            <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Professional Responsibilities
            </h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Uphold legal compliance and ethical standards</li>
              <li>• Challenge discrimination and promote inclusion</li>
              <li>• Document incidents and follow proper procedures</li>
              <li>• Lead by example in professional environments</li>
            </ul>
          </div>

          <div className="bg-white border border-red-200 rounded-lg p-4 z-20 backdrop-blur-none">
            <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Real-World Consequences
            </h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Discrimination can result in legal liability and financial penalties</li>
              <li>• Professional reputation and career advancement are at stake</li>
              <li>• Organizations face regulatory scrutiny and public backlash</li>
              <li>• Ethical leadership creates lasting positive change</li>
            </ul>
          </div>

          <div className="flex gap-3 justify-center">
            {onRestart && (
              <Button 
                variant="outline" 
                onClick={onRestart}
                className="gap-2"
              >
                <Award className="w-4 h-4" />
                Try Again
              </Button>
            )}
            <Button asChild className="gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}