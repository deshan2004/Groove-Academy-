import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    if (
      !body.student_name ||
      !body.age ||
      !body.phone ||
      !body.email ||
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
