/**
 * Simple in-memory cache for trending prompts
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
}

class Cache {
  private store = new Map<string, CacheEntry<any>>()

  set<T>(key: string, data: T, ttlSeconds: number = 3600): void {
    const timestamp = Date.now() + ttlSeconds * 1000
    this.store.set(key, { data, timestamp })
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key)
    if (!entry) return null

    if (Date.now() > entry.timestamp) {
      this.store.delete(key)
      return null
    }

    return entry.data as T
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  clear(): void {
    this.store.clear()
  }

  delete(key: string): void {
    this.store.delete(key)
  }
}

export const cache = new Cache()

export const CACHE_KEYS = {
  TRENDING_PROMPTS: 'trending_prompts',
}

export const CACHE_TTL = {
  TRENDING_PROMPTS: 24 * 60 * 60, // 24 hours in seconds
}
