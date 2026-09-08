"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, UserPlus, Sparkles, Send, Upload, CreditCard, Building, ShieldCheck, FileText } from "lucide-react";

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
    transaction_ref: "",
    notes: "",
  });
  const [countryCode, setCountryCode] = useState("+94");
  const [paymentSlip, setPaymentSlip] = useState<string>("");
  const [paymentSlipName, setPaymentSlipName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentSlipName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentSlip(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    if (!paymentSlip && !formData.transaction_ref) {
      setStatus({
        type: "error",
        message: "Please upload your bank payment slip or enter the payment transaction reference number to proceed.",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: `${countryCode} ${formData.phone}`,
          age: parseInt(formData.age) || 0,
          payment_slip: paymentSlip,
          payment_slip_name: paymentSlipName,
          status: "pending_approval",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: "success",
          message: "Registration & Payment Slip submitted! Your application is pending Admin approval. Upon verification, your login password will be dispatched to your phone/email.",
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
          transaction_ref: "",
          notes: "",
        });
        setPaymentSlip("");
        setPaymentSlipName("");
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
            New Student Registration & Payment Slip
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide mb-4"
          >
            New Student <span className="text-metallic-purple">Enrollment & Slip</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-purple-200/70 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed"
          >
            Deposit admission fees to RIGA official bank account, attach your payment slip below, and complete registration for Admin approval.
          </motion.p>
        </div>

        {/* BANK DETAILS SHOWCASE CARD */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#180930] via-[#210c42] to-[#180930] border border-purple-800/60 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <div className="flex items-center gap-3 mb-4 text-fuchsia-300 font-extrabold text-sm uppercase tracking-wider">
            <Building className="w-5 h-5 text-fuchsia-400" />
            Official RIGA Bank Transfer Details
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#090410]/80 p-3.5 rounded-xl border border-purple-900/40">
              <span className="text-purple-400/60 block uppercase font-semibold text-[10px] mb-1">Bank Name</span>
              <span className="text-white font-bold text-sm">Commercial Bank</span>
            </div>
            <div className="bg-[#090410]/80 p-3.5 rounded-xl border border-purple-900/40">
              <span className="text-purple-400/60 block uppercase font-semibold text-[10px] mb-1">Account Name</span>
              <span className="text-white font-bold text-sm">RIGA Dance Academy</span>
            </div>
            <div className="bg-[#090410]/80 p-3.5 rounded-xl border border-purple-900/40">
              <span className="text-purple-400/60 block uppercase font-semibold text-[10px] mb-1">Account Number</span>
              <span className="text-fuchsia-300 font-black text-sm tracking-wider">8002 9384 1029</span>
            </div>
            <div className="bg-[#090410]/80 p-3.5 rounded-xl border border-purple-900/40">
              <span className="text-purple-400/60 block uppercase font-semibold text-[10px] mb-1">Branch</span>
              <span className="text-white font-bold text-sm">Colombo Main</span>
            </div>
          </div>
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

            {/* Row 4: Dance Style & Studio Batch */}
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
                  Studio Branch & Batch *
                </label>
                <select
                  name="preferred_branch"
                  required
                  value={formData.preferred_branch}
                  onChange={handleChange}
                  className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all"
                >
                  <option value="Colombo Main Studio - Weekend Morning">Colombo Main Studio - Weekend Morning</option>
                  <option value="Colombo Main Studio - Weekday Evening">Colombo Main Studio - Weekday Evening</option>
                  <option value="Kandy Regional Studio - Weekend">Kandy Regional Studio - Weekend</option>
                  <option value="Online Virtual Masterclass">Online Virtual Masterclass</option>
                </select>
              </div>
            </div>

            {/* PAYMENT SLIP UPLOAD & TRANSACTION REFERENCE */}
            <div className="p-6 rounded-2xl bg-[#090410]/90 border border-purple-800/60 space-y-4">
              <div className="flex items-center gap-2 text-fuchsia-300 font-bold text-xs uppercase tracking-wider">
                <CreditCard className="w-4 h-4 text-fuchsia-400" />
                Bank Payment Verification & Slip Upload *
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* File Upload */}
                <div>
                  <label className="block text-[11px] font-semibold text-purple-200/80 mb-2">
                    Upload Bank Transfer Slip (Image/PDF)
                  </label>
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-purple-800/60 rounded-xl cursor-pointer hover:border-purple-500/80 hover:bg-purple-950/30 transition-all text-center">
                    <Upload className="w-6 h-6 text-fuchsia-400 mb-2" />
                    <span className="text-xs text-purple-200/90 font-medium">
                      {paymentSlipName ? paymentSlipName : "Click to Upload Slip Image"}
                    </span>
                    <span className="text-[10px] text-purple-400/50 mt-1">PNG, JPG, JPEG, PDF up to 5MB</span>
                    <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                {/* Transaction Ref Number */}
                <div>
                  <label className="block text-[11px] font-semibold text-purple-200/80 mb-2">
                    Bank Reference / Transaction ID Number
                  </label>
                  <input
                    type="text"
                    name="transaction_ref"
                    value={formData.transaction_ref}
                    onChange={handleChange}
                    className="w-full bg-[#140924] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 placeholder:text-purple-400/40"
                    placeholder="e.g. REF-98341029"
                  />
                  <p className="text-[10px] text-purple-300/60 mt-2 leading-relaxed">
                    Provide your bank deposit reference number or upload slip image above for fast Admin approval.
                  </p>
                </div>
              </div>

              {paymentSlip && (
                <div className="mt-3 p-3 bg-purple-950/60 rounded-xl border border-purple-700/50 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-fuchsia-400" />
                  <span className="text-xs text-purple-200 truncate font-mono">{paymentSlipName} Attached</span>
                  <span className="text-[10px] text-green-400 font-bold uppercase ml-auto">Ready</span>
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                placeholder="Mention any prior dance background or questions..."
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
                  <span>Submit Registration & Payment Slip</span>
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
