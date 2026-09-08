"use client";

import { useEffect, useState } from "react";
import ClassSchedule from "@/components/ClassSchedule";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ClassesPage() {
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
      <ClassSchedule />
    </div>
  );
}
