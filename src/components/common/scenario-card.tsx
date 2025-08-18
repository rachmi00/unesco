import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ComponentProps } from "@/lib/data/types"
import { MessageSquare } from "lucide-react"

interface ScenarioCardProps extends ComponentProps {
  title: string
  context: string
  question: string
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
  showDetails?: boolean
  animated?: boolean
}

export const ScenarioCard = React.memo(function ScenarioCard({
  title,
  context,
  question,
  badge,
  showDetails = true,
  animated = true,
  className,
  children
}: ScenarioCardProps) {
  return (
    <Card 
      className={cn(
        "group relative overflow-hidden border-0 shadow-sm transition-all duration-300",
        "bg-white hover:shadow-md",
        // Mobile-first responsive design
        "mx-2 sm:mx-0",
        className
      )}
      style={{
        animation: animated ? 'slideInUp 0.3s ease-out' : undefined
      }}
    >
      <CardHeader className={cn(
        "pb-3 sm:pb-4",
        // Reduced padding on mobile
        "px-4 pt-4 sm:px-6 sm:pt-6"
      )}>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className={cn(
            "font-semibold leading-tight text-gray-900 transition-colors duration-200",
            // Smaller text on mobile, larger on desktop
            "text-lg sm:text-xl",
            "group-hover:text-blue-700"
          )}>
            {title}
          </CardTitle>
          
          {badge && (
            <Badge 
              variant={badge.variant || "default"}
              className={cn(
                "shrink-0 font-medium border-0 text-white",
                // Smaller badge on mobile
                "px-2 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm"
              )}
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
              }}
            >
              {badge.text}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className={cn(
        "space-y-4 sm:space-y-5",
        // Reduced padding on mobile
        "px-4 pb-4 sm:px-6 sm:pb-6"
      )}>
        {showDetails && (
          <>
            {/* Context - hidden on very small screens, show on sm+ */}
            <div className="hidden sm:block">
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {context}
              </p>
            </div>

            {/* Question - always visible but compact on mobile */}
            <div className={cn(
              "relative rounded-lg border-l-4 border-blue-500 bg-blue-50/50",
              // Reduced padding on mobile
              "p-3 sm:p-4"
            )}>
              <div className="flex items-start gap-2 sm:gap-3">
                <MessageSquare className={cn(
                  "text-blue-600 shrink-0 mt-0.5",
                  // Smaller icon on mobile
                  "w-4 h-4 sm:w-5 sm:h-5"
                )} />
                <p className={cn(
                  "font-medium text-gray-900 leading-relaxed",
                  // Smaller text on mobile
                  "text-sm sm:text-base"
                )}>
                  {question}
                </p>
              </div>
            </div>

            {/* Show context below question on mobile only */}
            <div className="sm:hidden">
              <p className="text-gray-600 leading-relaxed text-sm">
                {context}
              </p>
            </div>
          </>
        )}
        
        {children && (
          <div className="space-y-3 sm:space-y-4">
            {children}
          </div>
        )}
      </CardContent>

      {/* Simplified hover effect - only on desktop */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-300",
          "sm:group-hover:opacity-100"
        )}
        style={{
          background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)'
        }}
      />
    </Card>
  )
})