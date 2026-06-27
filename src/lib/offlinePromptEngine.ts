/**
 * Offline Prompt Generation Engine
 * Fallback when Gemini API is unavailable
 */

import type { OfflinePromptData, PromptCategory } from '@/types'

const offlineData: OfflinePromptData = {
  subjects: [
    'A realistic 33-year-old Pakistani man with natural black hair and warm brown eyes',
    'A 32-year-old South Asian man with well-groomed beard and wheatish complexion',
    'A 34-year-old Pakistani male with neatly styled dark hair and authentic South Asian features',
    'A 31-year-old Asian man with natural beard and brown eyes',
    'A 35-year-old Pakistani gentleman with professional appearance and genuine expressions',
    'A 32-year-old South Asian man wearing traditional kurta with dignified posture',
    'A 33-year-old Pakistani man with warm smile and realistic facial features',
    'A 30-year-old Pakistani male with dark eyes and natural skin texture',
  ],
  environments: [
    'Upper Kachura Lake in Skardu with mountain backdrop',
    'Hunza Valley during golden hour',
    'Swat Valley with lush green landscapes',
    'Kalam village nestled in mountains',
    'Naran-Kaghan plateau with scenic beauty',
    'Kashmir meadows with wildflowers',
    'Lahore Old City streets',
    'Islamabad hills and gardens',
    'Pakistani village with traditional architecture',
    'Hunza apricot orchards in bloom',
    'Gilgit mountain landscape',
    'Chitral river valley scenery',
    'Northern Areas snow-peaked mountains',
    'Pakistani desert landscape at sunset',
  ],
  lighting: [
    'golden hour side-lighting',
    'dramatic chiaroscuro lighting',
    'soft window diffusion',
    'neon cyberpunk glow',
    'natural sunlight through leaves',
    'rim lighting silhouette',
    'studio professional three-point lighting',
    'cool blue moonlight',
    'warm candlelight',
    'harsh midday sunlight',
    'volumetric god rays',
    'bioluminescent ambient glow',
  ],
  weather: [
    'clear blue sky with scattered clouds',
    'dramatic storm clouds brewing',
    'gentle rain with dewdrops',
    'dense fog creating atmosphere',
    'snow falling peacefully',
    'clear starry night',
    'golden sunset hour',
    'misty morning',
    'rainbow after rain',
    'auroras dancing',
  ],
  cameras: [
    'Shot with Canon EOS R5',
    'Captured on Sony A1',
    'Using Nikon Z9 camera',
    'Photographed with Fujifilm GFX100',
    'Shot on Leica M6',
    'Using Hasselblad 907X',
    'Captured on Pentax 645Z',
    'Shot with Red Komodo',
  ],
  lenses: [
    'ultra-wide 16mm lens',
    'standard 35mm prime',
    'portrait 85mm f/1.4',
    'telephoto 200mm compression',
    'macro 100mm lens',
    'fisheye 8mm perspective',
    'anamorphic cinematic lens',
    'tilt-shift perspective control',
  ],
  compositions: [
    'rule of thirds composition',
    'centered symmetrical framing',
    'leading lines drawing viewer in',
    'layered depth with foreground subject',
    'negative space emphasizing subject',
    'diagonal dynamic tension',
    'frame within frame technique',
    'dutch angle for drama',
    'golden spiral composition',
    'split-screen duality',
  ],
  moods: [
    'ethereal and dreamlike',
    'intense and dramatic',
    'serene and peaceful',
    'mysterious and haunting',
    'vibrant and energetic',
    'melancholic and introspective',
    'joyful and celebratory',
    'cinematic and cinematic',
    'intimate and vulnerable',
    'majestic and awe-inspiring',
    'moody and atmospheric',
    'surreal and otherworldly',
  ],
  colorGrading: [
    'warm golden tones with lifted blacks',
    'cool teal and orange grading',
    'desaturated moody palette',
    'vibrant neon colors',
    'muted pastel tones',
    'high contrast black and white',
    'cinematic log color science',
    'vintage film stock aesthetics',
    'contrasty high-key lighting',
    'dark dramatic shadows',
  ],
  photographyStyles: [
    'documentary lifestyle photography',
    'cultural portrait style',
    'editorial travel photography',
    'fashion menswear editorial',
    'cultural heritage photography',
    'professional headshot style',
    'landscape travel photography',
    'cultural documentary style',
    'authentic lifestyle photography',
    'architectural and cultural fusion',
    'South Asian cultural photography',
    'authentic South Asian portraiture',
    'magazine editorial style',
    'professional commercial photography',
  ],
}

export function generateOfflinePrompt(category: PromptCategory): string {
  const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

  const subject = getRandomItem(offlineData.subjects)
  const environment = getRandomItem(offlineData.environments)
  const lighting = getRandomItem(offlineData.lighting)
  const weather = getRandomItem(offlineData.weather)
  const camera = getRandomItem(offlineData.cameras)
  const lens = getRandomItem(offlineData.lenses)
  const composition = getRandomItem(offlineData.compositions)
  const mood = getRandomItem(offlineData.moods)
  const colorGrading = getRandomItem(offlineData.colorGrading)
  const style = getRandomItem(offlineData.photographyStyles)

  const categoryModifiers: Record<PromptCategory, string> = {
    mixed_trending: 'trending on social media, viral aesthetic',
    cinematic_photography: 'cinematic filmmaking quality, motion picture standard',
    ultra_realistic_portraits: 'hyper-detailed facial features, skin texture perfect',
    nature_wildlife: 'wildlife documentary, BBC nature photography',
    travel_tourism: 'travel destination, wanderlust inducing, postcard perfect',
    fantasy_worlds: 'fantasy realm, magical elements, epic fantasy',
    architecture: 'architectural masterpiece, building design, structural beauty',
    luxury_lifestyle: 'luxury premium quality, high-end styling, opulent',
    historical_scenes: 'historical period accurate, vintage era authenticity',
    islamic_art: 'Islamic geometric patterns, Islamic cultural heritage, calligraphy',
    futuristic_cities: 'cyberpunk aesthetic, sci-fi futuristic, neon future',
    vehicles: 'automotive showcase, vehicle detail, mechanical precision',
    food_photography: 'food styling, culinary art, gastronomic presentation',
    fashion_editorial: 'high fashion editorial, runway quality, designer aesthetic',
    space_exploration: 'space photography, cosmic wonder, astronomical beauty',
    ai_generation: 'AI art masterpiece, digital painting, generative art',
  }

  const categoryModifier = categoryModifiers[category]

  // Construct professional prompt
  const prompt = `${subject}, positioned in ${environment}. 

${lighting} illuminating the scene. Weather: ${weather}. 

${composition}. Shot with ${camera} and ${lens}. 

Professional ${style} capturing ${mood} atmosphere. 

Color grading: ${colorGrading}. 

${categoryModifier}. 

8K resolution, photorealistic rendering, studio quality, professional production, award-winning photography, detailed textures, perfect composition, dynamic poses, captivating expressions, museum-quality print, ready for publication.`

  return prompt
}

/**
 * Generate multiple offline prompts
 */
export function generateOfflinePrompts(
  count: number,
  category: PromptCategory
): string[] {
  const prompts: string[] = []
  const maxAttempts = count * 3

  for (let i = 0; i < count && i < maxAttempts; i++) {
    prompts.push(generateOfflinePrompt(category))
  }

  return prompts.slice(0, count)
}
