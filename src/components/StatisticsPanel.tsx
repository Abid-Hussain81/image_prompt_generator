/**
 * StatisticsPanel Component
 * Display usage statistics
 */

'use client'

import { motion } from 'framer-motion'
import { BarChart3, Heart, Grid3x3 } from 'lucide-react'
import { usePromptStore } from '@/store/promptStore'
import { formatCategoryName } from '@/utils/formatting'

export function StatisticsPanel() {
  const { statistics } = usePromptStore()

  const stats = [
    {
      icon: Grid3x3,
      label: 'Prompts Generated',
      value: statistics.promptsGenerated,
      color: 'bg-blue-600/20 border-blue-500/30 text-blue-300',
    },
    {
      icon: Heart,
      label: 'Favorites Saved',
      value: statistics.favoritesSaved,
      color: 'bg-red-600/20 border-red-500/30 text-red-300',
    },
    {
      icon: BarChart3,
      label: 'Current Category',
      value: formatCategoryName(statistics.currentCategory),
      color: 'bg-amber-600/20 border-amber-500/30 text-amber-300',
      isText: true,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-lg border backdrop-blur-sm ${stat.color}`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-black/20">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium opacity-75">{stat.label}</p>
                <p className="text-lg font-bold">
                  {stat.isText ? stat.value : stat.value.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
