/**
 * Home Page
 * Main application interface
 */

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { ProfileHero } from "@/components/ProfileHero";
import { ControlPanel } from "@/components/ControlPanel";
import { PromptsGrid } from "@/components/PromptsGrid";
import { TrendingSection } from "@/components/TrendingSection";
import { StatisticsPanel } from "@/components/StatisticsPanel";
import { ExportPanel } from "@/components/ExportPanel";
import { FavoritesPanel } from "@/components/FavoritesPanel";
import { usePromptStore } from "@/store/promptStore";
import type { PromptSettings } from "@/types";

export default function Home() {
  const {
    currentPrompts,
    setCurrentPrompts,
    settings,
    updateSettings,
    isLoading,
    setIsLoading,
    error,
    setError,
    isOffline,
    setIsOffline,
    incrementPromptsGenerated,
    setCurrentCategory,
  } = usePromptStore();

  const [mounted, setMounted] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState<number | null>(
    null,
  );

  // Hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const generatePrompts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch (parseError) {
        const text = await response.text();
        console.error("Generate prompts invalid JSON response:", text);
        throw new Error("Invalid JSON response from server");
      }

      if (data?.success) {
        setCurrentPrompts(data.prompts);
        incrementPromptsGenerated(data.prompts.length);
        setCurrentCategory(settings.category);
        setIsOffline(data.offline || false);
        setError(null);
      } else {
        setError(data?.error || "Failed to generate prompts");
      }
    } catch (err) {
      setError("Failed to connect. Check your internet connection.");
      console.error("Generate error:", err);
    } finally {
      setIsLoading(false);
      setRegeneratingIndex(null);
    }
  };

  const regenerateSimilar = async (index: number) => {
    setRegeneratingIndex(index);
    await generatePrompts();
  };

  const handleSettingsChange = (key: string, value: any) => {
    const updatedSettings: PromptSettings = {
      ...settings,
      [key]: value,
    };
    updateSettings(updatedSettings);
  };

  if (!mounted) {
    return (
      <>
        <Header isOffline={false} />
        <main className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12"
              >
                <div className="w-full h-full border-4 border-amber-500/20 border-t-amber-500 rounded-full" />
              </motion.div>
            </div>
            <p className="mt-4 text-gray-300">Loading...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header isOffline={isOffline} />

      <main className="relative z-10 min-h-screen">
        {/* Profile Hero Section */}
        <ProfileHero onGenerateClick={generatePrompts} />

        {/* Main Content Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 md:py-12"
        >
          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-red-900/20 border border-red-600/50 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-medium text-red-300 text-sm sm:text-base break-words">
                  {error}
                </p>
                <p className="text-xs sm:text-sm text-red-400/70">
                  {isOffline
                    ? "Using offline prompt generator"
                    : "Please try again"}
                </p>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Sidebar - Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1 space-y-4 sm:space-y-6"
            >
              <ControlPanel
                onGenerate={generatePrompts}
                isLoading={isLoading}
                settings={settings}
                onSettingsChange={handleSettingsChange}
              />

              <StatisticsPanel />

              <ExportPanel
                prompts={currentPrompts}
                category={settings.category}
              />
            </motion.div>

            {/* Right Content - Prompts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-6 sm:space-y-8"
            >
              {/* Trending Section */}
              <TrendingSection />

              {/* Generated Prompts */}
              {currentPrompts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="flex items-center justify-between px-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-100">
                      Generated Prompts
                    </h2>
                    <span className="text-xs sm:text-sm text-gray-400">
                      {currentPrompts.length} prompts
                    </span>
                  </div>

                  <PromptsGrid
                    prompts={currentPrompts}
                    category={settings.category}
                    onRegenerate={regenerateSimilar}
                    isLoading={isLoading || regeneratingIndex !== null}
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* Favorites Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 border-t border-glass-light"
        >
          <FavoritesPanel />
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 mt-8 sm:mt-12 border-t border-glass-light text-center"
        >
          <p className="text-xs sm:text-sm text-gray-500">
            AI Prompt Forge © 2024. Powered by Google Gemini API.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Generate professional image prompts optimized for AI image
            generation.
          </p>
        </motion.footer>
      </main>
    </>
  );
}
