"use client";

import { useEffect, useState } from "react";
import EnrollmentSection from "@/components/EnrollmentSection";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function EnrollPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="bg-academy-black min-h-screen"></div>;

  return (
    <div className="pt-24 bg-academy-black min-h-screen">
      <EnrollmentSection />
    </div>
  );
}
