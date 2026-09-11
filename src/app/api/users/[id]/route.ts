import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const newStatus = body.status ? body.status.toLowerCase() : "";

    if (!newStatus || !["approved", "rejected", "pending", "pending_approval"].includes(newStatus)) {
      return NextResponse.json(
        { success: false, error: "Invalid status provided" },
        { status: 400 }
      );
    }

    const docRef = doc(db, "users", id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      await updateDoc(docRef, { status: newStatus });
      const data = snap.data();
      if (data.email) {
        // Also update matching enrollments for this user's email
        const enrollRef = collection(db, "enrollments");
        const q = query(enrollRef, where("email", "==", data.email));
        const enrollSnap = await getDocs(q);
        for (const eDoc of enrollSnap.docs) {
          await updateDoc(doc(db, "enrollments", eDoc.id), { status: newStatus });
        }
      }
    }

    return NextResponse.json({ success: true, message: "User status updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update user status" },
      { status: 500 }
    );
  }
}
