"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Dance Performance 1", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1502519144081-acca18599776?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Dance Performance 2", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { id: 3, src: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Dance Performance 3", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { id: 4, src: "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Dance Performance 4", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { id: 5, src: "https://images.unsplash.com/photo-1535525153412-5a42439a610f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Dance Performance 5", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { id: 6, src: "https://images.unsplash.com/photo-1473691955023-da1c49c95c78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Dance Performance 6", colSpan: "col-span-1", rowSpan: "row-span-1" },
];

export default function GalleryPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-academy-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-academy-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-academy-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our <span className="text-academy-gold">Gallery</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.2 }}
            className="h-1 w-24 bg-academy-red mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A glimpse into the passion, energy, and rhythm of StepUp Dance Academy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative rounded-2xl overflow-hidden group ${image.colSpan} ${image.rowSpan} h-[250px] md:h-auto`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <span className="bg-academy-black/80 text-white px-6 py-2 rounded-full font-medium tracking-wider uppercase text-sm border border-academy-gold/30">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
