"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#07020e] text-white pt-24 pb-16">
      
      {/* Background Purple Smoke & Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Left Swirling Smoke Glow */}
        <div className="absolute -top-20 -left-20 w-[550px] h-[550px] bg-purple-900/30 rounded-full blur-[140px] mix-blend-screen animate-pulse" />
        {/* Right Swirling Smoke Glow */}
        <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-fuchsia-900/25 rounded-full blur-[160px] mix-blend-screen" />
        {/* Bottom Swirling Fog */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-purple-800/20 rounded-full blur-[120px] mix-blend-screen" />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07020e]/60 via-transparent to-[#07020e]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        
        {/* --- MAIN CENTERPIECE LOGO (SVG + METALLIC SHIMMER) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-4xl flex flex-col items-center mb-8"
        >
          {/* RIGA Vector Logo Banner */}
          <div className="w-full relative px-2 sm:px-6 py-4">
            <svg 
              viewBox="0 0 900 240" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto max-h-[220px] sm:max-h-[300px] filter drop-shadow-[0_0_30px_rgba(168,85,247,0.45)]"
            >
              <defs>
                {/* 3D Metallic Purple/Violet Sheen Gradient */}
                <linearGradient id="metallicViolet" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="20%" stopColor="#E9D5FF" />
                  <stop offset="45%" stopColor="#C084FC" />
                  <stop offset="70%" stopColor="#9333EA" />
                  <stop offset="90%" stopColor="#7E22CE" />
                  <stop offset="100%" stopColor="#E879F9" />
                </linearGradient>

                <linearGradient id="dancerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5F3FF" />
                  <stop offset="30%" stopColor="#D8B4FE" />
                  <stop offset="65%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#6D28D9" />
                </linearGradient>

                {/* Glow Filter */}
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* LETTER R */}
              <path
                d="M 120 180 C 170 180 230 175 270 170 C 310 165 350 145 310 115 C 270 85 200 85 120 85 L 120 70 L 320 70 C 370 70 380 110 320 135 C 280 150 250 150 250 155 C 270 160 300 170 340 180 L 120 180 Z"
                fill="url(#metallicViolet)"
              />

              {/* DANCER SILHOUETTE (LETTER 'I') */}
              <g transform="translate(325, 0)">
                {/* Dancer Body / Legs forming the 'I' stem */}
                <path
                  d="M 42 220 Q 38 180 40 140 Q 42 100 25 70 Q 15 50 22 35 C 28 20 48 20 52 35 C 55 45 42 60 48 85 Q 56 120 50 160 Q 46 195 42 220 Z"
                  fill="url(#dancerGradient)"
                  filter="url(#neonGlow)"
                />
                {/* Extended Graceful Arms & Head */}
                <path
                  d="M 45 40 Q 60 25 85 5 Q 88 12 72 32 Q 52 50 45 55 Z"
                  fill="url(#dancerGradient)"
                />
                {/* Arching Back & Leg Accent */}
                <path
                  d="M 38 100 Q 25 120 15 150 Q 10 165 18 162 Q 28 145 38 125 Z"
                  fill="url(#dancerGradient)"
                />
              </g>

              {/* LETTER G */}
              <path
                d="M 440 70 L 590 70 L 590 100 L 485 100 L 485 150 L 550 150 L 550 125 L 520 125 L 520 105 L 590 105 L 590 180 L 440 180 Z"
                fill="url(#metallicViolet)"
              />

              {/* LETTER A */}
              <path
                d="M 690 60 L 795 180 L 745 180 L 730 160 L 655 160 L 675 135 L 715 135 L 690 90 L 625 180 L 575 180 Z"
                fill="url(#metallicViolet)"
              />

              {/* Lens Flare Sparkle on Letter A Apex */}
              <circle cx="690" cy="60" r="4" fill="#FFFFFF" filter="url(#neonGlow)" />
              <path d="M 690 45 L 690 75 M 675 60 L 705 60" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
            </svg>
          </div>

          {/* DANCE ACADEMY TEXT */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.45em] sm:tracking-[0.6em] text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-fuchsia-200 to-purple-300 uppercase mt-2 mb-4 font-sans drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]"
          >
            D A N C E &nbsp; A C A D E M Y
          </motion.h2>

          {/* DIVIDER LINE & TAGLINE */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full flex items-center justify-center gap-4 max-w-2xl my-3"
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-purple-500/60 to-purple-400/80" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.35em] sm:tracking-[0.45em] text-purple-200/90 uppercase whitespace-nowrap drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
              DANCE BEYOND LIMITS.
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-purple-500/60 to-purple-400/80" />
          </motion.div>
        </motion.div>

        {/* --- CATEGORY LINKS (ACADEMY | CREW | RENTALS | PRODUCTIONS | EVENTS) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold tracking-[0.25em] text-purple-300/80 uppercase mb-12"
        >
          <a href="#academy" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_10px_rgba(232,121,249,0.8)] transition-all">
            ACADEMY
          </a>
          <span className="text-purple-600/60 font-light">|</span>
          <a href="#crew" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_10px_rgba(232,121,249,0.8)] transition-all">
            CREW
          </a>
          <span className="text-purple-600/60 font-light">|</span>
          <a href="#rentals" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_10px_rgba(232,121,249,0.8)] transition-all">
            RENTALS
          </a>
          <span className="text-purple-600/60 font-light">|</span>
          <a href="#productions" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_10px_rgba(232,121,249,0.8)] transition-all">
            PRODUCTIONS
          </a>
          <span className="text-purple-600/60 font-light">|</span>
          <a href="#events" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_10px_rgba(232,121,249,0.8)] transition-all">
            EVENTS
          </a>
        </motion.div>

        {/* --- ACTION BUTTONS --- */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row justify-center gap-5"
        >
          <Link
            href="/classes"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-purple-100 transition-all duration-300 bg-purple-950/50 border border-purple-500/60 rounded-full hover:bg-purple-600 hover:text-white hover:border-purple-400 hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 mr-2 text-fuchsia-400 group-hover:rotate-12 transition-transform" />
            Explore Classes
          </Link>
          <Link
            href="/enroll"
            className="group inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white transition-all duration-300 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 rounded-full hover:from-purple-500 hover:to-fuchsia-500 shadow-[0_0_30px_rgba(168,85,247,0.55)] hover:shadow-[0_0_45px_rgba(232,121,249,0.85)] border border-fuchsia-400/40"
          >
            Start Dancing Now
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>

      {/* --- FLOOR LIGHT BEAM REFLECTION (MATCHING IMAGE BOTTOM SPOTLIGHT) --- */}
      <div className="w-full max-w-4xl mt-16 px-4 relative flex flex-col items-center">
        <div className="w-3/4 sm:w-1/2 h-[3px] bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_25px_#e879f9] rounded-full" />
        <div className="w-full h-12 bg-gradient-to-t from-purple-600/20 via-purple-500/5 to-transparent blur-md -mt-3 pointer-events-none" />
      </div>

    </section>
  );
};

export default Hero;


