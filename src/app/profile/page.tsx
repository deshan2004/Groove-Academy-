"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, LogOut } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (!u) {
        router.push("/login");
      } else {
        if (u.email?.toLowerCase() === "admin@stepup.com") {
          router.push("/admin");
        } else {
          setUser(u);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-academy-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-academy-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-academy-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-academy-gold/5 rounded-full -z-10 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <div className="h-32 w-32 rounded-full bg-academy-black border-4 border-academy-gold flex items-center justify-center text-academy-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <User className="w-16 h-16" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">Student Profile</h1>
              <p className="text-gray-400 mb-6">{user?.email}</p>
              
              <div className="bg-black/40 border border-gray-800 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Your Enrollments</h3>
                <p className="text-gray-400 text-sm">
                  We are processing your application. We will contact you soon with your class schedule.
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center text-red-400 hover:text-red-300 font-medium transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
