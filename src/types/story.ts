// Story module type definitions

export interface StoryChoice {
  text: string
  nextScene: string
}

export interface StoryScene {
  id: string
  text: string
  image: string
  choices?: StoryChoice[]
  isEnding: boolean
  outcomeType?: 'positive' | 'negative' | 'neutral'
  badge?: string
}

export interface StoryData {
  [sceneId: string]: StoryScene
}

export interface StoryOutcome {
  type: 'positive' | 'negative' | 'neutral'
  badge?: string
  message: string
}