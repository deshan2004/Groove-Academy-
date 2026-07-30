"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Mail, Phone, Calendar, UserCog, Shield, BookOpen, Plus, Edit, Trash2, X } from "lucide-react";

export default function AdminDashboard() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"enrollments" | "users" | "classes" | "inquiries">("enrollments");
  const [loading, setLoading] = useState(true);
  
  // Class Form State
  const [showClassModal, setShowClassModal] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [classForm, setClassForm] = useState({
    title: "",
    style: "Kandyan",
    day: "Monday",
    time: "",
    instructor_name: "",
    hall_no: "",
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and is admin
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/login");
      } else {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().role?.toLowerCase() === "admin") {
            fetchEnrollments();
          } else {
            router.push("/");
          }
        } catch (error) {
          router.push("/");
        }
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

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.success) {
        setRegisteredUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/classes");
      const data = await res.json();
      if (data.success) {
        setClasses(data.data);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "users" && registeredUsers.length === 0) {
      fetchUsers();
    }
    if (activeTab === "classes" && classes.length === 0) {
      fetchClasses();
    }
    if (activeTab === "inquiries" && inquiries.length === 0) {
      fetchInquiries();
    }
  }, [activeTab]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/enroll/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnrollments(enrollments.map(e => e._id === id ? { ...e, status: newStatus } : e));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSaveClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingClass ? "PUT" : "POST";
      const url = editingClass ? `/api/classes/${editingClass._id}` : "/api/classes";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(classForm)
      });
      
      if (res.ok) {
        setShowClassModal(false);
        setEditingClass(null);
        fetchClasses(); // Refresh list
      }
    } catch (error) {
      console.error("Error saving class:", error);
    }
  };

  const handleDeleteClass = async (id: string) => {
    if (!confirm("Are you sure you want to delete this class?")) return;
    try {
      const res = await fetch(`/api/classes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setClasses(classes.filter(c => c._id !== id));
      }
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const openClassModal = (cls: any = null) => {
    if (cls) {
      setEditingClass(cls);
      setClassForm({
        title: cls.title,
        style: cls.style,
        day: cls.day,
        time: cls.time,
        instructor_name: cls.instructor_name,
        hall_no: cls.hall_no,
      });
    } else {
      setEditingClass(null);
      setClassForm({
        title: "",
        style: "Kandyan",
        day: "Monday",
        time: "",
        instructor_name: "",
        hall_no: "",
      });
    }
    setShowClassModal(true);
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage student enrollments and applications.</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
            <div className="bg-academy-gray border border-gray-800 px-6 py-3 rounded-xl flex items-center gap-4 shadow-lg w-full sm:w-auto">
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
              className="bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-500/30 px-6 py-3 rounded-xl font-medium transition-all w-full sm:w-auto h-full"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8 border-b border-gray-800 pb-px">
          <button
            onClick={() => setActiveTab("enrollments")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "enrollments" 
                ? "text-academy-gold border-academy-gold" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Enrollments
            </div>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "users" 
                ? "text-academy-gold border-academy-gold" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <UserCog className="w-4 h-4" />
              Registered Students
            </div>
          </button>
          <button
            onClick={() => setActiveTab("classes")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "classes" 
                ? "text-academy-gold border-academy-gold" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Manage Classes
            </div>
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "inquiries" 
                ? "text-academy-gold border-academy-gold" 
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Inquiries
            </div>
          </button>
        </div>

        {activeTab === "enrollments" ? (
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
                  <th className="px-6 py-4 font-medium border-b border-gray-800 text-right">Actions</th>
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
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                          student.status === "approved" ? "bg-green-900/30 text-green-400 border-green-500/30" :
                          student.status === "rejected" ? "bg-red-900/30 text-red-400 border-red-500/30" :
                          "bg-yellow-900/30 text-yellow-400 border-yellow-500/30"
                        }`}>
                          {(student.status || "pending").toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {(!student.status || student.status === "pending") && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleUpdateStatus(student._id, "approved")}
                              className="text-xs bg-green-900/30 hover:bg-green-900/60 text-green-400 border border-green-500/30 px-3 py-1 rounded-md transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(student._id, "rejected")}
                              className="text-xs bg-red-900/30 hover:bg-red-900/60 text-red-400 border border-red-500/30 px-3 py-1 rounded-md transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        ) : (
        <motion.div
          key="users"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium border-b border-gray-800">User</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Contact</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Role</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {registeredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No registered users found.
                    </td>
                  </tr>
                ) : (
                  registeredUsers.map((user) => (
                    <tr key={user.uid} className="hover:bg-black/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-academy-black flex items-center justify-center text-academy-gold font-bold">
                            {(user.firstName || user.email)?.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {user.firstName || user.lastName ? `${user.firstName || ""} ${user.lastName || ""}` : "Unknown"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300 flex items-center gap-2 mb-1">
                          <Mail className="w-4 h-4 text-gray-500" /> {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-gray-300 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" /> {user.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.role === "admin" ? (
                          <span className="px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full bg-red-900/30 text-red-400 border border-red-500/30">
                            <Shield className="w-3 h-3" /> Admin
                          </span>
                        ) : (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                            Student
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {user.createdAt?.seconds 
                          ? new Date(user.createdAt.seconds * 1000).toLocaleDateString()
                          : "Unknown"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        ) : activeTab === "classes" ? (
        <motion.div
          key="classes"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Class Schedule</h2>
            <button
              onClick={() => openClassModal()}
              className="bg-academy-gold hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Class
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Title</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Style</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Schedule</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Instructor</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Hall</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {classes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No classes found. Add one to get started.
                    </td>
                  </tr>
                ) : (
                  classes.map((cls) => (
                    <tr key={cls._id} className="hover:bg-black/20 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{cls.title}</td>
                      <td className="px-6 py-4 text-academy-gold text-sm">{cls.style}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm">
                        {cls.day} <br />
                        <span className="text-gray-500">{cls.time}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{cls.instructor_name}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{cls.hall_no}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openClassModal(cls)}
                            className="p-2 bg-blue-900/30 text-blue-400 hover:bg-blue-900/60 rounded-md transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClass(cls._id)}
                            className="p-2 bg-red-900/30 text-red-400 hover:bg-red-900/60 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        ) : activeTab === "inquiries" ? (
        <motion.div
          key="inquiries"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-academy-gray border border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/50 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Sender</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Subject</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Message</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-800">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No inquiries found.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inq) => (
                    <tr key={inq._id} className="hover:bg-black/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">{inq.name}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                          <Mail className="w-3 h-3" /> {inq.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white text-sm font-medium">
                        {inq.subject}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                        {inq.message}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {inq.createdAt?.seconds 
                          ? new Date(inq.createdAt.seconds * 1000).toLocaleDateString()
                          : "Unknown"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        ) : null}

        {/* Class Modal */}
        {showClassModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-academy-gray border border-gray-800 rounded-2xl w-full max-w-lg p-6 relative"
            >
              <button 
                onClick={() => setShowClassModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingClass ? "Edit Class" : "Add New Class"}
              </h2>
              
              <form onSubmit={handleSaveClass} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Class Title</label>
                  <input
                    type="text"
                    required
                    value={classForm.title}
                    onChange={(e) => setClassForm({...classForm, title: e.target.value})}
                    className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                    placeholder="e.g. Beginner Hip-Hop"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Dance Style</label>
                    <select
                      value={classForm.style}
                      onChange={(e) => setClassForm({...classForm, style: e.target.value})}
                      className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                    >
                      <option value="Kandyan">Kandyan</option>
                      <option value="Hip-Hop">Hip-Hop</option>
                      <option value="Classical">Classical</option>
                      <option value="Contemporary">Contemporary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Instructor</label>
                    <input
                      type="text"
                      required
                      value={classForm.instructor_name}
                      onChange={(e) => setClassForm({...classForm, instructor_name: e.target.value})}
                      className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Day</label>
                    <select
                      value={classForm.day}
                      onChange={(e) => setClassForm({...classForm, day: e.target.value})}
                      className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                    >
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                    <input
                      type="text"
                      required
                      value={classForm.time}
                      onChange={(e) => setClassForm({...classForm, time: e.target.value})}
                      className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                      placeholder="18:00 - 19:30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Hall No.</label>
                    <input
                      type="text"
                      required
                      value={classForm.hall_no}
                      onChange={(e) => setClassForm({...classForm, hall_no: e.target.value})}
                      className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-academy-gold focus:ring-1 focus:ring-academy-gold"
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end gap-3 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowClassModal(false)}
                    className="px-4 py-2 rounded-lg font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-academy-gold hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    {editingClass ? "Save Changes" : "Create Class"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
