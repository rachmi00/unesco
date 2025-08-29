import React, { useState } from 'react'
import { StoryScene } from './StoryScene'
import { aniseRayStory } from '../data/anise-ray-story'
import { StoryChoice } from '@/types/story'

/**
 * Example usage of the StoryScene component
 * This demonstrates how to use the component with the actual story data
 */
export function StorySceneExample() {
  const [currentSceneId, setCurrentSceneId] = useState('scene1')
  const [isActive, setIsActive] = useState(true)

  const currentScene = aniseRayStory[currentSceneId]

  const handleChoiceSelect = (choice: StoryChoice) => {
    setIsActive(false)
    
    // Simulate scene transition delay
    setTimeout(() => {
      setCurrentSceneId(choice.nextScene)
      setIsActive(true)
    }, 300)
  }

  const handleRestart = () => {
    setIsActive(false)
    setTimeout(() => {
      setCurrentSceneId('scene1')
      setIsActive(true)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Anise & Ray Story Demo
          </h1>
          <p className="text-gray-600">
            Interactive story scene component demonstration
          </p>
        </div>

        <StoryScene
          scene={currentScene}
          onChoiceSelect={handleChoiceSelect}
          isActive={isActive}
        />

        {currentScene.isEnding && (
          <div className="text-center mt-6">
            <button
              onClick={handleRestart}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Restart Story
            </button>
          </div>
        )}

        <div className="text-center text-sm text-gray-500 mt-4">
          Current Scene: {currentScene.id} | 
          Ending: {currentScene.isEnding ? 'Yes' : 'No'} |
          Outcome: {currentScene.outcomeType || 'N/A'}
        </div>
      </div>
    </div>
  )
}

export default StorySceneExample