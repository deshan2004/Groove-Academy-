"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clapperboard, Film, Music, Sparkles, Video, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <Clapperboard className="w-8 h-8 text-fuchsia-400" />,
    title: "Music Video Choreography",
    description: "Tailored movement direction for solo artists, bands, and concept music videos with camera-blocking expertise."
  },
  {
    icon: <Film className="w-8 h-8 text-purple-400" />,
    title: "Film & Commercial Production",
    description: "Professional dancers, stunt doubles, and choreographers for TV commercials, feature films, and digital campaigns."
  },
  {
    icon: <Music className="w-8 h-8 text-fuchsia-400" />,
    title: "Stage & Concert Direction",
    description: "Full stage direction, lighting sync, and group movement coordination for arena concerts and award galas."
  },
  {
    icon: <Video className="w-8 h-8 text-purple-400" />,
    title: "Concept Video Production",
    description: "End-to-end dance film creation including location scouting, wardrobe styling, lighting, and 4K video editing."
  }
];

export default function ProductionsPage() {
  return (
    <div className="min-h-screen bg-[#090410] text-white">
      {/* Back Button */}
      <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:border-purple-500/60 transition-all text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
          <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/50 text-fuchsia-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
        >
          <Clapperboard className="w-4 h-4 text-fuchsia-400" />
          RIGA Productions & Media
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl font-black uppercase text-white tracking-wide mb-6"
        >
          Choreography & <span className="text-metallic-purple">Media Productions</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-purple-200/70 max-w-3xl mx-auto text-base sm:text-lg font-light leading-relaxed mb-16"
        >
          We deliver world-class movement direction, film choreography, and full-scale dance video production for commercials, artists, and grand theatrical stages.
        </motion.p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left">
          {services.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-[#140924] border border-purple-900/40 hover:border-purple-500/60 transition-all group"
            >
              <div className="w-16 h-16 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-purple-200/70 font-light leading-relaxed mb-6">{item.description}</p>
              <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-fuchsia-400" />
                Professional Production Ready
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-900/40 via-fuchsia-900/30 to-purple-900/40 border border-purple-800/50 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h3 className="text-2xl font-black text-white mb-2">Have a Commercial or Video Project in Mind?</h3>
            <p className="text-xs sm:text-sm text-purple-200/70 font-light">Contact our production directors to discuss choreography, dancer casting & shoot schedules.</p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(168,85,247,0.5)] whitespace-nowrap"
          >
            Start Production Inquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
