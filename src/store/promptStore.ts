/**
 * Zustand store for managing prompt state
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Favorite, Statistics, PromptSettings, PromptCategory } from '@/types'

interface PromptState {
  // Current prompts
  currentPrompts: string[]
  setCurrentPrompts: (prompts: string[]) => void

  // Trending prompts
  trendingPrompts: string[]
  setTrendingPrompts: (prompts: string[]) => void
  trendingLoadedAt: string | null
  setTrendingLoadedAt: (time: string | null) => void

  // Settings
  settings: PromptSettings
  updateSettings: (settings: Partial<PromptSettings>) => void

  // Favorites
  favorites: Favorite[]
  addFavorite: (prompt: string, category: PromptCategory) => void
  removeFavorite: (id: string) => void
  getFavorites: () => Favorite[]

  // Statistics
  statistics: Statistics
  incrementPromptsGenerated: (count: number) => void
  incrementFavoritesSaved: (count: number) => void
  setCurrentCategory: (category: PromptCategory) => void

  // UI State
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
  isOffline: boolean
  setIsOffline: (offline: boolean) => void
}

const defaultSettings: PromptSettings = {
  count: 5,
  category: 'mixed_trending',
  creativity: 'balanced',
  realism: 'high',
  detailLevel: 'detailed',
}

const defaultStatistics: Statistics = {
  promptsGenerated: 0,
  favoritesSaved: 0,
  currentCategory: 'mixed_trending',
}

export const usePromptStore = create<PromptState>()(
  persist(
    (set, get) => ({
      // Prompts
      currentPrompts: [],
      setCurrentPrompts: (prompts) => set({ currentPrompts: prompts }),

      trendingPrompts: [],
      setTrendingPrompts: (prompts) => set({ trendingPrompts: prompts }),
      trendingLoadedAt: null,
      setTrendingLoadedAt: (time) => set({ trendingLoadedAt: time }),

      // Settings
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      // Favorites
      favorites: [],
      addFavorite: (prompt, category) =>
        set((state) => ({
          favorites: [
            ...state.favorites,
            {
              id: `fav_${Date.now()}_${Math.random()}`,
              prompt,
              category,
              savedAt: new Date().toISOString(),
            },
          ],
          statistics: {
            ...state.statistics,
            favoritesSaved: state.statistics.favoritesSaved + 1,
          },
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
          statistics: {
            ...state.statistics,
            favoritesSaved: Math.max(0, state.statistics.favoritesSaved - 1),
          },
        })),

      getFavorites: () => get().favorites,

      // Statistics
      statistics: defaultStatistics,
      incrementPromptsGenerated: (count) =>
        set((state) => ({
          statistics: {
            ...state.statistics,
            promptsGenerated: state.statistics.promptsGenerated + count,
          },
        })),

      incrementFavoritesSaved: (count) =>
        set((state) => ({
          statistics: {
            ...state.statistics,
            favoritesSaved: state.statistics.favoritesSaved + count,
          },
        })),

      setCurrentCategory: (category) =>
        set((state) => ({
          statistics: {
            ...state.statistics,
            currentCategory: category,
          },
        })),

      // UI State
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),

      error: null,
      setError: (error) => set({ error }),

      isOffline: false,
      setIsOffline: (offline) => set({ isOffline: offline }),
    }),
    {
      name: 'prompt-store',
      partialize: (state) => ({
        favorites: state.favorites,
        statistics: state.statistics,
        settings: state.settings,
      }),
    }
  )
)
