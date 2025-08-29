import React, { useState } from 'react'
import { StoryChoice } from './StoryChoice'
import { StoryChoice as StoryChoiceType } from '@/types/story'

// Example story choices for demonstration
const exampleChoices: StoryChoiceType[] = [
  {
    text: "Screenshot and post revenge comment",
    nextScene: "retaliation"
  },
  {
    text: "Report the video and message Ray privately",
    nextScene: "cycle_breaker"
  }
]

export function StoryChoiceExample() {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [disabled, setDisabled] = useState(false)

  const handleChoiceSelect = (index: number) => {
    setSelectedChoice(index)
    console.log(`Selected choice ${index + 1}: ${exampleChoices[index].text}`)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">StoryChoice Component Example</h2>
        <p className="text-gray-600">Interactive story choice selection with mobile-optimized design</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Disable choices</span>
          </label>
          <button
            onClick={() => setSelectedChoice(null)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Clear Selection
          </button>
        </div>

        <div className="space-y-3">
          {exampleChoices.map((choice, index) => (
            <StoryChoice
              key={index}
              choice={choice}
              index={index}
              onSelect={() => handleChoiceSelect(index)}
              disabled={disabled}
              isSelected={selectedChoice === index}
            />
          ))}
        </div>

        {selectedChoice !== null && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Selected:</strong> Choice {selectedChoice + 1} - {exampleChoices[selectedChoice].text}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Next scene: {exampleChoices[selectedChoice].nextScene}
            </p>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p><strong>Features demonstrated:</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Mobile-optimized touch targets (44px minimum)</li>
          <li>Hover and active state animations</li>
          <li>Keyboard navigation support (Enter/Space)</li>
          <li>Selection indicators and disabled states</li>
          <li>Responsive text wrapping for long choices</li>
          <li>Touch-friendly interaction handling</li>
        </ul>
      </div>
    </div>
  )
}