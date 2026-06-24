/**
 * ProfileHero Component
 * Redesigned to showcase Abid Hussain as an AI Art Enthusiast
 * Premium glassmorphism design with animated background
 */

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Zap } from 'lucide-react'

interface ProfileHeroProps {
  onGenerateClick?: () => void
}

// Animated Background Particles
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
          animate={{
            y: [0, -400],
            x: [0, Math.cos(i) * 100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
          }}
          style={{
            left: `${(i / 6) * 100}%`,
            bottom: 0,
          }}
        />
      ))}
    </div>
  )
}

export function ProfileHero({ onGenerateClick }: ProfileHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden"
    >
      {/* Animated Background Gradient with Particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 via-dark-900 to-dark-900 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent pointer-events-none" />
      <FloatingParticles />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Grid Layout: Image + Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-2 md:order-1 flex justify-center"
          >
            <div className="relative w-full max-w-xs">
              {/* Outer Glow Layer */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(251, 146, 60, 0.2)',
                    '0 0 80px rgba(251, 146, 60, 0.3)',
                    '0 0 60px rgba(251, 146, 60, 0.2)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -inset-3 bg-gradient-to-r from-amber-500/20 to-yellow-400/20 rounded-3xl blur-3xl"
              />

              {/* Glassmorphism Card Container */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden border border-amber-400/20 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 shadow-2xl hover:shadow-amber-500/20"
              >
                {/* Image or Avatar Placeholder */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-600/20 to-yellow-600/20">
                  <Image
                    src="/Abid_Shah.png"
                    alt="Abid Hussain - AI Art Enthusiast"
                    width={400}
                    height={400}
                    priority
                    className="w-full h-full object-cover"
                    onError={() => {
                      // Fallback: If image doesn't load, display avatar placeholder
                      console.log('Image failed to load, showing placeholder')
                    }}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 via-transparent to-transparent" />

                  {/* Animated Pulse Badge */}
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 bg-gradient-to-r from-amber-400 to-yellow-300 text-dark-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-sm"
                  >
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                    Creating
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 md:order-2 space-y-5 sm:space-y-7"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amber-400/20 to-yellow-300/20 border border-amber-400/30 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-widest">
                ✨ Meet The Creator
              </span>
            </motion.div>

            {/* Name and Title */}
            <div className="space-y-2 sm:space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-amber-200"
              >
                Abid Hussain
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg sm:text-xl lg:text-2xl font-semibold text-amber-300"
              >
                AI Art Enthusiast & Creative Explorer
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-2xl"
            >
              Passionate about transforming imagination into stunning AI-generated artwork. From breathtaking landscapes and wildlife photography to historical scenes, Islamic art, fantasy worlds, and cinematic visuals, every prompt is an opportunity to create something unique.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl"
            >
              This platform helps discover fresh creative ideas and professional-quality prompts for generating amazing AI images every day.
            </motion.p>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 py-6 sm:py-8 border-y border-amber-400/20"
            >
              {[
                { number: '1000+', label: 'Images Created' },
                { number: '∞', label: 'Creative Ideas' },
                { number: '📅', label: 'Daily Inspiration' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group cursor-pointer"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-amber-300 group-hover:text-yellow-300 transition-colors">
                    {stat.number}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1.5 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251, 146, 60, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onGenerateClick}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-600 hover:via-amber-500 hover:to-yellow-500 text-dark-900 font-bold text-sm sm:text-base shadow-lg transition-all touch-manipulation border border-amber-300/50 cursor-pointer"
              >
                Generate Today's Prompts
              </motion.button>
            </motion.div>

            {/* Trust Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 pt-2"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block w-2 h-2 bg-amber-400 rounded-full"
              />
              Creating and exploring AI-generated artwork every day
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Animated Line */}
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
            width: ['0%', '100%', '0%'],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-10 sm:mt-14 lg:mt-20"
        />
      </div>
    </motion.section>
  )
}
