/**
 * Input validation utilities
 */

import type {
  PromptCategory,
  CreativityLevel,
  RealismLevel,
  DetailLevel,
  GeneratePromptsRequest,
} from '@/types'

const VALID_CATEGORIES: PromptCategory[] = [
  'mixed_trending',
  'cinematic_photography',
  'ultra_realistic_portraits',
  'nature_wildlife',
  'travel_tourism',
  'fantasy_worlds',
  'architecture',
  'luxury_lifestyle',
  'historical_scenes',
  'islamic_art',
  'futuristic_cities',
  'vehicles',
  'food_photography',
  'fashion_editorial',
  'space_exploration',
  'ai_generation',
]

const VALID_CREATIVITY_LEVELS: CreativityLevel[] = ['conservative', 'balanced', 'experimental']
const VALID_REALISM_LEVELS: RealismLevel[] = ['medium', 'high', 'ultra']
const VALID_DETAIL_LEVELS: DetailLevel[] = ['standard', 'detailed', 'masterpiece']

export function isValidCategory(value: any): value is PromptCategory {
  return VALID_CATEGORIES.includes(value)
}

export function isValidCreativityLevel(value: any): value is CreativityLevel {
  return VALID_CREATIVITY_LEVELS.includes(value)
}

export function isValidRealismLevel(value: any): value is RealismLevel {
  return VALID_REALISM_LEVELS.includes(value)
}

export function isValidDetailLevel(value: any): value is DetailLevel {
  return VALID_DETAIL_LEVELS.includes(value)
}

export function validatePromptCount(count: any): count is number {
  const num = Number(count)
  return Number.isInteger(num) && num >= 1 && num <= 15
}

/**
 * Validate generate prompts request
 */
export function validateGeneratePromptsRequest(data: any): {
  valid: boolean
  error?: string
  data?: GeneratePromptsRequest
} {
  if (!data) {
    return { valid: false, error: 'Request body is required' }
  }

  if (!validatePromptCount(data.count)) {
    return {
      valid: false,
      error: 'Count must be a number between 1 and 15',
    }
  }

  if (!isValidCategory(data.category)) {
    return {
      valid: false,
      error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}`,
    }
  }

  if (!isValidCreativityLevel(data.creativity)) {
    return {
      valid: false,
      error: `Invalid creativity level. Must be one of: ${VALID_CREATIVITY_LEVELS.join(', ')}`,
    }
  }

  if (!isValidRealismLevel(data.realism)) {
    return {
      valid: false,
      error: `Invalid realism level. Must be one of: ${VALID_REALISM_LEVELS.join(', ')}`,
    }
  }

  if (!isValidDetailLevel(data.detailLevel)) {
    return {
      valid: false,
      error: `Invalid detail level. Must be one of: ${VALID_DETAIL_LEVELS.join(', ')}`,
    }
  }

  return {
    valid: true,
    data: {
      count: data.count,
      category: data.category,
      creativity: data.creativity,
      realism: data.realism,
      detailLevel: data.detailLevel,
    },
  }
}

/**
 * Sanitize text input
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .substring(0, 1000) // Limit length
    .replace(/[<>]/g, '') // Remove potential HTML
}
