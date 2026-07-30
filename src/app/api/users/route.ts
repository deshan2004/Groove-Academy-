import { NextResponse } from "next/server";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const users = snapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
