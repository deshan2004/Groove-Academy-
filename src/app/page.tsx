"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import FeaturedClassesPreview from "@/components/FeaturedClassesPreview";
import CtaBanner from "@/components/CtaBanner";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists() && userDoc.data().role === "admin") {
            router.push("/admin");
            return;
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

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
