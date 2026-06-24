/**
 * PromptsGrid Component
 * Displays grid of prompt cards
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PromptCard } from './PromptCard'
import { usePromptStore } from '@/store/promptStore'
import type { PromptCategory } from '@/types'

interface PromptsGridProps {
  prompts: string[]
  category: PromptCategory
  onRegenerate: (index: number) => void
  isLoading: boolean
}

export function PromptsGrid({
  prompts,
  category,
  onRegenerate,
  isLoading,
}: PromptsGridProps) {
  const { favorites, addFavorite, removeFavorite } = usePromptStore()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  if (prompts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="col-span-full flex items-center justify-center py-12 sm:py-16 px-4"
      >
        <div className="text-center">
          <p className="text-gray-400 text-base sm:text-lg mb-2">No prompts generated yet</p>
          <p className="text-gray-500 text-xs sm:text-sm">
            Adjust your settings and click "Generate Prompts" to get started
          </p>
        </div>
      </motion.div>
    )
  }

  const toggleFavorite = (prompt: string) => {
    const isFavorited = favorites.some((fav) => fav.prompt === prompt)
    if (isFavorited) {
      const favToRemove = favorites.find((fav) => fav.prompt === prompt)
      if (favToRemove) {
        removeFavorite(favToRemove.id)
      }
    } else {
      addFavorite(prompt, category)
    }
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
    >
      <AnimatePresence mode="popLayout">
        {prompts.map((prompt, index) => {
          const isFavorited = favorites.some((fav) => fav.prompt === prompt)

          return (
            <motion.div
              key={`${prompt}-${index}`}
              layout
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <PromptCard
                prompt={prompt}
                index={index}
                onFavorite={() => toggleFavorite(prompt)}
                onRegenerate={() => onRegenerate(index)}
                isFavorite={isFavorited}
                isLoading={isLoading}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </motion.div>
  )
}
