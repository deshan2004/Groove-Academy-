"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
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

  const navLinks = [
    { name: "Home", href: "/" },
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
        scrolled ? "bg-academy-black/90 backdrop-blur-md py-4 shadow-lg shadow-black/50" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tighter text-academy-white">
              Step<span className="text-academy-gold">Up</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-academy-gold transition-colors font-medium text-sm tracking-wide uppercase"
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
                  className="flex items-center gap-2 text-academy-gold border border-academy-gold hover:bg-academy-gold hover:text-black px-6 py-2 rounded-full font-medium transition-all"
                >
                  <User className="w-4 h-4" />
                  {isAdmin ? "Admin" : "Account"}
                </Link>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-academy-gray border border-gray-800 rounded-xl shadow-2xl py-2 flex flex-col z-50 overflow-hidden">
                    <span className="px-4 py-3 text-xs text-gray-400 border-b border-gray-800 truncate">
                      {currentUser.email}
                    </span>
                    <Link href={isAdmin ? "/admin" : "/dashboard"} className="px-4 py-3 text-sm text-gray-300 hover:bg-academy-gold/10 hover:text-academy-gold transition-colors border-b border-gray-800">
                      {isAdmin ? "Admin Dashboard" : "My Dashboard"}
                    </Link>
                    <button
                      onClick={() => auth.signOut()}
                      className="px-4 py-3 text-sm text-red-400 hover:bg-red-900/30 text-left transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-academy-red hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-all shadow-[0_0_15px_rgba(198,40,40,0.5)] hover:shadow-[0_0_25px_rgba(198,40,40,0.8)]"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
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
          className="md:hidden bg-academy-gray border-t border-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-academy-gold block px-3 py-4 text-base font-medium border-b border-gray-800"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 px-3 border-t border-gray-800 mt-2">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="px-3 py-2 text-sm text-gray-400">
                    Logged in as: <br/>
                    <span className="text-white font-medium">{currentUser.email}</span>
                  </div>
                  
                  <Link
                    href={isAdmin ? "/admin" : "/dashboard"}
                    onClick={() => setIsOpen(false)}
                    className="w-full flex justify-center items-center gap-2 border border-academy-gold text-academy-gold hover:bg-academy-gold hover:text-black px-6 py-3 rounded-full font-medium transition-all"
                  >
                    <User className="w-5 h-5" />
                    {isAdmin ? "Admin Dashboard" : "My Dashboard"}
                  </Link>
                  
                  <button
                    onClick={() => {
                      auth.signOut();
                      setIsOpen(false);
                    }}
                    className="w-full flex justify-center text-red-400 hover:text-red-300 hover:bg-red-900/20 px-6 py-3 rounded-full font-medium transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex justify-center bg-academy-red hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition-all"
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
