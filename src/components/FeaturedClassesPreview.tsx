"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";

const featuredClasses = [
  {
    id: 1,
    title: "Kandyan Traditional",
    level: "All Levels",
    duration: "2 Hours",
    spots: "15 Spots",
    image: "https://images.unsplash.com/photo-1542838686-37ed7a956140?auto=format&fit=crop&q=80",
    color: "from-orange-500/80 to-academy-gold/80"
  },
  {
    id: 2,
    title: "Pahatharata Traditional",
    level: "Intermediate",
    duration: "1.5 Hours",
    spots: "15 Spots",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
    color: "from-red-600/80 to-orange-600/80"
  },
  {
    id: 3,
    title: "Sabaragamuwa Traditional",
    level: "Advanced",
    duration: "2 Hours",
    spots: "12 Spots",
    image: "https://images.unsplash.com/photo-1533147670608-2a2f9776d3ac?auto=format&fit=crop&q=80",
    color: "from-yellow-500/80 to-amber-700/80"
  },
  {
    id: 4,
    title: "Urban Hip-Hop",
    level: "Intermediate",
    duration: "1.5 Hours",
    spots: "20 Spots",
    image: "https://images.unsplash.com/photo-1535525153412-5a42439a6e0c?auto=format&fit=crop&q=80",
    color: "from-blue-600/80 to-purple-600/80"
  },
  {
    id: 5,
    title: "Contemporary Flow",
    level: "Advanced",
    duration: "2 Hours",
    spots: "12 Spots",
    image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&q=80",
    color: "from-pink-500/80 to-academy-red/80"
  },
  {
    id: 6,
    title: "Sri Lankan Folk Dance",
    level: "Beginner",
    duration: "1 Hour",
    spots: "25 Spots",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80",
    color: "from-green-500/80 to-teal-700/80"
  }
];

export default function FeaturedClassesPreview() {
  return (
    <section className="py-24 bg-academy-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Featured <span className="text-academy-gold">Classes</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-xl text-lg"
            >
              Discover our most popular dance programs designed for every skill level.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/classes"
              className="group flex items-center gap-2 text-academy-gold hover:text-yellow-400 font-medium transition-colors"
            >
              View All Classes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredClasses.map((cls, index) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={cls.image} 
                  alt={cls.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cls.color} mix-blend-multiply opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-academy-black via-academy-black/50 to-transparent opacity-90"></div>
              
              {/* Content */}
              <div className="relative p-8 h-full min-h-[400px] flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-white tracking-wider uppercase border border-white/20">
                    {cls.level}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-academy-gold transition-colors">
                  {cls.title}
                </h3>
                
                <div className="flex items-center gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-academy-gold" />
                    {cls.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-academy-gold" />
                    {cls.spots}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
