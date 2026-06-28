/**
 * Offline Prompt Generation Engine
 * Fallback when Gemini API is unavailable
 * Implements comprehensive visual quality, diversity, and realism guidelines
 */

import type { OfflinePromptData, PromptCategory } from '@/types'

const offlineData: OfflinePromptData = {
  subjects: [
    'A strikingly handsome 33-year-old Pakistani man with perfectly styled natural jet-black hair, warm amber-brown eyes, and authentic South Asian facial features with natural smile',
    'A confident 32-year-old South Asian gentleman featuring a well-groomed dark beard, warm wheatish complexion, and perfectly symmetrical facial structure with engaging expression',
    'A 34-year-old Pakistani male with naturally textured black hair, defined masculine jawline, and genuinely warm smile revealing excellent teeth',
    'A striking 31-year-old South Asian man with healthy glowing skin tone, expressive soulful brown eyes, and authentic human facial proportions',
    'A dignified 35-year-old Pakistani gentleman displaying natural skin texture with visible pores, warm confident presence, and realistic facial character details',
    'A professionally groomed 30-year-old South Asian man with natural beard texture, culturally authentic appearance, and charismatic genuine smile',
    'A handsome 33-year-old Pakistani man with ultra-sharp penetrating eyes, fine realistic skin texture, and naturally confident expression',
    'A personable 32-year-old South Asian male featuring warm brown eyes, dark lustrous hair, and authentically proportioned South Asian facial structure',
    'A charismatic 31-year-old Pakistani man with well-defined features, natural complexion, and magnetic warm presence',
    'A refined 34-year-old South Asian gentleman with impeccable grooming, authentic skin texture, and genuinely approachable demeanor',
  ],
  environments: [
    // Urban environments
    'Lahore Old City bustling cobblestone streets with vibrant colonial architecture bathed in golden afternoon light',
    'Islamabad Hills terraced gardens with panoramic city views during bright morning hours',
    'Karachi seafront promenade with pristine coastline during magnificent golden hour',
    'Peshawar traditional bazaar with colorful storefronts and authentic street energy in natural daylight',
    'Multan historic city streets with warm-toned ancient buildings gleaming in sunlight',
    'Faisalabad modern commercial district with clean contemporary architecture in bright daylight',
    'Hyderabad old city quarters with character-filled streets and traditional beauty in natural light',
    'Rawalpindi busy market streets with energetic atmosphere and brilliant sunshine',
    
    // Natural landscapes
    'Hunza Valley spectacular spring bloom with apple orchards bursting with white blossoms under clear blue skies',
    'Skardu Upper Kachura Lake crystal-clear alpine waters reflecting snow-capped mountains in brilliant daylight',
    'Swat Valley lush verdant landscapes with emerald river flowing through scenic wilderness under bright sky',
    'Fairy Meadows pristine alpine meadow bursting with vibrant wildflowers under clear mountain sunshine',
    'Neelum Valley thundering cascading waterfalls surrounded by dense verdant forest in fresh morning light',
    'Cholistan Desert golden sand dunes gleaming under warm natural sunlight with clear brilliant sky',
    'Makran Coast pristine unspoiled beaches with dramatic rock formations under bright coastal light',
    'Salt Range dramatic terraced geological formations glowing warmly in afternoon golden hour',
    'Northern agricultural fields verdant and lush in spring season with bright natural illumination',
    'Siri Paye hill station panoramic viewpoint overlooking misty valleys in morning golden light',
    
    // Architectural landmarks
    'Badshahi Mosque grand ceremonial courtyard with magnificent Mughal architecture bathed in warm afternoon light',
    'Faisal Mosque serene modern design reflecting peacefully in surrounding pools during golden hour',
    'Wazir Khan Mosque intricate geometric tilework and architecture glowing in natural daylight',
    'Lahore Fort historic ramparts and courtyards with warm weathered stone and excellent natural light',
    'Mohatta Palace elegant heritage building with stunning architecture in bright clear daylight',
    
    // Lifestyle settings
    'Traditional chai café with warm ambient natural light streaming through windows',
    'Rooftop terrace overlooking vibrant city skyline during golden hour with warm evening light',
    'Historic library surrounded by books with natural window light illuminating the space',
    'Modern contemporary café district with bright minimalist design and excellent daylight',
    'Traditional South Asian marketplace with vivid colors and bright natural illumination',
    'University campus courtyard in spring with students and greenery in fresh daylight',
    'Professional office space with modern design and bright natural window light',
    'Elegant restaurant with warm lighting and inviting ambiance during daytime service',
    
    // Travel settings
    'International airport terminal with modern architecture and bright professional lighting',
    'Historic railway station with character and architectural charm in natural daylight',
    'Mountain highway scenic overlook with breathtaking vistas and brilliant natural light',
    'Desert highway with straight road vanishing into horizon under brilliant sunny skies',
    'Pristine beach resort with white sand under clear bright tropical sunlight',
    'Luxury mountain resort terrace with panoramic views and excellent mountain light',
  ],
  poses: [
    'walking naturally and confidently through the scene with purposeful stride',
    'sitting comfortably with excellent posture and engaged presence',
    'drinking chai with evident enjoyment and relaxed composure',
    'reading with focused concentration and intellectual engagement',
    'gazing contemplatively toward distant mountains with peaceful expression',
    'driving with confident skilled control and natural road presence',
    'riding horse through landscape with excellent horsemanship and balanced seat',
    'working intently on laptop with professional focus and engaged posture',
    'conversing warmly with locals with genuine animated discussion',
    'photographing surroundings with creative eye and active engagement',
    'hiking uphill with steady determination and natural mountain movement',
    'smiling naturally and genuinely at camera with warm engaging expression',
    'crossing busy street with purposeful confident stride',
    'shopping at vibrant market with engaged interest and active participation',
    'looking directly at camera with warm inviting expression and eye contact',
    'shown in profile with contemplative peaceful gaze toward scenery',
    'looking away thoughtfully toward distant vista with introspective mood',
    'leaning casually against architectural element with natural ease',
    'resting peacefully near water with serene contemplative expression',
    'enjoying boat ride with genuine smile and relaxed enjoyment',
    'dining at restaurant with sophisticated composure and elegant manner',
    'standing with confident natural posture and magnetic presence',
    'gesturing expressively during animated conversation with natural movements',
    'concentrating on craftwork with skilled hands and focused expertise',
    'stretching peacefully in morning light with refreshed energy',
    'meditating calmly with peaceful serene expression near natural setting',
    'walking through golden field with movement and natural grace',
    'looking down thoughtfully with contemplative introspective mood',
  ],
  cameras: [
    'Sony A7R V with exceptional 61MP full-frame sensor delivering ultimate clarity',
    'Canon EOS R5 professional mirrorless system with advanced metering',
    'Nikon Z9 flagship camera with cutting-edge autofocus and precision',
    'Sony A1 high-performance hybrid camera with incredible speed and detail',
    'Canon EOS R3 with advanced subject tracking and professional features',
    'Fujifilm GFX100 II medium format precision capturing extreme detail',
    'Hasselblad X2D medium format mastery with legendary image quality',
    'Nikon Z8 premium full-frame system with exceptional versatility',
    'Leica M11 rangefinder precision with legendary color science',
    'Phase One XF IQ4 150MP professional digital back with unmatched resolution',
  ],
  lenses: [
    '24mm ultra-wide prime capturing expansive landscapes with perfect clarity',
    '35mm f/1.4 professional standard prime with beautiful natural rendering',
    '50mm f/1.2 portrait-perfect standard lens with buttery bokeh',
    '85mm f/1.4 professional portrait lens with classic compression and bokeh',
    '135mm f/2.0 telephoto prime for intimate atmospheric details',
    '70-200mm f/2.8 telephoto zoom with incredible sharpness and flexibility',
    '28-70mm versatile standard zoom covering essential range with consistency',
    '24-70mm f/2.8 professional zoom balanced for all situations',
    '70-135mm telephoto zoom for selective atmospheric compression',
    '35-85mm portrait zoom covering classic portrait range',
  ],
  lighting: [
    'brilliant bright daylight with crisp sharp shadows and vibrant illumination',
    'warm golden hour light during late afternoon with magical glow',
    'soft luminous morning sunlight with gentle flattering quality',
    'fresh midday sunlight with clear true-to-life color rendition',
    'warm afternoon light with rich color saturation and excellent modeling',
    'professional commercial daylight with perfect balance and clarity',
    'bright clear sky sunlight with excellent dynamic range and detail',
    'warm side-lighting revealing texture and dimension with sculptural quality',
    'front-lit bright daylight with clean clear illumination throughout',
    'backlighting with rim light creating luminous glow while front remains bright',
    'diffused sunlight through thin clouds creating soft even illumination',
    'golden sunlight streaming through windows creating dramatic warm light',
  ],
  weather: [
    'perfectly clear bright blue sky with brilliant sunlight and zero clouds',
    'partly cloudy with white fluffy clouds and bright sunshine',
    'fresh spring morning with clear skies and vibrant atmosphere',
    'warm summer day with clear brilliant daylight and perfect conditions',
    'golden autumn afternoon with crisp air and warm illumination',
    'dramatic evening sky with rich colors and dramatic cloud formations',
    'clear dawn breaking with fresh morning light and crisp air',
    'pristine mountain air with crystal-clear visibility for miles',
    'coastal fresh breeze with bright sunlight and clear horizons',
    'spring bloom conditions with clear skies and vibrant natural colors',
  ],
  compositions: [
    'rule of thirds composition with dynamic subject placement and excellent framing',
    'centered symmetrical framing emphasizing subject and architectural elements',
    'leading lines drawing viewer naturally into the depth of the scene',
    'layered depth composition with compelling foreground, middle-ground, and background',
    'negative space emphasizing subject isolation and minimalist elegance',
    'diagonal dynamic composition creating visual tension and energy',
    'frame-within-frame technique adding layers and compositional sophistication',
    'golden spiral composition creating natural visual flow and balance',
    'symmetrical environmental framing with balanced left-right elements',
    'candid moment composition with natural positioning and authentic positioning',
    'environmental portraiture showing subject in meaningful context and place',
    'intimate close-framing emphasizing facial detail and emotional connection',
    'wide environmental establishing shot showing subject within vast landscape',
    'three-point compositional balance with dynamic visual interest throughout',
  ],
  moods: [
    'serene peaceful contemplation with tranquil reflective atmosphere',
    'vibrant energetic vitality with dynamic engaging presence',
    'confident assured presence with magnetic natural authority',
    'warm welcoming approachability with inviting genuine connection',
    'thoughtful introspective character with intellectual depth',
    'joyful celebratory spirit with authentic genuine happiness',
    'majestic awe-inspiring grandeur with epic commanding presence',
    'authentic genuine emotion with honest sincere expression',
    'cinematic professionally composed with polished sophisticated aesthetic',
    'intimate personal connection with vulnerable honest emotion',
    'dynamic engaging energy with active natural movement',
    'aspirational inspiring presence with uplifting positive qualities',
    'mysterious contemplative intrigue with thoughtful depth',
    'peaceful meditative serenity with calm centered presence',
  ],
  colorGrading: [
    'warm golden tones with lifted blacks and vibrant saturation for brightness',
    'natural color science with enhanced clarity and true-to-life rendering',
    'warm daylight palette with rich highlights and excellent shadow detail',
    'vibrant natural colors with crisp details and punchy contrast',
    'golden warmth with perfectly balanced contrast and dimension',
    'professional daylight grading with depth and polished finish',
    'sunny palette with true-to-life color accuracy and excellent separation',
    'bright fresh color grading with HDR feel and dynamic range',
    'warm afternoon tones with rich shadow detail and glowing highlights',
    'cinematic daylight color science with sophisticated warm rendering',
    'saturated vibrant earth tones with excellent color separation',
    'cool bright daylight with perfect white balance and clarity',
    'golden hour warm rendering with romantic enhanced saturation',
    'clear blue sky palette with excellent environmental color harmony',
  ],
  qualityTerms: [
    'ultra photorealistic rendering with artifact-free precision and flawless detail',
    'commercial photography grade quality suitable for premium publications',
    'DSLR professional standard capturing with exceptional technical excellence',
    'National Geographic caliber documentation with editorial excellence',
    'magazine cover quality with premium finish and polished perfection',
    'HDR tone mapping with natural appearance and excellent dynamic range',
    '8K resolution with intricate detail preservation and exceptional clarity',
    'professional retouching with natural aesthetics and invisible technique',
    'museum-quality print ready precision with archival color accuracy',
    'editorial photography excellence with sophisticated composition',
    'cinematography grade quality with professional lighting and color',
    'luxury premium photography with refined sophisticated rendering',
    'technical perfection with zero blemishes and flawless execution',
    'award-winning photography quality with exceptional artistic merit',
  ],
  facialQuality: [
    'photorealistic facial details with anatomically accurate face structure throughout',
    'ultra-sharp eyes with realistic eyelash definition and pupil clarity',
    'realistic skin texture revealing natural pores and authentic skin character',
    'natural human proportions throughout all facial features',
    'artifact-free facial rendering with perfect symmetry and no defects',
    'defined jawline with natural chin structure and excellent bone definition',
    'authentic eyebrows with realistic density and natural arch',
    'natural lip color with subtle definition and realistic texture',
    'realistic ear placement and proportion with anatomically correct structure',
    'expressive eyes conveying genuine authentic emotion and connection',
    'perfect facial geometry with mathematically proportioned features',
    'zero AI artifacts with flawless natural rendering throughout',
    'skin with visible natural texture and authentic pore structure',
    'facial expression showing genuine emotion with natural animation',
  ],
  photographyStyles: [
    'documentary lifestyle photography capturing authentic moments with emotional truth',
    'cultural portrait style revealing character and authentic personality',
    'editorial travel photography with storytelling depth and compelling narrative',
    'professional environmental portraiture showing subject in meaningful context',
    'authentic South Asian cultural photography with respectful representation',
    'commercial photography with premium polish and professional execution',
    'lifestyle editorial with narrative richness and compelling story',
    'professional commercial quality suitable for advertising and marketing',
    'travel documentary aesthetic with authentic exploratory visual language',
    'cultural heritage photography style honoring traditions and authenticity',
    'professional portraiture with technical excellence and artistic vision',
    'luxury lifestyle photography with refined sophisticated aesthetic',
    'photojournalism style with authentic unposed moment capture',
    'fashion editorial photography with strong artistic direction',
  ],
}

