/**
 * Gemini API Client
 * Handles communication with Google Gemini API
 */

import type { GeneratePromptsRequest, GeneratePromptsResponse } from '@/types'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini client
const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  console.warn('GEMINI_API_KEY not configured. Offline mode will be used.')
}

const client = apiKey ? new GoogleGenerativeAI(apiKey) : null

const systemPrompt = `You are an elite AI image prompt engineer with expertise in generating professional Gemini image prompts.

Your role is to create highly realistic, cinematic, and social-media-worthy image prompts that are optimized for AI image generation.

DEFAULT SUBJECT RULES:
Unless the user explicitly specifies otherwise (a woman, female character, specific person, or different nationality):
- ALL human subjects MUST be male
- Default subject: Pakistani man, South Asian man, or Asian man
- Default age: 30-35 years old (preferably 32-34)
- Default appearance: Pakistani male features with:
  * Natural black or dark brown hair
  * Brown eyes
  * Medium wheatish skin tone
  * South Asian facial structure
  * Realistic beard when appropriate
  * Natural skin texture and authentic facial expressions
- DO NOT generate: Women, girls, female models, female portraits, female-related content
- Default clothing: Prioritize Shalwar Kameez, Kurta, Waistcoat, casual/smart Pakistani fashion
- Default locations: Strong preference for Hunza, Skardu, Swat, Kalam, Naran, Kashmir, Lahore, Islamabad, or Pakistani mountain regions

EXAMPLE PROMPT STRUCTURE:
"A realistic 33-year-old Pakistani man with neatly styled black hair, a well-groomed beard, warm brown eyes, and a natural wheatish complexion, standing beside a wooden boat on Upper Kachura Lake in Skardu during sunrise. Wearing a navy blue kurta with a traditional waistcoat. Captured on a Sony A7R V using an 85mm f/1.4 lens. Golden hour lighting, cinematic composition, realistic skin texture, authentic South Asian appearance, shallow depth of field, ultra-photorealistic, documentary-style photography, 8K quality."

OVERRIDE RULE:
If the user explicitly requests a woman, female character, specific person, celebrity, or different nationality, follow the user's request exactly. Otherwise, default to Pakistani male (age 30-35, realistic appearance).

REQUIREMENTS FOR EVERY PROMPT:
- Hyper realistic and photorealistic
- Cinematic quality with professional cinematography language
- Social media worthy, trending on Instagram, Pinterest, TikTok
- Detailed storytelling with rich narrative elements
- Professional photography language including:
  * Specific camera details
  * Lens information and focal lengths
  * Detailed lighting setups (key, fill, back lights)
  * Composition techniques
  * Atmosphere and mood
  * Color grading specifics
  * Texture and material details
- High visual impact and compelling
- Follow modern trends from Facebook, Instagram, Pinterest, TikTok, and AI art communities
- Avoid repetition and generic outputs
- Length: 120-250 words per prompt

PROMPT FORMAT:
Each prompt should flow naturally with technical details woven throughout, not as a list.

RETURN FORMAT:
Return ONLY valid JSON with this exact structure:
{
  "prompts": [
    "prompt1 content here",
    "prompt2 content here"
  ]
}

Do not include any markdown, explanations, or text outside the JSON.`

const categorySystemPrompts: Record<string, string> = {
  mixed_trending:
    'Generate trending image prompts that combine multiple styles. Focus on viral aesthetics from TikTok, Instagram, and Pinterest. Mix cinematic with editorial styles.',
  cinematic_photography:
    'Generate cinematic photography prompts with film production quality. Include specific lens choices, camera movements implied, and cinematic lighting setups typical of Hollywood production.',
  ultra_realistic_portraits:
    'Generate ultra-realistic portrait prompts with extreme facial detail. Focus on skin texture, eye details, lighting that reveals character. Include specific emotional expressions and styling.',
  nature_wildlife:
    'Generate nature and wildlife prompts in their natural habitats. Include ecosystem details, seasonal specifics, lighting conditions, and behavioral moments captured.',
  travel_tourism:
    'Generate travel and tourism prompts of iconic and hidden locations. Include cultural context, light conditions, atmospheric elements, and the emotional experience of the location.',
  fantasy_worlds:
    'Generate fantasy world prompts with immersive magical elements. Include creature design, world-building details, magical lighting effects, and epic scale.',
  architecture:
    'Generate architectural photography prompts showcasing building design masterpieces. Include structural details, material textures, lighting to highlight form, and spatial composition.',
  luxury_lifestyle:
    'Generate luxury lifestyle prompts with premium products, high-end styling, and opulent environments. Focus on premium materials, professional styling, and aspirational aesthetics.',
  historical_scenes:
    'Generate historically accurate scene prompts from specific time periods. Include period-accurate costumes, architecture, lighting conditions, and cultural details.',
  islamic_art:
    'Generate Islamic art and culture prompts featuring geometric patterns, calligraphy, architectural elements, and cultural heritage. Include intricate detail work and traditional aesthetics.',
  futuristic_cities:
    'Generate futuristic city and cyberpunk prompts with sci-fi aesthetics. Include neon lighting, advanced technology, dystopian or utopian elements, and futuristic architecture.',
  vehicles:
    'Generate automotive and vehicle showcase prompts. Include specific car/vehicle details, mechanical precision, polished photography techniques, and dynamic positioning.',
  food_photography:
    'Generate food photography prompts with culinary styling. Include plate composition, food presentation, steam/condensation details, garnishing, and gastronomic appeal.',
  fashion_editorial:
    'Generate high fashion editorial prompts with runway-ready styling. Include designer aesthetics, model positioning, fabric details, and editorial magazine quality.',
  space_exploration:
    'Generate space and astronomy prompts showing cosmic wonders. Include celestial objects, astronomical accuracy, cosmic lighting, and the vastness of space.',
  ai_generation:
    'Generate AI art masterpiece prompts with digital painting quality. Include artistic styles, surreal elements, and generative art aesthetics.',
}

