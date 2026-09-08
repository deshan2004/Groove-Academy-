"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, UserPlus, Sparkles, Send, GraduationCap } from "lucide-react";

export default function EnrollmentSection() {
  const [formData, setFormData] = useState({
    student_name: "",
    age: "",
    phone: "",
    email: "",
    emergency_contact: "",
    location: "",
    preferred_style: "Kandyan Traditional",
    skill_level: "Beginner",
    preferred_branch: "Colombo Main Studio - Weekend Morning",
    notes: "",
  });
  const [countryCode, setCountryCode] = useState("+94");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: `${countryCode} ${formData.phone}`,
          age: parseInt(formData.age) || 0,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: "success",
          message: "Registration submitted successfully! Our admissions coordinator will contact you via Phone/Email with your orientation schedule.",
        });
        setFormData({
          student_name: "",
          age: "",
          phone: "",
          email: "",
          emergency_contact: "",
          location: "",
          preferred_style: "Kandyan Traditional",
          skill_level: "Beginner",
          preferred_branch: "Colombo Main Studio - Weekend Morning",
          notes: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to submit registration. Please verify your details and try again.",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Network error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enroll" className="py-16 bg-[#090410] relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/50 text-fuchsia-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
          >
            <UserPlus className="w-4 h-4 text-fuchsia-400" />
            New Student Registration Form
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide mb-4"
          >
            New Student <span className="text-metallic-purple">Enrollment</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-purple-200/70 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed"
          >
            Register as an official student at RIGA Dance Academy. Fill out the registration form below to reserve your slot.
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#140924] border border-purple-900/50 p-6 sm:p-10 rounded-3xl shadow-[0_0_50px_rgba(9,4,16,0.9)] relative overflow-hidden"
        >
          {status.type && (
            <div
              className={`mb-8 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
                status.type === "success"
                  ? "bg-green-950/60 border border-green-500/50 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                  : "bg-red-950/60 border border-red-500/50 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
              }`}
            >
              {status.type === "success" ? <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-400" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />}
              <p>{status.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Student Name & Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                  Full Name of Student *
                </label>
                <input
                  type="text"
                  name="student_name"
                  required
                  value={formData.student_name}
                  onChange={handleChange}
                  className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                  placeholder="e.g. Ama Perera"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  min="4"
                  max="90"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                  placeholder="e.g. 18"
                />
              </div>
            </div>

            {/* Row 2: Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                  Contact Phone Number *
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-1/3 bg-[#090410] border border-purple-900/60 rounded-xl px-2 py-3 text-white text-xs font-medium focus:outline-none focus:border-purple-500/90"
                  >
                    <option value="+94">+94 (LK)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (AU)</option>
                    <option value="+91">+91 (IN)</option>
                    <option value="+971">+971 (UAE)</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-2/3 bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                    placeholder="77 123 4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                  placeholder="student@example.com"
                />
              </div>
            </div>

            {/* Row 3: City Location & Emergency Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                  City / Town *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                  placeholder="e.g. Colombo / Kandy / Negombo"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                  Parent / Emergency Contact Name
                </label>
                <input
                  type="text"
                  name="emergency_contact"
                  value={formData.emergency_contact}
                  onChange={handleChange}
                  className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                  placeholder="e.g. Parent / Guardian Name"
                />
              </div>
            </div>

            {/* Row 4: Dance Style & Skill Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                  Preferred Dance Style *
                </label>
                <select
                  name="preferred_style"
                  required
                  value={formData.preferred_style}
                  onChange={handleChange}
                  className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all"
                >
                  <option value="Kandyan Traditional">Kandyan Traditional</option>
                  <option value="Pahatharata Low-Country">Pahatharata Low-Country</option>
                  <option value="Sabaragamuwa Dance">Sabaragamuwa Dance</option>
                  <option value="Urban Hip-Hop">Urban Hip-Hop</option>
                  <option value="Contemporary Flow">Contemporary Flow</option>
                  <option value="Latin & Ballroom">Latin & Ballroom</option>
                  <option value="Bollywood Fusion">Bollywood Fusion</option>
                  <option value="Junior Kids Dance">Junior Kids Dance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                  Experience Level *
                </label>
                <select
                  name="skill_level"
                  required
                  value={formData.skill_level}
                  onChange={handleChange}
                  className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all"
                >
                  <option value="Beginner">Beginner (No prior experience)</option>
                  <option value="Intermediate">Intermediate (1-2 years experience)</option>
                  <option value="Advanced">Advanced (3+ years experience)</option>
                  <option value="Pro Troupe">Pro Troupe Candidate</option>
                </select>
              </div>
            </div>

            {/* Row 5: Studio Branch / Schedule */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                Preferred Studio Branch & Batch *
              </label>
              <select
                name="preferred_branch"
                required
                value={formData.preferred_branch}
                onChange={handleChange}
                className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all"
              >
                <option value="Colombo Main Studio - Weekend Morning">Colombo Main Studio - Weekend Morning Batch</option>
                <option value="Colombo Main Studio - Weekday Evening">Colombo Main Studio - Weekday Evening Batch</option>
                <option value="Kandy Regional Studio - Weekend">Kandy Regional Studio - Weekend Batch</option>
                <option value="Online Virtual Masterclass">Online Virtual Masterclass</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                Additional Notes / Questions (Optional)
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                placeholder="Mention any prior dance background, health conditions, or questions..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-0.5 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_45px_rgba(232,121,249,0.8)] border border-fuchsia-400/40 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
              ) : (
                <>
                  <span>Submit Registration Application</span>
                  <Send className="w-4 h-4 text-fuchsia-300" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
