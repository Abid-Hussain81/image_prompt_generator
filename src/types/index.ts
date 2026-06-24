/**
 * Type definitions for AI Prompt Forge application
 */

export interface GeneratePromptsRequest {
  count: number
  category: PromptCategory
  creativity: CreativityLevel
  realism: RealismLevel
  detailLevel: DetailLevel
}

export interface GeneratePromptsResponse {
  success: boolean
  prompts: string[]
  category: PromptCategory
  generatedAt: string
  offline?: boolean
  error?: string
}

export interface TrendingPromptsResponse {
  success: boolean
  prompts: string[]
  category: PromptCategory
  generatedAt: string
  offline?: boolean
  error?: string
}

export type PromptCategory =
  | 'mixed_trending'
  | 'cinematic_photography'
  | 'ultra_realistic_portraits'
  | 'nature_wildlife'
  | 'travel_tourism'
  | 'fantasy_worlds'
  | 'architecture'
  | 'luxury_lifestyle'
  | 'historical_scenes'
  | 'islamic_art'
  | 'futuristic_cities'
  | 'vehicles'
  | 'food_photography'
  | 'fashion_editorial'
  | 'space_exploration'
  | 'ai_generation'

export type CreativityLevel = 'conservative' | 'balanced' | 'experimental'
export type RealismLevel = 'medium' | 'high' | 'ultra'
export type DetailLevel = 'standard' | 'detailed' | 'masterpiece'

export interface PromptSettings {
  count: number
  category: PromptCategory
  creativity: CreativityLevel
  realism: RealismLevel
  detailLevel: DetailLevel
}

export interface Favorite {
  id: string
  prompt: string
  category: PromptCategory
  savedAt: string
}

export interface Statistics {
  promptsGenerated: number
  favoritesSaved: number
  currentCategory: PromptCategory
}

export interface OfflinePromptData {
  subjects: string[]
  environments: string[]
  lighting: string[]
  weather: string[]
  cameras: string[]
  lenses: string[]
  compositions: string[]
  moods: string[]
  colorGrading: string[]
  photographyStyles: string[]
}
