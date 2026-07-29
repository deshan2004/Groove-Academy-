import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const enrollRef = collection(db, "enrollments");
    const q = query(enrollRef, where("email", "==", email));
    
    const snapshot = await getDocs(q);
    const enrollments = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    }));

    // Optionally sort by createdAt manually if compound index is missing
    enrollments.sort((a: any, b: any) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.toMillis() - a.createdAt.toMillis();
    });

    return NextResponse.json({ success: true, data: enrollments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user enrollments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user enrollments" },
      { status: 500 }
    );
  }
}
