"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  HeartHandshake
} from "lucide-react";
import Link from "next/link";

interface RentalItem {
  id: string;
  category: "costumes" | "props" | "accessories";
  categoryLabel: string;
  name: string;
  description: string;
  icon: string;
  highlight?: string;
}

const rentalCategories = [
  { id: "all", label: "All Rental Items", icon: "✨" },
  { id: "costumes", label: "Costumes", icon: "👗" },
  { id: "props", label: "Props", icon: "🎭" },
  { id: "accessories", label: "Performance Accessories", icon: "✨" },
];

const rentalItems: RentalItem[] = [
  // 👗 COSTUMES (10 items)
  {
    id: "c1",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Bollywood",
    description: "Vibrant ghagra cholis, lehengas, and embroidered fusion outfits designed for high-energy routines.",
    icon: "💃",
    highlight: "Popular"
  },
  {
    id: "c2",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Contemporary",
    description: "Fluid, breathable silks, mesh tunics, and minimalist drapes for expressive lyrical performances.",
    icon: "🕊️"
  },
  {
    id: "c3",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Hip-hop",
    description: "Urban streetwear, oversized metallic jackets, cargo sets, and custom varsity gear.",
    icon: "🧢",
    highlight: "Trending"
  },
  {
    id: "c4",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "K-pop",
    description: "Sleek, matching idol team outfits, futuristic harnesses, and concept stage suits.",
    icon: "⭐"
  },
  {
    id: "c5",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Latin",
    description: "Fringed salsa dresses, ballroom gowns, and tailored Latin dance trousers with beaded detailing.",
    icon: "💃"
  },
  {
    id: "c6",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Traditional Sri Lankan",
    description: "Authentic Kandyan Ves attire, Pahatharata low-country costumes, and Sabaragamuwa dance regalia.",
    icon: "🥁",
    highlight: "Heritage"
  },
  {
    id: "c7",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Pageant & Performance Costumes",
    description: "High-glamour couture stage gowns, crystal-embellished bodysuits, and dramatic wings.",
    icon: "👑"
  },
  {
    id: "c8",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Kids' Costumes",
    description: "Tailored mini stage costumes for junior dance troupes, competitions, and school recitals.",
    icon: "🧸"
  },
  {
    id: "c9",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Themed Costumes",
    description: "Custom theatrical wardrobe for conceptual storylines, period pieces, and fantasy themes.",
    icon: "🎨"
  },
  {
    id: "c10",
    category: "costumes",
    categoryLabel: "Costumes",
    name: "Group Performance Costumes",
    description: "Synchronized ensemble wardrobe sets (10 to 50+ dancers) ensuring visual stage perfection.",
    icon: "👥",
    highlight: "Bulk Sets"
  },

  // 🎭 PROPS (11 items)
  {
    id: "p1",
    category: "props",
    categoryLabel: "Props",
    name: "Fans",
    description: "Feather fan veils, silk folding fans, and oversized theatrical hand fans for dramatic reveals.",
    icon: "🪭"
  },
  {
    id: "p2",
    category: "props",
    categoryLabel: "Props",
    name: "Canes",
    description: "Broadway tap canes, dazzle sticks, and traditional cabaret performance walking canes.",
    icon: "🦯"
  },
  {
    id: "p3",
    category: "props",
    categoryLabel: "Props",
    name: "Hats",
    description: "Fedora hats, top hats, Sri Lankan traditional headdresses, and glitter bowler hats.",
    icon: "🎩"
  },
  {
    id: "p4",
    category: "props",
    categoryLabel: "Props",
    name: "Umbrellas",
    description: "Traditional Sri Lankan parasols, LED lit umbrellas, and lace vintage rain props.",
    icon: "☂️"
  },
  {
    id: "p5",
    category: "props",
    categoryLabel: "Props",
    name: "Ribbons",
    description: "Rhythmic gymnastics satin ribbons, aerial silks, and long color-wave streamers.",
    icon: "🎗️"
  },
  {
    id: "p6",
    category: "props",
    categoryLabel: "Props",
    name: "Veils",
    description: "Bellydance silk veils, mystery shrouds, and multi-layered tulle performance drapes.",
    icon: "🌌"
  },
  {
    id: "p7",
    category: "props",
    categoryLabel: "Props",
    name: "Flags",
    description: "Color guard flags, giant metallic team banners, and silk motion flags.",
    icon: "🚩"
  },
  {
    id: "p8",
    category: "props",
    categoryLabel: "Props",
    name: "Chairs",
    description: "Sleek metallic performance chairs, vintage wooden props, and cabaret dance seating.",
    icon: "🪑"
  },
  {
    id: "p9",
    category: "props",
    categoryLabel: "Props",
    name: "LED Props",
    description: "Programmable LED light whips, glow poi, illuminated wings, and neon stage props.",
    icon: "💡",
    highlight: "High-Tech"
  },
  {
    id: "p10",
    category: "props",
    categoryLabel: "Props",
    name: "Traditional Props",
    description: "Authentic Sri Lankan drums (Geta Beraya, Yak Beraya), Raban, and ceremonial brass items.",
    icon: "🪘",
    highlight: "Authentic"
  },
  {
    id: "p11",
    category: "props",
    categoryLabel: "Props",
    name: "Themed Stage Props",
    description: "Large-scale portable backdrop elements, throne chairs, and custom concert set pieces.",
    icon: "🎪"
  },

  // ✨ PERFORMANCE ACCESSORIES (7 items)
  {
    id: "a1",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Jewellery",
    description: "Stage-ready Kundan sets, temple jewellery, sparkling rhinestone necklaces, and earrings.",
    icon: "💎",
    highlight: "Sparkle"
  },
  {
    id: "a2",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Gloves",
    description: "Satin opera gloves, fingerless leather street gloves, and LED glowing performance gloves.",
    icon: "🧤"
  },
  {
    id: "a3",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Headpieces",
    description: "Ornate Kandyan Nalalpata, crown tiaras, feather headdresses, and crystal forehead chains.",
    icon: "👑",
    highlight: "Featured"
  },
  {
    id: "a4",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Masks",
    description: "Traditional Sri Lankan Raksha masks, Venetian masquerade masks, and futuristic cyber visors.",
    icon: "🎭"
  },
  {
    id: "a5",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Belts",
    description: "Coin bellydance belts, metallic waist chains, traditional silver waistbands, and leather harnesses.",
    icon: "⛓️"
  },
  {
    id: "a6",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Hair Accessories",
    description: "Gajra flower garlands, bun cages, decorative hair pins, and metallic braided extensions.",
    icon: "🌺"
  },
  {
    id: "a7",
    category: "accessories",
    categoryLabel: "Performance Accessories",
    name: "Shoes",
    description: "Ghungroo anklets, Latin salsa heels, character shoes, jazz boots, and tap footwear.",
    icon: "👠",
    highlight: "Pro Grade"
  }
];

