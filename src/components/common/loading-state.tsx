import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { ComponentProps } from "@/lib/data/types"

interface LoadingStateProps extends ComponentProps {
  isLoading: boolean
  error?: Error | null
  fallback?: React.ReactNode
  onRetry?: () => void
  loadingText?: string
  errorTitle?: string
}

export function LoadingState({ 
  isLoading, 
  error, 
  fallback,
  onRetry,
  loadingText = "Loading...",
  errorTitle = "Something went wrong",
  className,
  children 
}: LoadingStateProps) {
  if (isLoading) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="flex items-center justify-center p-8">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{loadingText}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={cn("w-full border-destructive/20", className)}>
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">{errorTitle}</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                {error.message || "An unexpected error occurred. Please try again."}
              </p>
            </div>
            
            {onRetry && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onRetry}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (fallback) {
    return <>{fallback}</>
  }

  return <>{children}</>
}