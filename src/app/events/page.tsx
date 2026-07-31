"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-academy-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-academy-black/50 via-academy-black to-academy-black"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-academy-gold/10 text-academy-gold px-4 py-2 rounded-full mb-6 border border-academy-gold/20"
          >
            <Star className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider uppercase">Academy Events</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-academy-gold to-yellow-200">Showcases</span> & Workshops
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Join us for exclusive performances, cultural festivals, and masterclasses led by renowned instructors.
          </motion.p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-academy-gold"></div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-academy-gray border border-gray-800 rounded-3xl">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Upcoming Events</h3>
            <p className="text-gray-400">Check back later for new workshops and performances!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((ev, index) => (
              <motion.div
                key={ev._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-academy-gray border border-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:border-academy-gold/50 transition-all group flex flex-col"
              >
                <div className="h-48 bg-black relative overflow-hidden">
                  {ev.imageUrl ? (
                    <img 
                      src={ev.imageUrl} 
                      alt={ev.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-academy-gold/20 to-black flex items-center justify-center">
                      <Star className="w-12 h-12 text-academy-gold/50" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-academy-gold text-black font-bold px-3 py-1 rounded-lg shadow-lg">
                    {new Date(ev.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{ev.title}</h3>
                  <p className="text-gray-400 mb-6 text-sm line-clamp-3 flex-1">{ev.description}</p>
                  
                  <div className="space-y-2 mt-auto pt-6 border-t border-gray-800">
                    <div className="flex items-center text-gray-300 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-academy-gold" />
                      {ev.time}
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-academy-gold" />
                      {ev.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
