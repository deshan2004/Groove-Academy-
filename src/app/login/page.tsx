"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, LogIn, UserPlus, Sparkles, CheckCircle2 } from "lucide-react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+94");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preferredStyle, setPreferredStyle] = useState("Kandyan Traditional");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let userRole = "user";

      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Fetch role from Firestore
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        if (userDoc.exists()) {
          userRole = userDoc.data().role?.toLowerCase() || "user";
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        userRole = email.toLowerCase() === "admin@riga.com" ? "admin" : "user";
        
        // Save the new user to Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          firstName,
          lastName,
          phone: `${countryCode} ${phone}`,
          preferredStyle,
          role: userRole,
          createdAt: serverTimestamp()
        });
      }
      
      // Determine redirection based on Firestore role
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password. Please check your details.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please Sign In.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters long.");
      } else {
        setError(err.message || "Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090410] text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-900/15 rounded-full blur-[180px] pointer-events-none" />

      {/* Top Back Link */}
      <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:text-white hover:border-purple-500/60 transition-all text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
          <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
          Back to Home
        </Link>
      </div>

      {/* Main Auth Form Container */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center z-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-[#140924] border border-purple-900/50 p-6 sm:p-8 rounded-3xl shadow-[0_0_50px_rgba(9,4,16,0.9)] relative"
        >
          {/* TAB SWITCHER (SIGN IN vs SIGN UP) */}
          <div className="flex bg-[#090410] p-1.5 rounded-2xl border border-purple-900/60 mb-8">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setError(""); }}
              className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                isLogin
                  ? "bg-gradient-to-r from-purple-800 to-fuchsia-800 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  : "text-purple-300/60 hover:text-white"
              }`}
            >
              <LogIn className="w-4 h-4 text-fuchsia-400" />
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setError(""); }}
              className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                !isLogin
                  ? "bg-gradient-to-r from-purple-800 to-fuchsia-800 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  : "text-purple-300/60 hover:text-white"
              }`}
            >
              <UserPlus className="w-4 h-4 text-fuchsia-400" />
              Sign Up
            </button>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-black uppercase tracking-wide text-white mb-1">
              {isLogin ? "Welcome Back to RIGA" : "Join RIGA Academy"}
            </h2>
            <p className="text-xs text-purple-200/70 font-light">
              {isLogin ? "Sign in to access your student portal & attendance" : "Create a new account to join classes & events"}
            </p>
          </div>

          {error && (
            <div className="bg-red-950/60 border border-red-500/50 text-red-300 p-3.5 rounded-xl mb-6 text-xs font-medium shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-1.5">First Name *</label>
                    <input
                      type="text"
                      required={!isLogin}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-1.5">Last Name *</label>
                    <input
                      type="text"
                      required={!isLogin}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-1.5">Phone Number *</label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-1/3 bg-[#090410] border border-purple-900/60 rounded-xl px-2 py-2.5 text-white text-xs font-medium focus:outline-none focus:border-purple-500/90"
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
                      required={!isLogin}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-2/3 bg-[#090410] border border-purple-900/60 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                      placeholder="77 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-1.5">Preferred Style</label>
                  <select
                    value={preferredStyle}
                    onChange={(e) => setPreferredStyle(e.target.value)}
                    className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all"
                  >
                    <option value="Kandyan Traditional">Kandyan Traditional</option>
                    <option value="Urban Hip-Hop">Urban Hip-Hop</option>
                    <option value="Contemporary Flow">Contemporary Flow</option>
                    <option value="Latin & Ballroom">Latin & Ballroom</option>
                    <option value="Bollywood Fusion">Bollywood Fusion</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-400/40"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/90 mb-1.5">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#090410] border border-purple-900/60 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500/90 focus:ring-1 focus:ring-purple-500/50 transition-all pr-10 placeholder:text-purple-400/40"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-0.5 shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(232,121,249,0.7)] border border-fuchsia-400/30 disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
              ) : isLogin ? (
                <>
                  <span>Sign In</span>
                  <LogIn className="w-4 h-4 text-fuchsia-300" />
                </>
              ) : (
                <>
                  <span>Create Student Account</span>
                  <UserPlus className="w-4 h-4 text-fuchsia-300" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-purple-900/40 text-center">
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="text-xs text-purple-300/80 hover:text-fuchsia-300 transition-colors font-medium"
            >
              {isLogin ? "Don't have an account? Click here to Sign Up" : "Already registered? Click here to Sign In"}
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
