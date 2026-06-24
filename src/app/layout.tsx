/**
 * Root Layout
 * Main app wrapper with providers and styling
 */

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Prompt Forge - Professional Image Prompt Generator',
  description:
    'Generate professional Gemini image prompts optimized for AI image generation. Expert-level prompts with cinematic, realistic, and trendy styles.',
  keywords: [
    'AI prompt generator',
    'Gemini prompts',
    'image generation',
    'AI art',
    'prompt engineering',
  ],
  authors: [{ name: 'AI Prompt Forge' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75" fill="url(%23grad)">✨</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#111827" />
      </head>
      <body className="bg-dark-900 text-gray-100 antialiased overflow-x-hidden">
        {/* Gradient Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-900 to-dark-800" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-amber-600/5 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
