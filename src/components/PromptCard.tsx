/**
 * PromptCard Component
 * Displays individual prompt with actions
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Heart, Zap } from 'lucide-react'
import { copyToClipboard } from '@/utils/formatting'

interface PromptCardProps {
  prompt: string
  index: number
  onFavorite: () => void
  onRegenerate: () => void
  isFavorite?: boolean
  isLoading?: boolean
}

export function PromptCard({
  prompt,
  index,
  onFavorite,
  onRegenerate,
  isFavorite = false,
  isLoading = false,
}: PromptCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(prompt)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-yellow-400/10 rounded-lg blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100 hidden sm:block" />

      <div className="relative h-full p-4 sm:p-6 rounded-xl sm:rounded-lg bg-dark-800/50 border border-glass-light backdrop-blur-sm flex flex-col">
        {/* Index Badge */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 flex items-center justify-center text-dark-900 font-bold text-sm flex-shrink-0">
          {index + 1}
        </div>

        {/* Prompt Text */}
        <p className="text-gray-200 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-grow pr-8 line-clamp-5 sm:line-clamp-4">
          {prompt}
        </p>

        {/* Word Count */}
        <p className="text-xs text-gray-500 mb-3 sm:mb-4">
          {prompt.split(/\s+/).length} words
        </p>

        {/* Action Buttons - Stack on mobile, row on desktop */}
        <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-3 sm:pt-4 border-t border-glass-light">
          {/* Copy Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:py-2 rounded-lg sm:rounded-md bg-blue-600/20 active:bg-blue-600/40 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            title="Copy prompt to clipboard"
          >
            <Copy className="w-4 h-4 flex-shrink-0" />
            <span className="hidden xs:inline">{copied ? 'Copied!' : 'Copy'}</span>
            <span className="xs:hidden">{copied ? '✓' : 'Copy'}</span>
          </motion.button>

          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onFavorite}
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:py-2 rounded-lg sm:rounded-md border text-xs sm:text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation ${
              isFavorite
                ? 'bg-red-600/30 border-red-500/50 text-red-300 active:bg-red-600/50'
                : 'bg-red-600/10 border-red-500/20 text-red-400/70 active:bg-red-600/30 active:border-red-500/50'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 flex-shrink-0 ${isFavorite ? 'fill-current' : ''}`} />
            <span className="hidden xs:inline">{isFavorite ? 'Saved' : 'Save'}</span>
            <span className="xs:hidden">{isFavorite ? '❤' : '♡'}</span>
          </motion.button>

          {/* Regenerate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRegenerate}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 sm:py-2 rounded-lg sm:rounded-md bg-purple-600/20 active:bg-purple-600/40 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            title="Generate a similar prompt"
          >
            <Zap className="w-4 h-4 flex-shrink-0" />
            <span className="hidden xs:inline">Similar</span>
            <span className="xs:hidden">⚡</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
