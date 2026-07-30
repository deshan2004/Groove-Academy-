import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

export async function GET() {
  try {
    const enrollRef = collection(db, "enrollments");
    const q = query(enrollRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const enrollments = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: enrollments }, { status: 200 });
  } catch (error: any) {
    try {
      // Fallback if index doesn't exist
      const enrollRef = collection(db, "enrollments");
      const snapshot = await getDocs(enrollRef);
      const enrollments = snapshot.docs.map(doc => ({
        _id: doc.id,
        ...doc.data()
      }));
      return NextResponse.json({ success: true, data: enrollments }, { status: 200 });
    } catch (fallbackError) {
      console.error("Error fetching enrollments:", fallbackError);
      return NextResponse.json(
        { success: false, error: "Failed to fetch enrollments" },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    if (
      !body.student_name ||
      !body.age ||
      !body.phone ||
      !body.email ||
      !body.location ||
      !body.preferred_style
    ) {
      return NextResponse.json(
        { success: false, error: "Please provide all required fields" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "enrollments"), {
      ...body,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    return NextResponse.json(
      { success: true, data: { _id: docRef.id, ...body, status: "pending" } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting enrollment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit enrollment" },
      { status: 500 }
    );
  }
}
