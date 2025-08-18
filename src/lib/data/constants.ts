import { PlatformType, AdultCategory } from "@/types/scenarios"

// Constants for scenario data and UI

export const PLATFORM_CONFIGS = {
  tiktok: {
    name: "TikTok",
    color: "bg-black text-white",
    icon: "Play"
  },
  instagram: {
    name: "Instagram", 
    color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    icon: "Camera"
  },
  youtube: {
    name: "YouTube",
    color: "bg-red-600 text-white", 
    icon: "Play"
  },
  whatsapp: {
    name: "WhatsApp",
    color: "bg-green-600 text-white",
    icon: "MessageCircle"
  },
  twitter: {
    name: "Twitter",
    color: "bg-blue-500 text-white",
    icon: "MessageCircle"
  },
  facebook: {
    name: "Facebook",
    color: "bg-blue-700 text-white",
    icon: "Users"
  }
} as const

export const ADULT_CATEGORY_CONFIGS = {
  workplace: {
    name: "Workplace",
    icon: "Briefcase",
    color: "text-blue-600"
  },
  community: {
    name: "Community",
    icon: "Users", 
    color: "text-green-600"
  },
  political: {
    name: "Political",
    icon: "Scale",
    color: "text-purple-600"
  },
  media: {
    name: "Media",
    icon: "AlertTriangle",
    color: "text-orange-600"
  },
  business: {
    name: "Business",
    icon: "Building",
    color: "text-indigo-600"
  }
} as const

export const BADGE_LEVELS = {
  teen: {
    90: { name: "Digital Rights Defender", icon: "Shield", color: "text-blue-600" },
    75: { name: "Media Literacy Leader", icon: "Users", color: "text-green-600" },
    60: { name: "Awareness Builder", icon: "AlertTriangle", color: "text-orange-600" },
    0: { name: "Learning Digital Citizenship", icon: "Scale", color: "text-gray-600" }
  },
  adult: {
    90: { name: "Ethics Champion", icon: "Award", color: "text-blue-600" },
    75: { name: "Professional Leader", icon: "Shield", color: "text-green-600" },
    60: { name: "Responsible Citizen", icon: "CheckCircle", color: "text-orange-600" },
    0: { name: "Building Awareness", icon: "BookOpen", color: "text-gray-600" }
  }
} as const

export const MAX_POINTS_PER_SCENARIO = 4
export const SCENARIOS_PER_MODULE = 8