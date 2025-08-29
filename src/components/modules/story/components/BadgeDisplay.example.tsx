import React, { useState } from "react"
import { BadgeDisplay } from "./BadgeDisplay"
import { BadgeInfo } from "@/types/scenarios"
import { Button } from "@/components/ui/button"

// Example badge configurations
const exampleBadges: BadgeInfo[] = [
  {
    id: "cycle-breaker",
    name: "Cycle Breaker Badge",
    description: "Awarded for successfully breaking negative cycles in relationships",
    icon: "ShieldCheck",
    color: "from-green-500 to-emerald-600",
    criteria: {
      minScore: 80,
      completedScenarios: 5
    }
  },
  {
    id: "peacemaker",
    name: "Peacemaker Award",
    description: "Recognized for choosing peaceful resolutions in conflicts",
    icon: "Award",
    color: "from-blue-500 to-indigo-600",
    criteria: {
      minScore: 75,
      perfectScores: 3
    }
  },
  {
    id: "community-star",
    name: "Community Star",
    description: "Earned by demonstrating strong community values",
    icon: "Star",
    color: "from-yellow-500 to-orange-600",
    criteria: {
      minScore: 70,
      completedScenarios: 3
    }
  },
  {
    id: "unity-trophy",
    name: "Unity Trophy",
    description: "Achieved by promoting unity and understanding",
    icon: "Trophy",
    color: "from-purple-500 to-pink-600",
    criteria: {
      minScore: 85,
      perfectScores: 2,
      timeLimit: 300
    }
  }
]

export default function BadgeDisplayExample() {
  const [selectedBadge, setSelectedBadge] = useState<BadgeInfo>(exampleBadges[0])
  const [showAnimation, setShowAnimation] = useState(true)
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [key, setKey] = useState(0) // Force re-render for animation

  const triggerAnimation = () => {
    setKey(prev => prev + 1)
    setShowAnimation(true)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">BadgeDisplay Component</h1>
        <p className="text-gray-600">Interactive badge display with animations and visual feedback</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Controls</h2>

        {/* Badge Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Select Badge:</label>
          <div className="flex flex-wrap gap-2">
            {exampleBadges.map((badge, index) => (
              <Button
                key={index}
                variant={selectedBadge.name === badge.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedBadge(badge)}
              >
                {badge.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Size:</label>
          <div className="flex gap-2">
            {(['sm', 'md', 'lg'] as const).map((sizeOption) => (
              <Button
                key={sizeOption}
                variant={size === sizeOption ? "default" : "outline"}
                size="sm"
                onClick={() => setSize(sizeOption)}
              >
                {sizeOption.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Animation Controls */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Animation:</label>
          <div className="flex gap-2">
            <Button
              variant={showAnimation ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAnimation(!showAnimation)}
            >
              {showAnimation ? "Enabled" : "Disabled"}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={triggerAnimation}
            >
              Trigger Animation
            </Button>
          </div>
        </div>
      </div>

      {/* Badge Display Examples */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Badge Display</h2>

        {/* Main Example */}
        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg border">
          <div className="flex justify-center">
            <BadgeDisplay
              key={key}
              badge={selectedBadge}
              showAnimation={showAnimation}
              size={size}
              onAnimationComplete={() => console.log('Animation completed!')}
            />
          </div>
        </div>

        {/* Size Comparison */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Size Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['sm', 'md', 'lg'] as const).map((sizeOption) => (
              <div key={sizeOption} className="bg-white p-6 rounded-lg border text-center space-y-4">
                <h4 className="font-medium text-gray-700 capitalize">{sizeOption} Size</h4>
                <BadgeDisplay
                  badge={selectedBadge}
                  showAnimation={false}
                  size={sizeOption}
                />
              </div>
            ))}
          </div>
        </div>

        {/* All Badges */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">All Badge Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exampleBadges.map((badge, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border text-center space-y-4">
                <h4 className="font-medium text-gray-700">{badge.name}</h4>
                <BadgeDisplay
                  badge={badge}
                  showAnimation={false}
                  size="md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Information */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Usage Information</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>Props:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><code>badge: BadgeInfo</code> - Badge configuration with name, icon, and color</li>
            <li><code>showAnimation?: boolean</code> - Enable/disable entrance animation (default: true)</li>
            <li><code>size?: &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</code> - Badge size variant (default: &apos;md&apos;)</li>
            <li><code>className?: string</code> - Additional CSS classes</li>
            <li><code>onAnimationComplete?: () =&gt; void</code> - Callback when animation finishes</li>
          </ul>
          <p className="mt-3"><strong>Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Smooth entrance animations with slide and fade effects</li>
            <li>Celebration particle effects during animation</li>
            <li>Hover interactions with scale and rotation effects</li>
            <li>Responsive design with mobile-optimized sizing</li>
            <li>Support for both string and React component icons</li>
            <li>Gradient backgrounds with customizable colors</li>
          </ul>
        </div>
      </div>
    </div>
  )
}