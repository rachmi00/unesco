import React, { useState } from 'react'
import { StoryOutcome } from './StoryOutcome'
import { StoryScene } from '@/types/story'
import { BadgeInfo } from '@/types/scenarios'

// Example story outcome scenes for demonstration
const positiveOutcomeScene: StoryScene = {
  id: 'cycle_breaker',
  text: 'You feel empowered by choosing dialogue over revenge. Ray appreciates your message and reflects on his words.',
  image: '/pixel-art/anise-proud.png',
  isEnding: true,
  outcomeType: 'positive',
  badge: 'Cycle Breaker Badge'
}

const negativeOutcomeScene: StoryScene = {
  id: 'retaliation',
  text: 'Your comment sparks a heated argument. Others join in with more stereotypes. The cycle continues.',
  image: '/pixel-art/comment-war.png',
  isEnding: true,
  outcomeType: 'negative'
}

const exampleBadge: BadgeInfo = {
  id: 'cycle-breaker',
  name: 'Cycle Breaker Badge',
  description: 'Awarded for successfully breaking negative cycles',
  icon: 'ShieldCheck',
  color: 'from-green-500 to-emerald-600',
  criteria: {
    minScore: 80,
    completedScenarios: 5
  }
}

export function StoryOutcomeExample() {
  const [currentOutcome, setCurrentOutcome] = useState<'positive' | 'negative'>('positive')
  const [showBadge, setShowBadge] = useState(true)

  const handleRestart = () => {
    console.log('Story restart requested')
    // In a real implementation, this would reset the story state
  }

  const currentScene = currentOutcome === 'positive' ? positiveOutcomeScene : negativeOutcomeScene
  const badge = currentOutcome === 'positive' && showBadge ? exampleBadge : undefined

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">StoryOutcome Component Example</h2>
        <p className="text-gray-600">Interactive story endings with educational messaging and badge awards</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Outcome Type:</span>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="outcome"
                value="positive"
                checked={currentOutcome === 'positive'}
                onChange={(e) => setCurrentOutcome(e.target.value as 'positive')}
                className="rounded"
              />
              <span className="text-sm text-green-700">Positive (Cycle Breaker)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="outcome"
                value="negative"
                checked={currentOutcome === 'negative'}
                onChange={(e) => setCurrentOutcome(e.target.value as 'negative')}
                className="rounded"
              />
              <span className="text-sm text-red-700">Negative (Retaliation)</span>
            </label>
          </div>
          
          {currentOutcome === 'positive' && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showBadge}
                onChange={(e) => setShowBadge(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-700">Show Badge</span>
            </label>
          )}
        </div>

        <div className="flex justify-center">
          <StoryOutcome
            scene={currentScene}
            badge={badge}
            onRestart={handleRestart}
          />
        </div>
      </div>

      <div className="text-xs text-gray-500 space-y-2">
        <p><strong>Features demonstrated:</strong></p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-700 mb-1">Positive Outcomes:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Green color scheme and positive messaging</li>
              <li>Badge animation and display</li>
              <li>Empowering educational content</li>
              <li>Success-oriented visual indicators</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">Negative Outcomes:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Red color scheme and reflective messaging</li>
              <li>No badge display</li>
              <li>Non-preachy educational content</li>
              <li>Constructive learning opportunities</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="font-medium text-gray-700 mb-1">General Features:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Mobile-first responsive design</li>
            <li>Smooth entrance animations</li>
            <li>Educational messaging without judgment</li>
            <li>Image fallback handling</li>
            <li>Accessible color contrast and structure</li>
            <li>Touch-friendly restart button</li>
          </ul>
        </div>
      </div>
    </div>
  )
}