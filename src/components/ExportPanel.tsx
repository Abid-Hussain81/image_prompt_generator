/**
 * ExportPanel Component
 * Export and copy functionality
 */

'use client'

import { motion } from 'framer-motion'
import { Copy, Download, FileJson, FileText } from 'lucide-react'
import { usePromptStore } from '@/store/promptStore'
import {
  copyToClipboard,
  downloadJSON,
  downloadText,
  generatePromptJSON,
  generatePromptText,
} from '@/utils/formatting'

interface ExportPanelProps {
  prompts: string[]
  category: string
}

export function ExportPanel({ prompts, category }: ExportPanelProps) {
  if (prompts.length === 0) {
    return null
  }

  const { favorites } = usePromptStore()

  const handleCopyAll = async () => {
    const text = prompts.join('\n\n---\n\n')
    await copyToClipboard(text)
  }

  const handleDownloadJSON = () => {
    const jsonData = generatePromptJSON(prompts, category)
    downloadJSON(
      jsonData,
      `prompts-${category}-${new Date().toISOString().split('T')[0]}.json`
    )
  }

  const handleDownloadTXT = () => {
    const txtData = generatePromptText(prompts, category)
    downloadText(
      txtData,
      `prompts-${category}-${new Date().toISOString().split('T')[0]}.txt`
    )
  }

  const handleExportFavorites = () => {
    if (favorites.length === 0) return

    const favoritesText = `AI Prompt Forge - Saved Favorites
Exported: ${new Date().toISOString()}
Total Favorites: ${favorites.length}

${'='.repeat(80)}

${favorites
  .map(
    (fav, index) =>
      `FAVORITE ${index + 1} (${fav.category.replace(/_/g, ' ')}):\n\n${fav.prompt}\n\nSaved: ${fav.savedAt}\n\n${'─'.repeat(80)}\n`
  )
  .join('\n')}`

    downloadText(favoritesText, `favorites-${new Date().toISOString().split('T')[0]}.txt`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 rounded-lg bg-dark-800/50 border border-glass-light backdrop-blur-sm"
    >
      <h3 className="text-base sm:text-lg font-semibold text-gray-100 mb-3 sm:mb-4">
        Export Options
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {/* Copy All */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyAll}
          className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 active:bg-blue-600/40 border border-blue-500/30 hover:border-blue-500/50 text-blue-300 hover:text-blue-200 transition-all text-xs touch-manipulation"
        >
          <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium text-center leading-tight">Copy All</span>
        </motion.button>

        {/* Download TXT (Primary) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadTXT}
          className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg bg-green-600/20 hover:bg-green-600/30 active:bg-green-600/40 border border-green-500/30 hover:border-green-500/50 text-green-300 hover:text-green-200 transition-all text-xs touch-manipulation ring-2 ring-green-500/20"
          title="Download as .txt file"
        >
          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium text-center leading-tight">TXT</span>
        </motion.button>

        {/* Download JSON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadJSON}
          className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 active:bg-purple-600/40 border border-purple-500/30 hover:border-purple-500/50 text-purple-300 hover:text-purple-200 transition-all text-xs touch-manipulation"
          title="Download as .json file"
        >
          <FileJson className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium text-center leading-tight">JSON</span>
        </motion.button>

        {/* Export Favorites as TXT */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExportFavorites}
          disabled={favorites.length === 0}
          className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg bg-red-600/20 hover:bg-red-600/30 active:bg-red-600/40 border border-red-500/30 hover:border-red-500/50 text-red-300 hover:text-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs touch-manipulation"
          title="Export favorites as .txt"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium text-center leading-tight">
            Fav <span className="sm:hidden">({favorites.length})</span>
            <span className="hidden sm:inline">({favorites.length})</span>
          </span>
        </motion.button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4">
        💡 Click TXT to download as text file, or choose JSON for structured data
      </p>
    </motion.div>
  )
}
