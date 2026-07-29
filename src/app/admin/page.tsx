"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Mail, Phone, Calendar } from "lucide-react";

export default function AdminDashboard() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and is admin
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user || user.email?.toLowerCase() !== "admin@stepup.com") {
        router.push("/login");
      } else {
        fetchEnrollments();
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchEnrollments = async () => {
    try {
      const res = await fetch("/api/enroll");
      const data = await res.json();
      if (data.success) {
        setEnrollments(data.data);
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    } finally {
      setLoading(false);
    }
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
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage student enrollments and applications.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-academy-gray border border-gray-800 px-6 py-3 rounded-xl flex items-center gap-4 shadow-lg">
              <div className="p-3 bg-academy-gold/10 rounded-lg">
                <Users className="text-academy-gold w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Enrollments</p>
                <p className="text-2xl font-bold text-white">{enrollments.length}</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                auth.signOut();
                router.push("/login");
              }}
              className="bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-500/30 px-6 py-3 rounded-xl font-medium transition-all h-full"
            >
              Sign Out
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Student</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Contact</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Age</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Style</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {enrollments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No enrollments found yet.
                    </td>
                  </tr>
                ) : (
                  enrollments.map((student) => (
                    <tr key={student._id} className="hover:bg-black/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-academy-black flex items-center justify-center text-academy-gold font-bold">
                            {student.student_name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{student.student_name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300 flex items-center gap-2 mb-1">
                          <Mail className="w-4 h-4 text-gray-500" /> {student.email}
                        </div>
                        <div className="text-sm text-gray-300 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" /> {student.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{student.age} yrs</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-academy-gold/10 text-academy-gold border border-academy-gold/20">
                          {student.preferred_style}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900/30 text-green-400 border border-green-500/30">
                          {student.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