/**
 * Generate prompts using Gemini API
 * Falls back to null on error (caller should handle offline mode)
 */
export async function generatePromptsWithGemini(
  request: GeneratePromptsRequest
): Promise<GeneratePromptsResponse | null> {
  if (!client) {
    return null
  }

  try {
    // Use gemini-1.5-pro which works with free tier
    const model = client.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const categoryPrompt = categorySystemPrompts[request.category] || ''

    const userPrompt = `Generate exactly ${request.count} unique, high-quality image prompts for AI image generation.

Category: ${request.category.replace(/_/g, ' ')}
${categoryPrompt}

Creativity: ${request.creativity} | Realism: ${request.realism} | Detail: ${request.detailLevel}

Each prompt: 120-250 words, professional, unique, no repetition.

Return ONLY valid JSON:
{
  "prompts": ["prompt1", "prompt2", ...]
}`

    const response = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
      systemInstruction: systemPrompt,
      generationConfig: {
        temperature: request.creativity === 'conservative' ? 0.3 : request.creativity === 'balanced' ? 0.7 : 1.0,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 4000,
      },
    })

    if (!response.response) {
      console.warn('Empty response from Gemini API')
      return null
    }

    const textContent = response.response.candidates
      ?.map((candidate) =>
        candidate.content.parts
          .filter((part) => 'text' in part)
          .map((part) => (part as any).text)
          .join('')
      )
      .join('') || ''

    if (!textContent) {
      console.warn('No text content in Gemini response')
      return null
    }

    // Parse JSON response
    const jsonMatch = textContent.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('Invalid JSON response from Gemini:', textContent.slice(0, 200))
      return null
    }

    const parsedResponse = JSON.parse(jsonMatch[0])

    if (!Array.isArray(parsedResponse.prompts)) {
      console.error('Invalid prompts format from Gemini')
      return null
    }

    // Validate we got the right number of prompts
    const prompts = parsedResponse.prompts.slice(0, request.count)

    return {
      success: true,
      prompts,
      category: request.category,
      generatedAt: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    return null
  }
}

/**
 * Generate trending prompts with Gemini API
 */
export async function generateTrendingWithGemini(count: number): Promise<string[] | null> {
  if (!client) {
    return null
  }

  try {
    // Use gemini-1.5-pro which works with free tier
    const model = client.getGenerativeModel({ model: 'gemini-1.5-pro' })

    const userPrompt = `Generate exactly ${count} unique, trending image prompts that are currently viral on social media (Instagram, TikTok, Pinterest).

Each prompt should be 120-250 words, professional, and optimized for AI image generation.

Focus on latest trends, aesthetic styles, and viral themes.

Return ONLY valid JSON:
{
  "prompts": ["prompt1", "prompt2", ...]
}`

    const response = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
      systemInstruction: systemPrompt,
      generationConfig: {
        temperature: 0.8,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2000,
      },
    })

    if (!response.response) {
      console.warn('Empty response from Gemini trending API')
      return null
    }

    const textContent = response.response.candidates
      ?.map((candidate) => 
        candidate.content.parts
          .filter((part) => 'text' in part)
          .map((part) => (part as any).text)
          .join('')
      )
      .join('') || ''

    if (!textContent) {
      console.warn('No text content in Gemini response')
      return null
    }

    // Parse JSON response
    const jsonMatch = textContent.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.warn('No JSON found in Gemini response')
      return null
    }

    const parsedResponse = JSON.parse(jsonMatch[0])
    const prompts = Array.isArray(parsedResponse.prompts) ? parsedResponse.prompts : null
    
    if (!prompts || prompts.length === 0) {
      console.warn('No prompts in parsed response')
      return null
    }

    return prompts.slice(0, count)
  } catch (error) {
    console.error('Gemini trending API error:', error)
    return null
  }
}
