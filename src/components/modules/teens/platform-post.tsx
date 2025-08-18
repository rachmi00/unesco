import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  Camera, 
  MessageCircle, 
  Users, 
  Heart, 
  Share2, 
  Eye,
  MoreHorizontal,
  Verified,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PlatformType, PlatformDetails } from "@/types/scenarios"
import { PLATFORM_CONFIGS } from "@/lib/data/constants"

interface PlatformPostProps {
  type: PlatformType
  content: string
  author: string
  platformDetails: PlatformDetails
  className?: string
}

export const PlatformPost = React.memo(function PlatformPost({ 
  type, 
  content, 
  author, 
  platformDetails, 
  className 
}: PlatformPostProps) {
  const config = PLATFORM_CONFIGS[type]
  
  const getPlatformIcon = () => {
    switch (type) {
      case "tiktok":
      case "youtube":
        return <Play className="w-4 h-4" />
      case "instagram":
        return <Camera className="w-4 h-4" />
      case "whatsapp":
      case "twitter":
        return <MessageCircle className="w-4 h-4" />
      case "facebook":
        return <Users className="w-4 h-4" />
      default:
        return <MessageCircle className="w-4 h-4" />
    }
  }

  const getPlatformGradient = () => {
    switch (type) {
      case "tiktok":
        return "from-black to-gray-800"
      case "instagram":
        return "from-purple-500 via-pink-500 to-orange-500"
      case "youtube":
        return "from-red-600 to-red-700"
      case "whatsapp":
        return "from-green-500 to-green-600"
      case "twitter":
        return "from-blue-500 to-blue-600"
      case "facebook":
        return "from-blue-700 to-blue-800"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getEngagementStats = () => {
    const stats = []
    
    if (platformDetails.views) {
      stats.push({ icon: <Eye className="w-4 h-4" />, value: platformDetails.views, label: "views", color: "text-blue-600" })
    }
    if (platformDetails.likes) {
      stats.push({ icon: <Heart className="w-4 h-4" />, value: platformDetails.likes, label: "likes", color: "text-red-500" })
    }
    if (platformDetails.shares) {
      stats.push({ icon: <Share2 className="w-4 h-4" />, value: platformDetails.shares, label: "shares", color: "text-green-600" })
    }
    if (platformDetails.comments) {
      stats.push({ icon: <MessageCircle className="w-4 h-4" />, value: platformDetails.comments, label: "comments", color: "text-purple-600" })
    }
    
    return stats
  }

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden w-full",
        "border shadow-sm hover:shadow-md",
        "transition-all duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5",
        className
      )}
      style={{
        background: '#ffffff',
        borderColor: 'rgba(226, 232, 240, 0.6)',
        animation: 'slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Platform accent bar */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
        getPlatformGradient()
      )} />
      
      {/* Animated background */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-12 h-12 ring-2 ring-white shadow-lg">
                <AvatarFallback className={cn("text-sm font-bold bg-white text-gray-800") }>
                  {author?.[0]?.toUpperCase() ?? 'U'}
                </AvatarFallback>
              </Avatar>
              {/* Verified badge for popular accounts */}
              {parseInt(platformDetails.followers?.replace(/[^\d]/g, '') || '0') > 10000 && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Verified className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">@{author}</span>
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">2h</span>
              </div>
              {platformDetails.followers && (
                <span className="text-xs text-gray-600 font-medium">
                  {platformDetails.followers} followers
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={cn(
              "text-xs font-bold px-3 py-1 border-0 shadow-sm",
              "bg-gradient-to-r", getPlatformGradient(),
              "text-white hover:scale-105 transition-transform duration-200"
            )}>
              <div className="flex items-center gap-1">
                {getPlatformIcon()}
                <span>{config.name}</span>
              </div>
            </Badge>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative space-y-3 sm:space-y-4">
        {/* Post content */}
        <div className={cn(
          "relative p-3 sm:p-4 rounded-xl",
          "bg-white",
          "border border-gray-200/50 shadow-sm",
          "hover:shadow-md transition-shadow duration-200"
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-800 font-medium">
            {content}
          </p>
          
          {/* Content warning overlay for problematic content */}
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Engagement stats */}
        {getEngagementStats().length > 0 && (
          <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50/50 rounded-xl border border-gray-200/30">
            {getEngagementStats().map((stat, index) => (
              <div key={index} className={cn(
                "flex items-center gap-2 px-2 py-1 rounded-lg",
                "hover:bg-white/80 transition-colors duration-200 cursor-pointer",
                "group/stat"
              )}>
                <div className={cn(stat.color, "group-hover/stat:scale-110 transition-transform duration-200")}>
                  {stat.icon}
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-600">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Action buttons */}
  <div className="flex items-center justify-between pt-1 border-t border-gray-200/50">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 group">
            <Heart className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors duration-200" />
            <span className="text-xs text-gray-600 group-hover:text-red-600">Like</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 group">
            <MessageCircle className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors duration-200" />
            <span className="text-xs text-gray-600 group-hover:text-blue-600">Comment</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200 group">
            <Share2 className="w-4 h-4 text-gray-500 group-hover:text-green-500 transition-colors duration-200" />
            <span className="text-xs text-gray-600 group-hover:text-green-600">Share</span>
          </button>
        </div>
      </CardContent>
    </Card>
  )
})