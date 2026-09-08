"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().role?.toLowerCase() === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (e) {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  // Hide top header navbar on Home page
  if (pathname === "/") {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact" },
    ...(currentUser ? [
      { name: "Classes", href: "/classes" },
      { name: "Enroll", href: "/enroll" },
      { name: "Gallery", href: "/gallery" },
      { name: "Instructors", href: "/instructors" },
    ] : []),
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#090410]/90 backdrop-blur-xl py-4 border-b border-purple-900/40 shadow-[0_10px_30px_rgba(9,4,16,0.9)]"
          : "bg-transparent py-6"
      }`}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-fuchsia-600 to-purple-400 flex items-center justify-center font-black text-white text-lg shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-transform">
              R
            </div>
            <span className="text-2xl font-extrabold tracking-widest text-metallic-purple uppercase">
              RIGA <span className="text-purple-400 font-light text-sm tracking-normal block -mt-1 opacity-90">Dance Academy</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-purple-200/80 hover:text-fuchsia-300 hover:drop-shadow-[0_0_10px_rgba(232,121,249,0.8)] transition-all font-medium text-xs tracking-widest uppercase"
              >
                {link.name}
              </Link>
            ))}
            
            {currentUser ? (
              <div 
                className="relative" 
                onMouseEnter={() => setShowDropdown(true)} 
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Link
                  href={isAdmin ? "/admin" : "/dashboard"}
                  className="flex items-center gap-2 text-purple-300 border border-purple-500/50 hover:bg-purple-600 hover:text-white px-6 py-2 rounded-full font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                >
                  <User className="w-4 h-4 text-fuchsia-400" />
                  {isAdmin ? "Admin" : "Account"}
                </Link>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#140924] border border-purple-500/30 rounded-2xl shadow-[0_0_30px_rgba(9,4,16,0.9)] py-2 flex flex-col z-50 overflow-hidden backdrop-blur-xl">
                    <span className="px-4 py-3 text-xs text-purple-300/70 border-b border-purple-900/40 truncate">
                      {currentUser.email}
                    </span>
                    <Link href={isAdmin ? "/admin" : "/dashboard"} className="px-4 py-3 text-sm text-purple-100 hover:bg-purple-600/20 hover:text-fuchsia-300 transition-colors border-b border-purple-900/40">
                      {isAdmin ? "Admin Dashboard" : "My Dashboard"}
                    </Link>
                    <button
                      onClick={() => auth.signOut()}
                      className="px-4 py-3 text-sm text-red-400 hover:bg-red-950/30 text-left transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white px-6 py-2 rounded-full font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(232,121,249,0.7)] border border-fuchsia-400/30"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-purple-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-[#140924] border-t border-purple-900/50 backdrop-blur-xl"
        >
          <div className="px-4 pt-3 pb-5 space-y-1 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-purple-200/90 hover:text-fuchsia-400 block px-3 py-3.5 text-base font-medium border-b border-purple-900/30 uppercase tracking-wider text-xs"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 px-1 border-t border-purple-900/40 mt-2">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="px-3 py-2 text-xs text-purple-300/70">
                    Logged in as: <br/>
                    <span className="text-purple-100 font-medium text-sm">{currentUser.email}</span>
                  </div>
                  
                  <Link
                    href={isAdmin ? "/admin" : "/dashboard"}
                    onClick={() => setIsOpen(false)}
                    className="w-full flex justify-center items-center gap-2 border border-purple-500/50 text-purple-200 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-full font-medium transition-all text-sm uppercase tracking-wider"
                  >
                    <User className="w-4 h-4 text-fuchsia-400" />
                    {isAdmin ? "Admin Dashboard" : "My Dashboard"}
                  </Link>
                  
                  <button
                    onClick={() => {
                      auth.signOut();
                      setIsOpen(false);
                    }}
                    className="w-full flex justify-center text-red-400 hover:text-red-300 hover:bg-red-950/20 px-6 py-3 rounded-full font-medium transition-all text-sm uppercase tracking-wider"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex justify-center bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-700 hover:from-purple-500 hover:to-fuchsia-500 text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

