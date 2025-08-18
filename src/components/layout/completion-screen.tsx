import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Home, RotateCcw, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { BadgeInfo } from "@/types/scenarios"

interface CompletionScreenProps {
  title: string
  badge: BadgeInfo
  totalPoints: number
  maxPoints: number
  performanceMessage: string
  achievements?: {
    label: string
    value: number | string
    description: string
  }[]
  onRestart?: () => void
  className?: string
  children?: React.ReactNode
}

export function CompletionScreen({ 
  title, 
  badge, 
  totalPoints, 
  maxPoints, 
  performanceMessage,
  achievements = [],
  onRestart,
  className,
  children 
}: CompletionScreenProps) {
  const BadgeIcon = badge.icon
  const percentage = (totalPoints / maxPoints) * 100

  return (
    <div className={cn("min-h-screen bg-background flex items-center justify-center p-4", className)}>
      <Card className="max-w-2xl w-full border-2">
        <CardHeader className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-accent/30">
            <BadgeIcon className={`w-14 h-14 ${badge.color}`} />
          </div>
          <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
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

          {achievements.length > 0 && (
            <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-4 border border-accent/20">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Your Achievement Summary
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-accent">{achievement.value}</div>
                    <div className="text-muted-foreground">{achievement.label}</div>
                    {achievement.description && (
                      <div className="text-xs text-muted-foreground mt-1">{achievement.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Performance Summary
            </h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              {performanceMessage}
            </p>
          </div>

          {children}

          <div className="flex gap-3 justify-center">
            {onRestart && (
              <Button 
                variant="outline" 
                onClick={onRestart}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
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