"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+94");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        userRole = email.toLowerCase() === "admin@stepup.com" ? "admin" : "user";
        
        // Save the new user to Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          firstName,
          lastName,
          phone: `${countryCode} ${phone}`,
          role: userRole,
          createdAt: serverTimestamp()
        });
      }
      
      // Determine redirection based on Firestore role
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-academy-black flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-academy-red/10 to-transparent z-0" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-academy-gray border border-gray-800 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : "Join the Academy"}
          </h2>
          <p className="text-gray-400">
            {isLogin ? "Sign in to access your dashboard" : "Create an account to start dancing"}
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                  <input
                    type="text"
                    required={!isLogin}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                  <input
                    type="text"
                    required={!isLogin}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-1/3 bg-academy-black border border-gray-700 rounded-lg px-2 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
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
                    required={!isLogin}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-2/3 bg-academy-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
                    placeholder="77 123 4567"
                  />
                </div>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-academy-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-academy-gold focus:ring-1 focus:ring-academy-gold transition-colors pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-academy-gold hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition-all"
          >
            {loading ? "Please wait..." : (isLogin ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-400 hover:text-academy-gold text-sm transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
