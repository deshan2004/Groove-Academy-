"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Users, Trophy, Flame, Mail, Video, Music } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

const crewMembers = [
  {
    id: 1,
    name: "Alex Vance",
    role: "Head Hip-Hop Choreographer",
    specialty: "Urban Street Dance & Battles",
    bio: "Lead choreographer for international dance championships with over 10 years of professional battle & stage experience.",
    image: "https://images.unsplash.com/photo-1535579710123-3c0f261c474e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    stats: "15+ Championship Titles"
  },
  {
    id: 2,
    name: "Senaka Perera",
    role: "Kandyan & Cultural Lead",
    specialty: "Traditional Ves & Drums",
    bio: "Master Kandyan artisan combining ancient drumming rhythms with modern theatrical stage presence.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    stats: "National Heritage Awardee"
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Contemporary Art Director",
    specialty: "Lyrical & Fusion Stage",
    bio: "Award-winning international soloist known for dramatic emotional storytelling and fluid movement technique.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    stats: "International Grand Prix Winner"
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Classical Fusion Master",
    specialty: "Bharatanatyam & Kathak",
    bio: "Renowned classical virtuoso specializing in syncopated rhythm footwork and expressive facial abhinaya.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    stats: "20+ Years Stage Experience"
  }
];

export default function CrewPage() {
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
            <Trophy className="w-4 h-4 text-fuchsia-400" />
            RIGA Pro Performance Team
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black uppercase text-white tracking-wide mb-4"
          >
            The RIGA <span className="text-metallic-purple">Crew</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-purple-200/70 text-base sm:text-lg max-w-2xl mx-auto font-light"
          >
            Sri Lanka's elite dance ensemble featuring champion choreographers, stage performers, and competition dancers.
          </motion.p>
        </div>

        {/* Crew Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {crewMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[#140924] border border-purple-900/40 rounded-2xl overflow-hidden group hover:border-purple-500/70 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300"
            >
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#140924] via-transparent to-transparent z-10" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute bottom-3 left-3 z-20">
                  <span className="bg-purple-950/90 border border-purple-700/60 text-fuchsia-300 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-[0_0_10px_rgba(232,121,249,0.3)]">
                    {member.specialty}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-fuchsia-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-purple-400 font-semibold mb-3">{member.role}</p>
                <p className="text-purple-200/70 text-xs leading-relaxed font-light mb-4">
                  {member.bio}
                </p>
                <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between text-[11px] text-fuchsia-300/90 font-bold uppercase tracking-wider">
                  <span>{member.stats}</span>
                  <Flame className="w-4 h-4 text-fuchsia-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hire Crew CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#140924] via-[#1c0c36] to-[#140924] border border-purple-900/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
              <Users className="w-5 h-5 text-fuchsia-400" />
              Book RIGA Crew for Live Performances & Corporate Shows
            </h4>
            <p className="text-xs sm:text-sm text-purple-200/70 max-w-xl font-light">
              Hire our professional dance troupe for award shows, television broadcasts, music videos, and high-impact concert openers.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(232,121,249,0.7)] transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            Book Pro Crew
          </Link>
        </div>

      </div>
      <Footer />
    </div>
  );
}
