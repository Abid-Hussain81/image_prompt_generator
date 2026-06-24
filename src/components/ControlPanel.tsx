/**
 * ControlPanel Component
 * Settings and generation controls
 */

'use client'

import { motion } from 'framer-motion'
import { Wand2, Settings } from 'lucide-react'
import type { PromptCategory, CreativityLevel, RealismLevel, DetailLevel } from '@/types'

interface ControlPanelProps {
  onGenerate: () => void
  isLoading: boolean
  settings: {
    count: number
    category: PromptCategory
    creativity: CreativityLevel
    realism: RealismLevel
    detailLevel: DetailLevel
  }
  onSettingsChange: (key: string, value: any) => void
}

const CATEGORIES: { value: PromptCategory; label: string }[] = [
  { value: 'mixed_trending', label: 'Mixed Trending' },
  { value: 'cinematic_photography', label: 'Cinematic Photography' },
  { value: 'ultra_realistic_portraits', label: 'Ultra Realistic Portraits' },
  { value: 'nature_wildlife', label: 'Nature & Wildlife' },
  { value: 'travel_tourism', label: 'Travel & Tourism' },
  { value: 'fantasy_worlds', label: 'Fantasy Worlds' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'luxury_lifestyle', label: 'Luxury Lifestyle' },
  { value: 'historical_scenes', label: 'Historical Scenes' },
  { value: 'islamic_art', label: 'Islamic Art' },
  { value: 'futuristic_cities', label: 'Futuristic Cities' },
  { value: 'vehicles', label: 'Vehicles' },
  { value: 'food_photography', label: 'Food Photography' },
  { value: 'fashion_editorial', label: 'Fashion Editorial' },
  { value: 'space_exploration', label: 'Space Exploration' },
  { value: 'ai_generation', label: 'AI Generation' },
]

export function ControlPanel({
  onGenerate,
  isLoading,
  settings,
  onSettingsChange,
}: ControlPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 rounded-lg bg-dark-800/50 border border-glass-light backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Settings className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-100">Generation Settings</h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Category Selection */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
            Category
          </label>
          <select
            value={settings.category}
            onChange={(e) => onSettingsChange('category', e.target.value)}
            disabled={isLoading}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg bg-dark-700/50 border border-glass-light text-gray-100 text-sm focus:border-amber-400/50 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Prompt Count */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Prompts
            </label>
            <select
              value={settings.count}
              onChange={(e) => onSettingsChange('count', parseInt(e.target.value))}
              disabled={isLoading}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg bg-dark-700/50 border border-glass-light text-gray-100 text-xs sm:text-sm focus:border-amber-400/50 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            >
              {[5, 10, 15].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>

          {/* Creativity Level */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Creativity
            </label>
            <select
              value={settings.creativity}
              onChange={(e) => onSettingsChange('creativity', e.target.value)}
              disabled={isLoading}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg bg-dark-700/50 border border-glass-light text-gray-100 text-xs sm:text-sm focus:border-amber-400/50 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            >
              <option value="conservative">Conservative</option>
              <option value="balanced">Balanced</option>
              <option value="experimental">Experimental</option>
            </select>
          </div>

          {/* Realism Level */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Realism
            </label>
            <select
              value={settings.realism}
              onChange={(e) => onSettingsChange('realism', e.target.value)}
              disabled={isLoading}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg bg-dark-700/50 border border-glass-light text-gray-100 text-xs sm:text-sm focus:border-amber-400/50 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            >
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="ultra">Ultra</option>
            </select>
          </div>

          {/* Detail Level */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
              Detail
            </label>
            <select
              value={settings.detailLevel}
              onChange={(e) => onSettingsChange('detailLevel', e.target.value)}
              disabled={isLoading}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg bg-dark-700/50 border border-glass-light text-gray-100 text-xs sm:text-sm focus:border-amber-400/50 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            >
              <option value="standard">Standard</option>
              <option value="detailed">Detailed</option>
              <option value="masterpiece">Masterpiece</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full mt-4 sm:mt-6 px-6 py-3 sm:py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-dark-900 font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-amber-500/50 touch-manipulation"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-5 h-5"
              >
                <Wand2 className="w-5 h-5" />
              </motion.div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Generate</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}
