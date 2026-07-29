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

const fallbackClasses: IClass[] = [
  { _id: "1", title: "Beginner Hip-Hop", style: "Hip-Hop", day: "Monday", time: "18:00 - 19:30", instructor_name: "Alex Vance", hall_no: "Hall A" },
  { _id: "2", title: "Traditional Kandyan", style: "Kandyan", day: "Wednesday", time: "17:00 - 19:00", instructor_name: "Senaka Perera", hall_no: "Main Studio" },
  { _id: "3", title: "Contemporary Flow", style: "Contemporary", day: "Friday", time: "19:00 - 20:30", instructor_name: "Elena Rostova", hall_no: "Hall B" },
  { _id: "4", title: "Classical Fundamentals", style: "Classical", day: "Saturday", time: "10:00 - 12:00", instructor_name: "Priya Sharma", hall_no: "Studio 2" },
];

const ClassSchedule = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("/api/classes");
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setClasses(json.data);
        } else {
          setClasses(fallbackClasses);
        }
      } catch (error) {
        console.error("Error fetching classes", error);
        setClasses(fallbackClasses);
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
