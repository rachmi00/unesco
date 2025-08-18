"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Award, 
  Trophy, 
  Clock, 
  CheckCircle,
  ArrowRight,
  TrendingUp
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getStoredProgress, type UserProgress } from "@/lib/progress-tracker"

export function ProgressDashboard() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load progress using the existing utility
    const savedProgress = getStoredProgress()
    setProgress(savedProgress)
  }, [])

  if (!mounted || !progress) {
    return null // Prevent hydration mismatch
  }

  const hasAnyProgress = progress.teens.completed || progress.adults.completed
  const completedModules = progress.totalModulesCompleted
  const totalScore = (progress.teens.score || 0) + (progress.adults.score || 0)
  const totalMaxScore = (progress.teens.maxScore || 32) + (progress.adults.maxScore || 32) // Assuming 8 scenarios * 4 points each

  if (!hasAnyProgress) {
    return (
      <div className="container mx-auto px-6">
        <Card className="max-w-2xl mx-auto border-dashed border-2 border-muted-foreground/20">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Start Your Learning Journey</h3>
            <p className="text-muted-foreground mb-6">
              Begin with either module to track your progress and earn achievement badges
            </p>
            <div className="flex gap-3 justify-center">
              <Button asChild size="sm">
                <Link href="/teens">
                  <Users className="w-4 h-4 mr-2" />
                  Teen Module
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/adults">
                  <Award className="w-4 h-4 mr-2" />
                  Adult Module
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Your Learning Progress</h2>
          <p className="text-muted-foreground">Track your achievements and continue building your skills</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Overall Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">{completedModules}/2</span>
                  <Badge variant="outline" className="text-xs">
                    Modules Complete
                  </Badge>
                </div>
                <Progress value={(completedModules / 2) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {totalScore} total points earned
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Teen Module Progress */}
          <Card className={progress.teens.completed ? "border-green-200 bg-green-50/50" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Teen Module
              </CardTitle>
            </CardHeader>
            <CardContent>
              {progress.teens.completed || progress.teens.score ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      {progress.teens.score || 0}/{progress.teens.maxScore || 32}
                    </span>
                    {progress.teens.completed && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <Progress 
                    value={((progress.teens.score || 0) / (progress.teens.maxScore || 32)) * 100} 
                    className="h-2" 
                  />
                  {progress.teens.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {progress.teens.badge}
                    </Badge>
                  )}
                  {progress.teens.completedAt && (
                    <p className="text-xs text-muted-foreground">
                      Completed {new Date(progress.teens.completedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Not started</p>
                  <Button asChild size="sm" className="w-full">
                    <Link href="/teens">
                      Start Module
                      <ArrowRight className="w-3 h-3 ml-2" />
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Adult Module Progress */}
          <Card className={progress.adults.completed ? "border-green-200 bg-green-50/50" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Award className="w-4 h-4" />
                Adult Module
              </CardTitle>
            </CardHeader>
            <CardContent>
              {progress.adults.completed || progress.adults.score ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      {progress.adults.score || 0}/{progress.adults.maxScore || 32}
                    </span>
                    {progress.adults.completed && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <Progress 
                    value={((progress.adults.score || 0) / (progress.adults.maxScore || 32)) * 100} 
                    className="h-2" 
                  />
                  {progress.adults.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {progress.adults.badge}
                    </Badge>
                  )}
                  {progress.adults.completedAt && (
                    <p className="text-xs text-muted-foreground">
                      Completed {new Date(progress.adults.completedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Not started</p>
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link href="/adults">
                      Start Module
                      <ArrowRight className="w-3 h-3 ml-2" />
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Achievement Summary */}
        {(progress.teens.completed || progress.adults.completed) && (
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="text-center py-8">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Congratulations on Your Progress!
              </h3>
              <p className="text-muted-foreground mb-4">
                You're building important skills for digital citizenship and inclusive communication.
              </p>
              {completedModules < 2 && (
                <Button asChild>
                  <Link href={progress.teens.completed ? "/adults" : "/teens"}>
                    Continue Learning
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}