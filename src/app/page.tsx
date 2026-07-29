"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import FeaturedClassesPreview from "@/components/FeaturedClassesPreview";
import CtaBanner from "@/components/CtaBanner";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="bg-academy-black min-h-screen"></div>;

  return (
    <div className="bg-academy-black text-academy-white">
      <Hero />
      {user && (
        <>
          <FeaturesSection />
          <FeaturedClassesPreview />
          <CtaBanner />
        </>
      )}
    </div>
  );
}
