import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.status || !["approved", "rejected", "pending"].includes(body.status.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: "Invalid status provided" },
        { status: 400 }
      );
    }

    const docRef = doc(db, "enrollments", id);
    await updateDoc(docRef, {
      status: body.status.toLowerCase()
    });

    return NextResponse.json({ success: true, message: "Status updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating enrollment status:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update status" },
      { status: 500 }
    );
  }
}
