/**
 * Header Component
 * Main navigation and branding
 */

'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface HeaderProps {
  isOffline?: boolean
}

export function Header({ isOffline = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-dark-900/50 border-b border-glass-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-2xl"
          >
            <Sparkles className="w-8 h-8 text-amber-400" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              AI Prompt Forge
            </h1>
            <p className="text-xs text-gray-400">Professional Image Prompt Generator</p>
          </div>
        </motion.div>

        {/* Offline Badge */}
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-3 py-1.5 rounded-full bg-yellow-900/30 border border-yellow-600/50 flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-yellow-300">Offline Mode</span>
          </motion.div>
        )}
      </div>
    </header>
  )
}
