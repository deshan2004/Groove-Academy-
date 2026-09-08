"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#07020e] text-white pt-24 pb-16">
      
      {/* Background Ambient Lights & Swirling Smoke */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[150px] mix-blend-screen animate-pulse" />
        <div className="absolute top-1/3 -right-24 w-[600px] h-[600px] bg-fuchsia-900/25 rounded-full blur-[160px] mix-blend-screen" />
        <div className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-800/20 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07020e]/80 via-transparent to-[#07020e]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        
        {/* --- NATIVE VECTOR SVG + METALLIC SHIMMER LOGO COMPOSITION --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full max-w-4xl flex flex-col items-center mb-8 px-2"
        >
          {/* Vector RIGA Logo */}
          <div className="w-full relative py-2">
            <svg 
              viewBox="0 0 920 220" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto max-h-[220px] sm:max-h-[280px] filter drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]"
            >
              <defs>
                {/* 3D Metallic Violet Sheen Gradient */}
                <linearGradient id="metallicViolet" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="18%" stopColor="#F3E8FF" />
                  <stop offset="40%" stopColor="#D8B4FE" />
                  <stop offset="65%" stopColor="#A855F7" />
                  <stop offset="88%" stopColor="#7E22CE" />
                  <stop offset="100%" stopColor="#F0ABFC" />
                </linearGradient>

                <linearGradient id="dancerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#E9D5FF" />
                  <stop offset="60%" stopColor="#C084FC" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>

                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* LETTER R */}
              <path
                d="M 100 180 C 160 180 230 175 270 168 C 305 160 340 140 300 112 C 265 88 190 85 100 85 L 100 70 L 320 70 C 375 70 380 110 320 135 C 280 148 240 148 245 153 C 265 158 295 168 340 180 L 100 180 Z"
                fill="url(#metallicViolet)"
              />

              {/* DANCER SILHOUETTE (LETTER 'I') */}
              <g transform="translate(320, 0)">
                <path
                  d="M 42 220 Q 38 180 40 140 Q 42 100 25 70 Q 15 50 22 35 C 28 20 48 20 52 35 C 55 45 42 60 48 85 Q 56 120 50 160 Q 46 195 42 220 Z"
                  fill="url(#dancerGradient)"
                  filter="url(#neonGlow)"
                />
                <path
                  d="M 45 40 Q 60 25 85 5 Q 88 12 72 32 Q 52 50 45 55 Z"
                  fill="url(#dancerGradient)"
                />
                <path
                  d="M 38 100 Q 25 120 15 150 Q 10 165 18 162 Q 28 145 38 125 Z"
                  fill="url(#dancerGradient)"
                />
              </g>

              {/* LETTER G */}
              <path
                d="M 435 70 L 590 70 L 590 100 L 480 100 L 480 150 L 545 150 L 545 125 L 515 125 L 515 105 L 590 105 L 590 180 L 435 180 Z"
                fill="url(#metallicViolet)"
              />

              {/* LETTER A */}
              <path
                d="M 685 60 L 795 180 L 745 180 L 730 160 L 655 160 L 675 135 L 715 135 L 690 90 L 625 180 L 575 180 Z"
                fill="url(#metallicViolet)"
              />

              {/* Lens Flare Sparkle on Letter A Apex */}
              <circle cx="685" cy="60" r="5" fill="#FFFFFF" filter="url(#neonGlow)" />
              <path d="M 685 40 L 685 80 M 665 60 L 705 60" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
            </svg>
          </div>

          {/* DANCE ACADEMY TEXT - GUARANTEED NON-WRAPPING */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full overflow-hidden text-center"
          >
            <h2 className="whitespace-nowrap select-none text-[5vw] sm:text-3xl md:text-5xl font-light tracking-[0.3em] sm:tracking-[0.55em] text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-fuchsia-200 to-purple-300 uppercase mt-1 mb-3 font-sans drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]">
              DANCE ACADEMY
            </h2>
          </motion.div>

          {/* DIVIDER LINE & TAGLINE - GUARANTEED NON-WRAPPING */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full flex items-center justify-center gap-3 sm:gap-5 max-w-2xl my-2"
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-purple-500/60 to-purple-400/80" />
            <span className="whitespace-nowrap select-none text-[2.5vw] sm:text-xs md:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.45em] text-purple-200/90 uppercase drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
              DANCE BEYOND LIMITS.
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-purple-500/60 to-purple-400/80" />
          </motion.div>
        </motion.div>

        {/* --- CATEGORY NAVIGATION LINKS (ACADEMY | CREW | RENTALS | PRODUCTIONS | EVENTS) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold tracking-[0.25em] text-purple-300/90 uppercase mb-10"
        >
          <a href="#academy" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.9)] transition-all">
            ACADEMY
          </a>
          <span className="text-purple-600/60 font-light">|</span>
          <a href="#crew" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.9)] transition-all">
            CREW
          </a>
          <span className="text-purple-600/60 font-light">|</span>
          <a href="#rentals" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.9)] transition-all">
            RENTALS
          </a>
          <span className="text-purple-600/60 font-light">|</span>
          <a href="#productions" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.9)] transition-all">
            PRODUCTIONS
          </a>
          <span className="text-purple-600/60 font-light">|</span>
          <a href="#events" className="hover:text-fuchsia-300 hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.9)] transition-all">
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
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-purple-100 transition-all duration-300 bg-purple-950/60 border border-purple-500/50 rounded-full hover:bg-purple-600 hover:text-white hover:border-purple-400 hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] backdrop-blur-md"
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





