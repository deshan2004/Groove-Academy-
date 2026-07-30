"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, MapPin, User } from "lucide-react";
export interface IClass {
  _id?: string;
  title: string;
  style: string;
  day: string;
  time: string;
  instructor_name: string;
  hall_no: string;
}



const ClassSchedule = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("/api/classes");
        const json = await res.json();
        if (json.success) {
          setClasses(json.data);
        }
      } catch (error) {
        console.error("Error fetching classes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  return (
    <section id="classes" className="py-24 bg-academy-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Class <span className="text-academy-gold">Schedule</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            viewport={{ once: true }}
            className="h-1 w-24 bg-academy-red mx-auto rounded-full"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-academy-gold"></div>
          </div>
        ) : classes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-academy-gray border border-gray-800 rounded-full flex items-center justify-center mb-6">
              <Calendar className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Classes Scheduled</h3>
            <p className="text-gray-400">Please check back later or contact the academy for the latest schedule.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            {classes.map((cls, index) => (
              <motion.div
                key={cls._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-academy-gray border border-gray-800 p-6 rounded-2xl hover:border-academy-gold/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-academy-red text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                  {cls.style}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-academy-gold transition-colors">{cls.title}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-400">
                  <div className="flex items-center space-x-2 text-sm sm:text-base">
                    <Calendar className="w-5 h-5 text-academy-gold shrink-0" />
                    <span className="truncate">{cls.day}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm sm:text-base">
                    <Clock className="w-5 h-5 text-academy-gold shrink-0" />
                    <span className="truncate">{cls.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm sm:text-base">
                    <User className="w-5 h-5 text-academy-gold shrink-0" />
                    <span className="truncate">{cls.instructor_name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm sm:text-base">
                    <MapPin className="w-5 h-5 text-academy-gold shrink-0" />
                    <span className="truncate">{cls.hall_no}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClassSchedule;