export default function RentalsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = rentalItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="rentals" className="py-24 bg-[#090410] relative overflow-hidden scroll-mt-20">
      {/* Background Neon Purple Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-fuchsia-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/50 text-fuchsia-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
          >
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            RIGA Wardrobe & Props Rentals
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide mb-4"
          >
            Costumes, Props & <span className="text-metallic-purple">Accessories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-purple-200/70 max-w-3xl mx-auto text-base sm:text-lg font-light leading-relaxed"
          >
            Rent premium stage costumes, theatrical props, and sparkling accessories tailored for dance productions, TV shows, pageants, and high-energy music videos.
          </motion.p>
        </div>

        {/* CATEGORY CONTROLS & SEARCH */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* CATEGORY TABS */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {rentalCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-purple-900 to-fuchsia-900 text-fuchsia-200 border border-purple-500/70 shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105"
                    : "bg-[#140924] text-purple-300/70 border border-purple-900/40 hover:border-purple-600/50 hover:text-white"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            <input
              type="text"
              placeholder="Search costumes, props..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#140924] border border-purple-900/50 text-white text-xs placeholder:text-purple-400/50 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/50 transition-all"
            />
          </div>
        </div>

        {/* ITEMS GRID */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="group relative p-6 rounded-2xl bg-[#140924]/90 border border-purple-900/40 hover:border-purple-500/70 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-2xl shadow-[0_0_12px_rgba(168,85,247,0.2)] group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    {item.highlight ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-fuchsia-950 border border-fuchsia-700/60 text-fuchsia-300 shadow-[0_0_10px_rgba(232,121,249,0.3)]">
                        {item.highlight}
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-widest text-purple-400/60 font-semibold">
                        {item.categoryLabel}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-fuchsia-300 transition-colors mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-purple-200/70 leading-relaxed font-light mb-6">
                    {item.description}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="w-full py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/90 border border-purple-800/40 hover:border-purple-500/60 text-purple-200 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all group-hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                >
                  <span>Inquire Rental</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-fuchsia-400" />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#140924]/50 rounded-2xl border border-purple-900/40">
            <p className="text-purple-300/70 text-sm">No rental items found matching your search.</p>
          </div>
        )}

        {/* BOTTOM RENTAL HIGHLIGHTS & CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#140924] via-[#1c0c36] to-[#140924] border border-purple-900/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
              <HeartHandshake className="w-5 h-5 text-fuchsia-400" />
              Need Custom Costume Tailoring or Bulk Troupes?
            </h4>
            <p className="text-xs sm:text-sm text-purple-200/70 max-w-xl font-light">
              We offer bespoke costume stitching, troupe color coordination, and long-term rental packages for school concerts, TV productions & international tours.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(232,121,249,0.7)] transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            Contact Rental Desk
          </Link>
        </div>
      </div>
    </section>
  );
}
