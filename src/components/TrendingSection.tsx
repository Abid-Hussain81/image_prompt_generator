/**
 * TrendingSection Component
 * Displays today's trending prompts
 */

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, RefreshCw } from 'lucide-react'
import { usePromptStore } from '@/store/promptStore'

interface TrendingSectionProps {
  isOffline?: boolean
}

export function TrendingSection({ isOffline = false }: TrendingSectionProps) {
  const { trendingPrompts, setTrendingPrompts, isLoading, setIsLoading } =
    usePromptStore()
  const [hasLoaded, setHasLoaded] = useState(false)

  const loadTrendingPrompts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/trending-prompts', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()

      if (data.success && data.prompts && data.prompts.length > 0) {
        setTrendingPrompts(data.prompts)
      }
    } catch (error) {
      console.error('Trending error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load trending on mount
  useEffect(() => {
    if (!hasLoaded) {
      loadTrendingPrompts()
      setHasLoaded(true)
    }
  }, [hasLoaded])

  if (trendingPrompts.length === 0) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-3 sm:space-y-4"
    >
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2 min-w-0">
          <TrendingUp className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <h2 className="text-base sm:text-xl font-semibold text-gray-100 truncate">
            Trending Prompts
          </h2>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={loadTrendingPrompts}
          disabled={isLoading}
          className="p-2 rounded-lg bg-dark-700/50 hover:bg-dark-700 border border-glass-light text-gray-300 hover:text-amber-300 transition-all disabled:opacity-50 flex-shrink-0 touch-manipulation"
          title="Refresh trending prompts"
        >
          <motion.div
            animate={{ rotate: isLoading ? 360 : 0 }}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
        </motion.button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {trendingPrompts.map((prompt, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="h-full"
          >
            <div className="p-2 sm:p-3 rounded-lg bg-dark-800/40 border border-glass-light backdrop-blur-sm h-full flex flex-col hover:border-glass-light/80 hover:bg-dark-800/60 transition-all">
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-grow mb-2 line-clamp-3 text-ellipsis">
                {prompt}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-2 py-1.5 sm:py-2 rounded text-xs font-medium bg-amber-600/20 hover:bg-amber-600/40 active:bg-amber-600/50 border border-amber-500/30 hover:border-amber-500/50 text-amber-300 hover:text-amber-200 transition-all touch-manipulation"
              >
                Use
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-gray-500 text-center px-1">
        Updates every 24 hours
      </p>
    </motion.section>
  )
}
