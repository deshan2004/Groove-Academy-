"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clapperboard, Video, Sparkles, Film, Mic2, Tv } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

const services = [
  {
    icon: <Film className="w-8 h-8 text-fuchsia-400" />,
    title: "Film & Music Video Choreography",
    description: "Custom dance composition and movement direction for feature films, high-concept music videos, and commercial advertisements."
  },
  {
    icon: <Tv className="w-8 h-8 text-purple-400" />,
    title: "TV & Reality Show Production",
    description: "Stage management, choreography direction, and contestant coaching for major televised dance reality competitions."
  },
  {
    icon: <Sparkles className="w-8 h-8 text-fuchsia-400" />,
    title: "Live Concert Stage Direction",
    description: "Complete artistic vision, lighting synchronization, backup troupe coordination, and stage entry choreography for arena concerts."
  },
  {
    icon: <Mic2 className="w-8 h-8 text-purple-400" />,
    title: "Corporate & Brand Launches",
    description: "High-octane custom dance acts designed around corporate branding, product reveals, and international summits."
  }
];

export default function ProductionsPage() {
  return (
    <div className="min-h-screen bg-[#090410] text-purple-100 pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back to Home Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:border-purple-500/60 transition-all text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
            Back to Home
          </Link>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/50 text-fuchsia-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
          >
            <Clapperboard className="w-4 h-4 text-fuchsia-400" />
            RIGA Media & Stage Productions
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black uppercase text-white tracking-wide mb-4"
          >
            RIGA <span className="text-metallic-purple">Productions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-purple-200/70 text-base sm:text-lg max-w-2xl mx-auto font-light"
          >
            Full-service dance production, commercial choreography, media direction, and arena-scale stage entertainment.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-[#140924] border border-purple-900/40 hover:border-purple-500/70 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-purple-200/70 leading-relaxed font-light text-sm mb-6">
                  {service.description}
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fuchsia-400 hover:text-white transition-colors"
              >
                <span>Request Production Proposal &rarr;</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#140924] via-[#1c0c36] to-[#140924] border border-purple-900/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
              <Video className="w-5 h-5 text-fuchsia-400" />
              Planning a Music Video, Commercial or Stage Show?
            </h4>
            <p className="text-xs sm:text-sm text-purple-200/70 max-w-xl font-light">
              Partner with RIGA Productions to elevate your visual storytelling with world-class choreography and professional dancers.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(232,121,249,0.7)] transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            Start a Production
          </Link>
        </div>

      </div>
      <Footer />
    </div>
  );
}
