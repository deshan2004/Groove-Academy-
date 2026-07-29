"use client";

import { motion } from "framer-motion";
import { Star, Trophy, Users, Heart } from "lucide-react";

const features = [
  {
    icon: <Star className="w-8 h-8 text-academy-gold" />,
    title: "Expert Instructors",
    description: "Learn from internationally recognized professional dancers with years of industry experience.",
  },
  {
    icon: <Users className="w-8 h-8 text-academy-gold" />,
    title: "Small Class Sizes",
    description: "Get personalized attention with limited student numbers to ensure your rapid progression.",
  },
  {
    icon: <Trophy className="w-8 h-8 text-academy-gold" />,
    title: "Premium Facilities",
    description: "Train in our state-of-the-art studios equipped with sprung floors and professional sound systems.",
  },
  {
    icon: <Heart className="w-8 h-8 text-academy-gold" />,
    title: "Inclusive Community",
    description: "Join a supportive family of passionate dancers who will encourage you every step of the way.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-academy-gray relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-academy-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-academy-red/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Why Choose <span className="text-academy-gold">StepUp</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            We provide an unparalleled dancing experience designed to take your skills to the next level.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-academy-black border border-gray-800 p-8 rounded-2xl hover:border-academy-gold/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-academy-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full"></div>
              <div className="bg-gray-900/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
