"use client";
import React from "react";
import { motion } from "motion/react";
import { Globe } from "@/components/ui/globe";

interface UsageStatsProps {
  timelineRef: React.RefObject<HTMLDivElement | null>;
  animationNum: number;
  customVariants?: Record<string, unknown>;
}

const UsageStats: React.FC<UsageStatsProps> = ({
  timelineRef,
  animationNum,
  customVariants,
}) => {
  return (
    <>
      {/* background gradient */}
      <div className="absolute inset-0 z-0 rounded-lg bg-[radial-gradient(125%_125%_at_50%_10%,rgba(255,255,255,0)_40%,#6366f1_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,rgba(0,0,0,0)_40%,#6366f1_100%)]" />

      {/* Globe */}
      <div className="absolute inset-0 z-[1] opacity-30 flex items-center justify-center">
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 max-w-[90%] aspect-square">
          <Globe className="w-full h-full" />
        </div>
      </div>

      {/* soft radial overlay */}
      <div className="pointer-events-none absolute inset-0 z-[2] h-full bg-[radial-gradient(circle_at_50%_200%,rgba(99,102,241,0.10),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_200%,rgba(99,102,241,0.20),rgba(0,0,0,0))]" />

      {/* avatars */}
      <motion.div
        className="relative z-10 -space-x-2 sm:-space-x-3 flex"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        {[
          'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200',
          'https://images.unsplash.com/photo-1617171594279-3aa1f300a0f2?q=80&w=200',
          'https://images.unsplash.com/photo-1659228135452-c4c7b5118047?q=80&w=200',
        ].map((src, i) => (
          <motion.img
            key={i}
            src={src}
            width={96} 
            height={96}
            alt={`User ${i + 1}`}
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl object-cover border-3 sm:border-4 border-white dark:border-neutral-800"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 2.0 + i * 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
          />
        ))}
      </motion.div>

      {/* title + caption */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.5 }}
        className="relative z-10 mt-auto"
      >
        <motion.h1
          className="font-semibold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.8, duration: 0.3, type: 'spring' }}
        >
          10M+
        </motion.h1>
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1">
          Used by millions of teams and professionals
        </p>
      </motion.div>
    </>
  );
};

export default UsageStats;