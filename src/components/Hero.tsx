"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image / Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-academy-black/70 via-academy-black/80 to-academy-black z-10" />
        <div 
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
          style={{ backgroundPosition: "center 20%" }}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            Unleash Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-academy-gold to-yellow-600">Inner Rhythm</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 mb-10"
        >
          Experience the art of movement at StepUp Dance Academy. Master Kandyan, Hip-Hop, Classical, and Contemporary styles with world-class instructors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="#classes"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-transparent border-2 border-academy-gold rounded-full hover:bg-academy-gold hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-academy-gold"
          >
            Explore Classes
          </Link>
          <Link
            href="#enroll"
            className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-academy-red rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 shadow-[0_0_20px_rgba(198,40,40,0.4)]"
          >
            Start Dancing
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-academy-black to-transparent z-20" />
    </section>
  );
};

export default Hero;
