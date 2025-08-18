import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Info, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderSectionProps {
  title: string
  description?: string
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
  contextInfo?: {
    type: "info" | "warning" | "educational"
    title: string
    content: string
  }
  className?: string
}

// A cleaner way to manage variants for the context card
const contextVariants = {
  info: {
    Icon: Info,
    colors: "bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300",
  },
  warning: {
    Icon: AlertTriangle,
    colors: "bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-300",
  },
  educational: {
    Icon: BookOpen,
    colors: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300",
  },
}

export function HeaderSection({ 
  title, 
  description, 
  badge,
  contextInfo,
  className 
}: HeaderSectionProps) {
  
  const context = contextInfo ? (contextVariants[contextInfo.type] || contextVariants.info) : null;

  return (
    <div className={cn("space-y-6 md:space-y-8", className)}>
      <div className="text-center space-y-4">
        {/* Title and Badge: Stacks on mobile, row on larger screens to prevent overflow */}
        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {badge && (
            <Badge variant={badge.variant || "default"} className="flex-shrink-0">
              {badge.text}
            </Badge>
          )}
        </div>
        
        {/* Description: Font size scales with screen size */}
        {description && (
          <p className="text-base text-muted-foreground sm:text-lg max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {contextInfo && context && (
        <Card className={cn("max-w-3xl mx-auto", context.colors)}>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-4">
              <context.Icon className="h-5 w-5 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-base mb-1">{contextInfo.title}</h3>
                <p className="text-sm leading-relaxed">{contextInfo.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}