"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, UserPlus, LogIn, Send, Upload, CreditCard, Building, FileText, Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function EnrollmentSection({ initialMode = "signup" }: { initialMode?: "signin" | "signup" }) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(initialMode);
  const router = useRouter();

  // Sign In State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Sign Up / Enrollment State
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
  const [signupLoading, setSignupLoading] = useState(false);

  // Notification Status
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

  // Handle Sign In Submit
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      const userRole = userDoc.exists() ? userDoc.data().role?.toLowerCase() : "user";

      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setStatus({ type: "error", message: "Invalid email or password. Please try again." });
      } else {
        setStatus({ type: "error", message: err.message || "Sign In failed. Please try again." });
      }
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Sign Up / Enrollment Submit
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setStatus({ type: null, message: "" });

    if (!paymentSlip && !formData.transaction_ref) {
      setStatus({
        type: "error",
        message: "Please upload your bank payment slip or enter the payment transaction reference number to proceed.",
      });
      setSignupLoading(false);
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
          message: "Registration & Payment Slip submitted! Your application is pending Admin approval. Upon verification, your login credentials will be dispatched via Phone/Email.",
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
          message: data.error || "Failed to submit registration. Please check your details and try again.",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Network error. Please try again later.",
      });
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <section id="enroll" className="py-16 bg-[#090410] relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide mb-3"
          >
            RIGA Student <span className="text-metallic-purple">Portal & Registration</span>
          </motion.h1>
          <p className="text-purple-200/70 max-w-xl mx-auto text-sm sm:text-base font-light">
            Sign in to your student dashboard or submit a new student registration with bank payment slip.
          </p>
        </div>

        {/* MAIN CARD WITH TAB SWITCHER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#140924] border border-purple-900/50 p-6 sm:p-10 rounded-3xl shadow-[0_0_50px_rgba(9,4,16,0.9)] relative overflow-hidden max-w-3xl mx-auto"
        >
          {/* TAB BUTTONS (SIGN IN | SIGN UP) */}
          <div className="flex bg-[#090410] p-1.5 rounded-2xl border border-purple-900/60 mb-8">
            <button
              type="button"
              onClick={() => { setActiveTab("signin"); setStatus({ type: null, message: "" }); }}
              className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === "signin"
                  ? "bg-gradient-to-r from-purple-800 to-fuchsia-800 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  : "text-purple-300/60 hover:text-white"
              }`}
            >
              <LogIn className="w-4 h-4 text-fuchsia-400" />
              Sign In (Existing Member)
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab("signup"); setStatus({ type: null, message: "" }); }}
              className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === "signup"
                  ? "bg-gradient-to-r from-purple-800 to-fuchsia-800 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  : "text-purple-300/60 hover:text-white"
              }`}
            >
              <UserPlus className="w-4 h-4 text-fuchsia-400" />
              Sign Up (New Registration)
            </button>
          </div>

          {/* STATUS NOTIFICATION ALERT */}
          {status.type && (
            <div
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
                status.type === "success"
                  ? "bg-green-950/60 border border-green-500/50 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                  : "bg-red-950/60 border border-red-500/50 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
              }`}
            >
              {status.type === "success" ? <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-400" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />}
              <p>{status.message}</p>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 1: SIGN IN FORM */}
          {/* ========================================================= */}
          {activeTab === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-5">
              <div className="text-center mb-6">
                <h3 className="text-xl font-black uppercase text-white mb-1">Student / Admin Sign In</h3>
                <p className="text-xs text-purple-300/70 font-light">Access your classes, timetable & attendance portal</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#090410] border border-purple-900/60 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                    placeholder="student@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#090410] border border-purple-900/60 rounded-xl pl-10 pr-10 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-0.5 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_45px_rgba(232,121,249,0.8)] border border-fuchsia-400/40 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
              >
                {loginLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <LogIn className="w-4 h-4 text-fuchsia-300" />
                  </>
                )}
              </button>

              <div className="text-center pt-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className="text-xs text-purple-300/80 hover:text-fuchsia-300 font-semibold"
                >
                  New student? Click here to Sign Up & Upload Payment Slip &rarr;
                </button>
              </div>
            </form>
          )}

          {/* ========================================================= */}
          {/* TAB 2: SIGN UP / NEW STUDENT REGISTRATION & SLIP FORM */}
          {/* ========================================================= */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-black uppercase text-white mb-1">New Student Registration</h3>
                <p className="text-xs text-purple-300/70 font-light">Deposit fees, upload bank slip & get Admin approval</p>
              </div>

              {/* BANK DETAILS SHOWCASE */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#180930] via-[#210c42] to-[#180930] border border-purple-800/60">
                <div className="flex items-center gap-2 mb-3 text-fuchsia-300 font-extrabold text-xs uppercase tracking-wider">
                  <Building className="w-4 h-4 text-fuchsia-400" />
                  Official RIGA Bank Details
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-[#090410]/80 p-2.5 rounded-lg border border-purple-900/40">
                    <span className="text-purple-400/60 block text-[9px] uppercase font-bold">Bank</span>
                    <span className="text-white font-bold">Commercial Bank</span>
                  </div>
                  <div className="bg-[#090410]/80 p-2.5 rounded-lg border border-purple-900/40">
                    <span className="text-purple-400/60 block text-[9px] uppercase font-bold">Account Name</span>
                    <span className="text-white font-bold">RIGA Dance Academy</span>
                  </div>
                  <div className="bg-[#090410]/80 p-2.5 rounded-lg border border-purple-900/40">
                    <span className="text-purple-400/60 block text-[9px] uppercase font-bold">Account No.</span>
                    <span className="text-fuchsia-300 font-black tracking-wider">8002 9384 1029</span>
                  </div>
                  <div className="bg-[#090410]/80 p-2.5 rounded-lg border border-purple-900/40">
                    <span className="text-purple-400/60 block text-[9px] uppercase font-bold">Branch</span>
                    <span className="text-white font-bold">Colombo Main</span>
                  </div>
                </div>
              </div>

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

              {/* Row 3: City & Dance Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 placeholder:text-purple-400/40"
                    placeholder="e.g. Colombo"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-2">
                    Preferred Dance Style *
                  </label>
                  <select
                    name="preferred_style"
                    required
                    value={formData.preferred_style}
                    onChange={handleChange}
                    className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90"
                  >
                    <option value="Kandyan Traditional">Kandyan Traditional</option>
                    <option value="Pahatharata Low-Country">Pahatharata Low-Country</option>
                    <option value="Sabaragamuwa Dance">Sabaragamuwa Dance</option>
                    <option value="Urban Hip-Hop">Urban Hip-Hop</option>
                    <option value="Contemporary Flow">Contemporary Flow</option>
                    <option value="Latin & Ballroom">Latin & Ballroom</option>
                    <option value="Bollywood Fusion">Bollywood Fusion</option>
                  </select>
                </div>
              </div>

              {/* PAYMENT SLIP UPLOAD */}
              <div className="p-5 rounded-2xl bg-[#090410]/90 border border-purple-800/60 space-y-4">
                <div className="flex items-center gap-2 text-fuchsia-300 font-bold text-xs uppercase tracking-wider">
                  <CreditCard className="w-4 h-4 text-fuchsia-400" />
                  Upload Payment Slip / Reference *
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-purple-200/80 mb-2">
                      Bank Transfer Slip Image *
                    </label>
                    <label className="flex flex-col items-center justify-center p-3.5 border-2 border-dashed border-purple-800/60 rounded-xl cursor-pointer hover:border-purple-500/80 hover:bg-purple-950/30 transition-all text-center">
                      <Upload className="w-5 h-5 text-fuchsia-400 mb-1" />
                      <span className="text-xs text-purple-200/90 font-medium">
                        {paymentSlipName ? paymentSlipName : "Click to Upload Slip"}
                      </span>
                      <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-purple-200/80 mb-2">
                      Transaction Reference Number
                    </label>
                    <input
                      type="text"
                      name="transaction_ref"
                      value={formData.transaction_ref}
                      onChange={handleChange}
                      className="w-full bg-[#140924] border border-purple-900/60 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/90 placeholder:text-purple-400/40"
                      placeholder="e.g. REF-98341029"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={signupLoading}
                className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-0.5 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_45px_rgba(232,121,249,0.8)] border border-fuchsia-400/40 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {signupLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
                ) : (
                  <>
                    <span>Submit Student Registration & Payment Slip</span>
                    <Send className="w-4 h-4 text-fuchsia-300" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