// Track recently used combinations to ensure diversity and prevent repetition
let lastUsedCombinations: string[] = []
const diversityTracker = {
  locations: new Set<string>(),
  poses: new Set<string>(),
  cameras: new Set<string>(),
  moods: new Set<string>(),
  clothingStyles: new Set<string>(),
}

function trackCombination(combo: string): void {
  lastUsedCombinations.push(combo)
  if (lastUsedCombinations.length > 50) {
    lastUsedCombinations = lastUsedCombinations.slice(-50)
  }
}

function getCombinationKey(subject: string, location: string, pose: string, lighting: string): string {
  return `${subject}|${location}|${pose}|${lighting}`
}

function isCombinationRepeated(key: string): boolean {
  return lastUsedCombinations.includes(key)
}

function getRandomItemExcluding<T>(arr: T[], excluded: Set<T>): T {
  const available = arr.filter((item) => !excluded.has(item))
  if (available.length === 0) {
    excluded.clear() // Reset if all used
    return arr[Math.floor(Math.random() * arr.length)]
  }
  return available[Math.floor(Math.random() * available.length)]
}

export function generateOfflinePrompt(category: PromptCategory): string {
  const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

  let subject: string
  let location: string
  let pose: string
  let lighting: string
  let attempts = 0
  const maxAttempts = 10

  // Retry to find unique combination
  do {
    subject = getRandomItem(offlineData.subjects)
    location = getRandomItem(offlineData.environments)
    pose = getRandomItem(offlineData.poses)
    lighting = getRandomItem(offlineData.lighting)
    attempts++
  } while (isCombinationRepeated(getCombinationKey(subject, location, pose, lighting)) && attempts < maxAttempts)

  const weather = getRandomItem(offlineData.weather)
  const camera = getRandomItemExcluding(offlineData.cameras, diversityTracker.cameras)
  const lens = getRandomItem(offlineData.lenses)
  const composition = getRandomItem(offlineData.compositions)
  const mood = getRandomItemExcluding(offlineData.moods, diversityTracker.moods)
  const colorGrading = getRandomItem(offlineData.colorGrading)
  const style = getRandomItem(offlineData.photographyStyles)
  const qualityTerm = getRandomItem(offlineData.qualityTerms)
  const facialQuality = getRandomItem(offlineData.facialQuality)

  // Track for diversity
  const comboKey = getCombinationKey(subject, location, pose, lighting)
  trackCombination(comboKey)
  diversityTracker.locations.add(location)
  diversityTracker.poses.add(pose)
  diversityTracker.cameras.add(camera)
  diversityTracker.moods.add(mood)

  const categoryModifiers: Record<PromptCategory, string> = {
    mixed_trending:
      'Trending viral aesthetic across Instagram, TikTok, and Pinterest with contemporary social media appeal and shareable quality.',
    cinematic_photography:
      'Cinematic film production quality with professional cinematography, Hollywood-standard three-point lighting, and sophisticated composition.',
    ultra_realistic_portraits:
      'Hyper-detailed portrait showcasing extreme facial realism. Skin texture, eye definition, and emotional expression are paramount and crystal clear.',
    nature_wildlife:
      'Nature documentary quality capturing authentic environmental beauty with natural lighting, wildlife authenticity, and pristine conditions.',
    travel_tourism:
      'Travel destination photography with postcard-perfect appeal, cultural authenticity, and aspirational destination quality.',
    fantasy_worlds:
      'Blending realistic photographic base with subtle magical elements. Maintains photorealistic grounding while adding otherworldly wonder.',
    architecture:
      'Architectural photography emphasizing structural beauty, material texture, lighting that highlights form, and spatial composition excellence.',
    luxury_lifestyle:
      'Luxury premium aesthetic with high-end styling, opulent environments, professional presentation, and aspirational sophistication.',
    historical_scenes:
      'Period-accurate historical scene with authentic cultural context, era-appropriate details, and historically accurate lighting conditions.',
    islamic_art:
      'Islamic cultural heritage featuring geometric patterns, intricate calligraphy, architectural brilliance, and traditional artistry with authentic styling.',
    futuristic_cities:
      'Futuristic aesthetic while maintaining photorealistic base. Blend of advanced technology with natural lighting and believable dystopian/utopian elements.',
    vehicles:
      'Automotive showcase with mechanical precision, professional photography techniques, dynamic positioning, and polished presentation.',
    food_photography:
      'Culinary artistry with professional food styling, appetizing presentation, steam details, garnishing mastery, and gastronomic appeal.',
    fashion_editorial:
      'High fashion editorial with runway-ready styling, premium designer aesthetic, model positioning excellence, and magazine quality.',
    space_exploration:
      'Cosmic wonder photography with astronomical accuracy, realistic celestial rendering, cosmic lighting, and the vast beauty of space.',
    ai_generation:
      'Digital art masterpiece with surreal elements and artistic vision while maintaining photorealistic rendering precision and technical excellence.',
  }

  const categoryModifier = categoryModifiers[category]

  // Construct comprehensive prompt with natural narrative flow
  const prompt = `${subject}, ${pose.toLowerCase()} in ${location}. 

Conditions: ${weather.toLowerCase()}. Illumination: ${lighting.toLowerCase()}.

Facial Quality: ${facialQuality}. 

Composition: ${composition.toLowerCase()}

Camera & Lens: Shot with ${camera} and ${lens.toLowerCase()}. Photography style: ${style.toLowerCase()}.

Mood & Atmosphere: ${mood.toLowerCase()}. 

Color Palette: ${colorGrading.toLowerCase()}

Aesthetic Direction: ${categoryModifier}

Photography Quality: ${qualityTerm}. 

Critical Requirements: Natural balanced exposure with vibrant colors throughout. Absolutely no dark, moody, underexposed, blue-toned, or grey-heavy tones. Professional clarity and definition throughout. High dynamic range with rich detail preservation. Ready for premium commercial publication and premium brand representation.`

  return prompt
}

/**
 * Generate multiple offline prompts with diversity tracking and anti-repetition
 */
export function generateOfflinePrompts(
  count: number,
  category: PromptCategory
): string[] {
  const prompts: string[] = []
  
  // Reset diversity trackers for fresh generation
  diversityTracker.locations.clear()
  diversityTracker.poses.clear()
  diversityTracker.cameras.clear()
  diversityTracker.moods.clear()

  for (let i = 0; i < count; i++) {
    prompts.push(generateOfflinePrompt(category))
  }

  return prompts
}
