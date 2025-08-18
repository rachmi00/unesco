import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  Camera, 
  MessageCircle, 
  Users 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PlatformType } from "@/types/scenarios"
import { PLATFORM_CONFIGS } from "@/lib/data/constants"

interface PlatformBadgeProps {
  type: PlatformType
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
  className?: string
}

export function PlatformBadge({ 
  type, 
  size = "md", 
  showIcon = true, 
  className 
}: PlatformBadgeProps) {
  const config = PLATFORM_CONFIGS[type]
  
  const getPlatformIcon = () => {
    switch (type) {
      case "tiktok":
      case "youtube":
        return <Play className="w-3 h-3" />
      case "instagram":
        return <Camera className="w-3 h-3" />
      case "whatsapp":
      case "twitter":
        return <MessageCircle className="w-3 h-3" />
      case "facebook":
        return <Users className="w-3 h-3" />
      default:
        return <MessageCircle className="w-3 h-3" />
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs px-2 py-1"
      case "lg":
        return "text-sm px-3 py-1.5"
      default:
        return "text-xs px-2.5 py-1"
    }
  }

  return (
    <Badge 
      className={cn(
        config.color,
        getSizeClasses(),
        "font-medium",
        className
      )}
    >
      {showIcon && (
        <span className="mr-1">
          {getPlatformIcon()}
        </span>
      )}
      {config.name}
    </Badge>
  )
}