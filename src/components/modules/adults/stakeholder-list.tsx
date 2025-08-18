import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building, Scale, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface StakeholderListProps {
  stakeholders: string[]
  title?: string
  className?: string
}

export function StakeholderList({ 
  stakeholders, 
  title = "Affected Stakeholders",
  className 
}: StakeholderListProps) {
  const getStakeholderIcon = (stakeholder: string) => {
    const lower = stakeholder.toLowerCase()
    if (lower.includes('employee') || lower.includes('worker') || lower.includes('candidate')) {
      return <Users className="w-3 h-3" />
    }
    if (lower.includes('company') || lower.includes('business') || lower.includes('corporate')) {
      return <Building className="w-3 h-3" />
    }
    if (lower.includes('legal') || lower.includes('compliance') || lower.includes('law')) {
      return <Scale className="w-3 h-3" />
    }
    if (lower.includes('reputation') || lower.includes('public') || lower.includes('community')) {
      return <Shield className="w-3 h-3" />
    }
    return <Users className="w-3 h-3" />
  }

  const getStakeholderColor = (stakeholder: string) => {
    const lower = stakeholder.toLowerCase()
    if (lower.includes('legal') || lower.includes('compliance')) {
      return "bg-red-100 text-red-800 border-red-200"
    }
    if (lower.includes('reputation') || lower.includes('public')) {
      return "bg-orange-100 text-orange-800 border-orange-200"
    }
    if (lower.includes('employee') || lower.includes('community')) {
      return "bg-blue-100 text-blue-800 border-blue-200"
    }
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Users className="w-4 h-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {stakeholders.map((stakeholder, index) => (
            <Badge 
              key={index}
              variant="outline"
              className={cn(
                "text-xs font-medium",
                getStakeholderColor(stakeholder)
              )}
            >
              {getStakeholderIcon(stakeholder)}
              <span className="ml-1">{stakeholder}</span>
            </Badge>
          ))}
        </div>
        
        {stakeholders.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            No stakeholders identified
          </p>
        )}
      </CardContent>
    </Card>
  )
}