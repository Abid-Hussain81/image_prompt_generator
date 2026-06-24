/**
 * Formatting utilities
 */

/**
 * Format category name for display
 */
export function formatCategoryName(category: string): string {
  return category
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Generate CSV from prompts
 */
export function generatePromptCSV(prompts: string[], category: string): string {
  const headers = ['Category', 'Prompt', 'Generated At']
  const timestamp = new Date().toISOString()

  const rows = [headers, ...prompts.map((prompt) => [category, prompt, timestamp])]

  return rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
}

/**
 * Generate JSON export of prompts
 */
export function generatePromptJSON(prompts: string[], category: string): string {
  return JSON.stringify(
    {
      category,
      generatedAt: new Date().toISOString(),
      count: prompts.length,
      prompts,
    },
    null,
    2
  )
}

/**
 * Generate plain text export of prompts
 */
export function generatePromptText(prompts: string[], category: string): string {
  const timestamp = new Date().toISOString()
  const header = `AI Prompt Forge - Generated Prompts
Category: ${formatCategoryName(category)}
Generated: ${timestamp}
Total: ${prompts.length} prompts

${'='.repeat(80)}

`

  const promptsText = prompts
    .map((prompt, index) => `PROMPT ${index + 1}:\n\n${prompt}\n\n${'─'.repeat(80)}\n`)
    .join('\n')

  return header + promptsText
}

/**
 * Download JSON file
 */
export function downloadJSON(data: string, filename: string): void {
  const blob = new Blob([data], { type: 'application/json;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Download text file
 */
export function downloadText(data: string, filename: string): void {
  const blob = new Blob([data], { type: 'text/plain;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
