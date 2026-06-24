/**
 * API Route: GET /api/trending-prompts
 * Generates and caches trending prompts
 */

import { NextResponse } from 'next/server'
import { generateTrendingWithGemini } from '@/lib/geminiClient'
import { generateOfflinePrompts } from '@/lib/offlinePromptEngine'
import { cache, CACHE_KEYS, CACHE_TTL } from '@/utils/cache'
import type { TrendingPromptsResponse } from '@/types'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * GET handler for trending prompts
 */
export async function GET(): Promise<NextResponse<TrendingPromptsResponse>> {
  try {
    // Check cache first
    const cachedPrompts = cache.get<string[]>(CACHE_KEYS.TRENDING_PROMPTS)
    if (cachedPrompts && cachedPrompts.length > 0) {
      return NextResponse.json(
        {
          success: true,
          prompts: cachedPrompts,
          category: 'mixed_trending',
          generatedAt: new Date().toISOString(),
        },
        { status: 200 }
      )
    }

    // Try Gemini API
    const geminiPrompts = await generateTrendingWithGemini(5)

    if (geminiPrompts && geminiPrompts.length > 0) {
      // Cache the result
      cache.set(CACHE_KEYS.TRENDING_PROMPTS, geminiPrompts, CACHE_TTL.TRENDING_PROMPTS)

      return NextResponse.json(
        {
          success: true,
          prompts: geminiPrompts,
          category: 'mixed_trending',
          generatedAt: new Date().toISOString(),
        },
        { status: 200 }
      )
    }

    // Fallback to offline generator
    console.log('Using offline engine for trending prompts (API failed)')
    const offlinePrompts = generateOfflinePrompts(5, 'mixed_trending')
    cache.set(CACHE_KEYS.TRENDING_PROMPTS, offlinePrompts, CACHE_TTL.TRENDING_PROMPTS)

    return NextResponse.json(
      {
        success: true,
        prompts: offlinePrompts,
        category: 'mixed_trending',
        generatedAt: new Date().toISOString(),
        offline: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Trending prompts error:', error)

    // Fallback to offline generator on error
    try {
      const offlinePrompts = generateOfflinePrompts(5, 'mixed_trending')
      return NextResponse.json(
        {
          success: true,
          prompts: offlinePrompts,
          category: 'mixed_trending',
          generatedAt: new Date().toISOString(),
          offline: true,
        },
        { status: 200 }
      )
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError)
      return NextResponse.json(
        {
          success: false,
          prompts: [],
          category: 'mixed_trending',
          generatedAt: new Date().toISOString(),
          error: 'Failed to generate trending prompts',
        },
        { status: 500 }
      )
    }
  }
}

/**
 * OPTIONS handler for CORS preflight
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
