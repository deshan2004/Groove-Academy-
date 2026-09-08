"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import FeaturedClassesPreview from "@/components/FeaturedClassesPreview";
import RentalsSection from "@/components/RentalsSection";
import CtaBanner from "@/components/CtaBanner";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists() && userDoc.data().role?.toLowerCase() === "admin") {
            router.push("/admin");
            return;
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="bg-[#090410] min-h-screen"></div>;

  return (
    <div className="bg-[#090410] text-[#f8f5ff] min-h-screen">
      <Hero />
      <FeaturesSection />
      <FeaturedClassesPreview />
      <CtaBanner />
    </div>
  );
}

