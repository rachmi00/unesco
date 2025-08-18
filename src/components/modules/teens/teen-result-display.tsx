import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  Scale, 
  Home, 
  Award,
  TrendingUp,
  Target
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TeenResultDisplayProps {
  totalPoints: number
  maxPoints: number
  scenarioPoints: number[]
  onRestart?: () => void
  className?: string
}

export function TeenResultDisplay({ 
  totalPoints, 
  maxPoints, 
  scenarioPoints,
  onRestart,
  className 
}: TeenResultDisplayProps) {
  const getBadgeLevel = (points: number, maxPoints: number) => {
    const percentage = (points / maxPoints) * 100
    if (percentage >= 90) return { name: "Digital Rights Defender", icon: Shield, color: "text-blue-600" }
    if (percentage >= 75) return { name: "Media Literacy Leader", icon: Users, color: "text-green-600" }
    if (percentage >= 60) return { name: "Awareness Builder", icon: AlertTriangle, color: "text-orange-600" }
    return { name: "Learning Digital Citizenship", icon: Scale, color: "text-gray-600" }
  }

  const badge = getBadgeLevel(totalPoints, maxPoints)
  const BadgeIcon = badge.icon
  const percentage = (totalPoints / maxPoints) * 100
  const effectiveResponses = scenarioPoints.filter(p => p >= 3).length
  const leadershipActions = scenarioPoints.filter(p => p === 4).length

  const getPerformanceMessage = () => {
    if (percentage >= 90) {
      return "Outstanding! You've demonstrated exceptional digital citizenship and leadership in combating hate speech."
    }
    if (percentage >= 75) {
      return "Excellent work! You show strong media literacy skills and understand how to respond to harmful content."
    }
    if (percentage >= 60) {
      return "Good progress! You're building awareness of digital citizenship and learning to identify harmful content."
    }
    return "Keep learning! Digital citizenship is a journey. Review the scenarios to improve your responses."
  }

  return (
    <div className={cn("max-w-2xl mx-auto space-y-6", className)}>
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-accent/30">
            <BadgeIcon className={`w-14 h-14 ${badge.color}`} />
          </div>
          <CardTitle className="text-2xl text-foreground">
            Media Literacy Assessment Complete
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge className="text-lg px-6 py-3 mb-4 bg-accent text-accent-foreground">
              <BadgeIcon className="w-5 h-5 mr-2" />
              {badge.name}
            </Badge>
            <p className="text-muted-foreground">
              You scored {totalPoints} out of {maxPoints} points
            </p>
            <div className="mt-2">
              <Progress value={percentage} className="h-3" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-accent/20 z-20 backdrop-blur-none">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Your Digital Impact Assessment
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{effectiveResponses}</div>
                <div className="text-muted-foreground">Effective Responses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{leadershipActions}</div>
                <div className="text-muted-foreground">Leadership Actions</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-blue-200 rounded-lg p-4 z-20 backdrop-blur-none">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Performance Summary
            </h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              {getPerformanceMessage()}
            </p>
          </div>

          <div className="bg-white border border-red-200 rounded-lg p-4 z-20 backdrop-blur-none">
            <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Real Consequences Matter
            </h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Hate speech can result in school suspension or expulsion</li>
              <li>• Legal consequences include fines and potential arrest</li>
              <li>• Social media posts can affect university and job applications</li>
              <li>• Your digital footprint follows you throughout life</li>
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