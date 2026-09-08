"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#07020e] text-white pt-20 pb-16">
      
      {/* Background Ambient Lights */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[150px] mix-blend-screen animate-pulse" />
        <div className="absolute top-1/3 -right-24 w-[600px] h-[600px] bg-fuchsia-900/25 rounded-full blur-[160px] mix-blend-screen" />
        <div className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-purple-800/20 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07020e]/80 via-transparent to-[#07020e]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        
        {/* --- PIXEL-PERFECT ORIGINAL RIGA LOGO BANNER IMAGE --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full relative flex flex-col items-center mb-6 group"
        >
          {/* Main Logo Card Image with Subtle Glow Overlay */}
          <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.35)] border border-purple-500/20 bg-[#07020e]">
            <img 
              src="/images/riga-banner.jpg" 
              alt="RIGA Dance Academy - Dance Beyond Limits" 
              className="w-full h-auto object-contain block mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
            />
            
            {/* Seamless Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07020e] via-transparent to-transparent opacity-40 pointer-events-none" />
          </div>

          {/* Interactive Division Navigation Bar (ACADEMY | CREW | RENTALS | PRODUCTIONS | EVENTS) */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold tracking-[0.25em] text-purple-200/80 uppercase mt-6 mb-2">
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
          </div>
        </motion.div>

        {/* --- ACTION BUTTONS --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-5 mt-2"
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

    </section>
  );
};

export default Hero;



