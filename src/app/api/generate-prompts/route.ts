/**
 * API Route: POST /api/generate-prompts
 * Generates image prompts using Gemini API with offline fallback
 */

import { NextRequest, NextResponse } from 'next/server'
import { generatePromptsWithGemini } from '@/lib/geminiClient'
import { generateOfflinePrompts } from '@/lib/offlinePromptEngine'
import { validateGeneratePromptsRequest } from '@/utils/validation'
import type { GeneratePromptsResponse } from '@/types'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * POST handler for generating prompts
 */
export async function POST(request: NextRequest): Promise<NextResponse<GeneratePromptsResponse>> {
  try {
    // Parse request body
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        {
          success: false,
          prompts: [],
          category: 'mixed_trending',
          generatedAt: new Date().toISOString(),
          error: 'Invalid JSON in request body',
        },
        { status: 400 }
      )
    }

    // Validate request
    const validation = validateGeneratePromptsRequest(body)
    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        {
          success: false,
          prompts: [],
          category: 'mixed_trending',
          generatedAt: new Date().toISOString(),
          error: validation.error || 'Invalid request data',
        },
        { status: 400 }
      )
    }

    const requestData = validation.data

    // Try Gemini API first
    const geminiResponse = await generatePromptsWithGemini(requestData)

    if (geminiResponse && geminiResponse.success && geminiResponse.prompts.length > 0) {
      return NextResponse.json(geminiResponse, { status: 200 })
    }

    // Fallback to offline generator
    console.log('Using offline prompt generator (API failed)')
    const offlinePrompts = generateOfflinePrompts(requestData.count, requestData.category)

    const offlineResponse: GeneratePromptsResponse = {
      success: true,
      prompts: offlinePrompts,
      category: requestData.category,
      generatedAt: new Date().toISOString(),
      offline: true,
    }

    return NextResponse.json(offlineResponse, { status: 200 })
  } catch (error) {
    console.error('Generate prompts error:', error)

    return NextResponse.json(
      {
        success: false,
        prompts: [],
        category: 'mixed_trending',
        generatedAt: new Date().toISOString(),
        error: 'Failed to generate prompts. Please try again.',
      },
      { status: 500 }
    )
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
