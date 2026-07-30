"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

const EnrollmentSection = () => {
  const [formData, setFormData] = useState({
    student_name: "",
    age: "",
    phone: "",
    email: "",
    preferred_style: "Kandyan",
  });
  const [countryCode, setCountryCode] = useState("+94");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          age: parseInt(formData.age),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: "success",
          message: "Enrollment submitted successfully! We will contact you soon.",
        });
        setFormData({
          student_name: "",
          age: "",
          phone: "",
          email: "",
          preferred_style: "Kandyan",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again.",
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
    <section id="enroll" className="py-24 bg-academy-gray relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Join the <span className="text-academy-gold">Academy</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Take the first step towards mastering your rhythm. Fill out the form below to enroll.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-academy-black border border-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          {status.type && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                status.type === "success"
                  ? "bg-green-900/30 border border-green-500/50 text-green-400"
                  : "bg-red-900/30 border border-red-500/50 text-red-400"
              }`}
            >
              {status.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <p>{status.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  name="student_name"
                  required
                  value={formData.student_name}
                  onChange={handleChange}
                  className="w-full bg-academy-gray border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  required
                  min="5"
                  max="100"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full bg-academy-gray border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
                  placeholder="25"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-1/3 bg-academy-gray border border-gray-700 rounded-lg px-2 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
                  >
                    <option value="+94">+94 (LK)</option>
                    <option value="+1">+1 (US/CA)</option>
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
                    className="w-2/3 bg-academy-gray border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
                    placeholder="77 123 4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-academy-gray border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Dance Style</label>
              <select
                name="preferred_style"
                required
                value={formData.preferred_style}
                onChange={handleChange}
                className="w-full bg-academy-gray border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
              >
                <option value="Kandyan">Kandyan</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="Classical">Classical</option>
                <option value="Contemporary">Contemporary</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-academy-red hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(198,40,40,0.4)] hover:shadow-[0_0_30px_rgba(198,40,40,0.6)] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-[0_0_20px_rgba(198,40,40,0.4)] flex justify-center items-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>

          {/* Decorative Corner Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-academy-gold/10 rounded-bl-full -z-10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-academy-red/10 rounded-tr-full -z-10 blur-2xl"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnrollmentSection;
