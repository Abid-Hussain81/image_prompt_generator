/**
 * FavoritesPanel Component
 * Display and manage favorite prompts
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, Download } from 'lucide-react'
import { usePromptStore } from '@/store/promptStore'
import { copyToClipboard, formatDate } from '@/utils/formatting'
import { formatCategoryName } from '@/utils/formatting'

export function FavoritesPanel() {
  const { favorites, removeFavorite } = usePromptStore()
  const [copied, setCopied] = useState<string | null>(null)

  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="p-6 rounded-lg bg-dark-800/50 border border-glass-light text-center"
      >
        <Heart className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-50" />
        <p className="text-gray-400">No favorites yet</p>
        <p className="text-sm text-gray-500">Save prompts to see them here</p>
      </motion.div>
    )
  }

  const handleCopy = async (prompt: string) => {
    const success = await copyToClipboard(prompt)
    if (success) {
      setCopied(prompt)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  const handleExport = () => {
    const jsonData = JSON.stringify(
      {
        totalCount: favorites.length,
        exportedAt: new Date().toISOString(),
        favorites: favorites.map((fav) => ({
          prompt: fav.prompt,
          category: fav.category,
          savedAt: fav.savedAt,
        })),
      },
      null,
      2
    )

    const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', `favorites-${new Date().toISOString().split('T')[0]}.json`)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg bg-dark-800/50 border border-glass-light backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-semibold text-gray-100">
            Saved Favorites ({favorites.length})
          </h3>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExport}
          className="p-2 rounded-lg bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-300 transition-all"
          title="Export all favorites"
        >
          <Download className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {favorites.map((favorite) => (
            <motion.div
              key={favorite.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="p-3 rounded-lg bg-dark-700/50 hover:bg-dark-700 border border-glass-light group transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-2 group-hover:line-clamp-none">
                    {favorite.prompt}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-1 rounded bg-dark-800 text-gray-400">
                      {formatCategoryName(favorite.category)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(favorite.savedAt)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopy(favorite.prompt)}
                    className="px-2 py-1 rounded text-xs font-medium bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 transition-all"
                  >
                    {copied === favorite.prompt ? 'Copied!' : 'Copy'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeFavorite(favorite.id)}
                    className="px-2 py-1 rounded text-xs font-medium bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
