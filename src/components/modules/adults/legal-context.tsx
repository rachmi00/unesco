import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, BookOpen, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface LegalContextProps {
  legalContext: string
  historicalContext: string
  className?: string
}

export function LegalContext({ 
  legalContext, 
  historicalContext, 
  className 
}: LegalContextProps) {
  return (
    <div className={cn("space-y-4", className)}>
  <Card className="border-blue-200 bg-white z-20 backdrop-blur-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
            <Scale className="w-4 h-4" />
            Legal Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700 leading-relaxed">
            {legalContext}
          </p>
        </CardContent>
      </Card>

  <Card className="border-amber-200 bg-white z-20 backdrop-blur-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Historical Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-700 leading-relaxed">
            {historicalContext}
          </p>
        </CardContent>
      </Card>

  <Card className="border-orange-200 bg-white z-20 backdrop-blur-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-orange-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Why This Matters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800 border-orange-300">
                Legal
              </Badge>
              <p className="text-xs text-orange-700 flex-1">
                Understanding legal frameworks helps you make compliant decisions and avoid liability.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800 border-orange-300">
                Historical
              </Badge>
              <p className="text-xs text-orange-700 flex-1">
                Historical context reveals how discrimination patterns developed and their ongoing impact.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800 border-orange-300">
                Professional
              </Badge>
              <p className="text-xs text-orange-700 flex-1">
                Informed responses demonstrate professional competence and ethical leadership.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}