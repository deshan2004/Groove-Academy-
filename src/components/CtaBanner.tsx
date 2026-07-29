"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-academy-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-academy-red to-red-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-academy-red/20 border border-red-500/30"
        >
          {/* Decorative Elements inside banner */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80')] bg-cover mix-blend-overlay opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-academy-gold rounded-full mix-blend-screen filter blur-[80px] opacity-40"></div>
          
          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-8"
            >
              <Sparkles className="w-8 h-8 text-academy-gold" />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Ready to take the floor?
            </h2>
            <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Join StepUp Academy today and discover your true potential. Transform your passion into breathtaking performances.
            </p>
            
            <Link
              href="/enroll"
              className="inline-block bg-academy-gold hover:bg-yellow-400 text-black font-bold text-lg py-4 px-10 rounded-full transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            >
              Start Your Journey Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
