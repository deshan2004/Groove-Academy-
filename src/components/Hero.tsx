"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-academy-black">
      {/* Background Image & Purple Smoke Ambient Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-academy-black/80 via-[#140924]/85 to-academy-black z-10" />
        <div 
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundPosition: "center 20%" }}
        />
        {/* Purple Glowing Fog Circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/25 rounded-full blur-[140px] pointer-events-none z-10 animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          <Sparkles className="w-4 h-4 text-fuchsia-400" />
          <span>Dance Beyond Limits</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-6">
            Unleash Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-400 to-purple-600 drop-shadow-[0_0_25px_rgba(192,132,252,0.6)]">
              Inner Rhythm
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-purple-200/80 mb-10 leading-relaxed font-light"
        >
          Experience the art of movement at RIGA Dance Academy. Master Kandyan, Hip-Hop, Classical, and Contemporary styles with world-class instructors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-center gap-5"
        >
          <Link
            href="/classes"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-purple-100 transition-all duration-300 bg-purple-950/40 border-2 border-purple-500/60 rounded-full hover:bg-purple-600 hover:text-white hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] backdrop-blur-md"
          >
            Explore Classes
          </Link>
          <Link
            href="/enroll"
            className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 rounded-full hover:from-purple-500 hover:to-fuchsia-500 shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(232,121,249,0.8)] border border-fuchsia-400/40"
          >
            Start Dancing
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-academy-black via-academy-black/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default Hero;

