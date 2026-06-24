/**
 * ProfileHero Component
 * Beautiful mobile-optimized profile section with client image
 */

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function ProfileHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-600/10 via-dark-900 to-dark-900 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Mobile Layout: Image + Text Stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Image Section - Mobile First */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 md:order-1 flex justify-center"
          >
            <div className="relative w-full max-w-xs">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-300/20 rounded-2xl sm:rounded-3xl blur-2xl" />

              {/* Image Container */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-amber-400/30 shadow-2xl">
                <Image
                  src="/Abid_Shah.png"
                  alt="Abid Shah - AI Prompt Engineer"
                  width={400}
                  height={400}
                  priority
                  className="w-full h-auto aspect-square object-cover hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />

                {/* Status Badge */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-lg"
                >
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-300 rounded-full animate-pulse" />
                  Active
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Text Section - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2 space-y-4 sm:space-y-6"
          >
            {/* Greeting */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <p className="text-xs sm:text-sm font-semibold text-amber-300 uppercase tracking-wider">
                Meet The Creator
              </p>
            </div>

            {/* Name */}
            <div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-100 mb-2"
              >
                Abid Shah
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl text-amber-300 font-semibold"
              >
                AI Prompt Engineer
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-md"
            >
              Specialized in crafting professional image prompts optimized for AI image generation. 
              Transforming creative visions into perfectly engineered prompts for stunning visual results.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 py-4 sm:py-6"
            >
              {[
                { number: '500+', label: 'Prompts' },
                { number: '50+', label: 'Categories' },
                { number: '100%', label: 'Quality' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-amber-300">
                    {stat.number}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-2 sm:pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-dark-900 font-bold text-sm sm:text-base shadow-lg hover:shadow-amber-500/50 transition-all touch-manipulation"
              >
                Start Creating Prompts
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xs sm:text-sm text-gray-500 flex items-center gap-2"
            >
              <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              Trusted by creative professionals worldwide
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Accent */}
        <motion.div
          animate={{ width: ['0%', '100%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="h-0.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 mt-8 sm:mt-12"
        />
      </div>
    </motion.section>
  )
}
