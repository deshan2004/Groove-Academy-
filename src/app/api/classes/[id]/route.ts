import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const classRef = doc(db, "classes", id);
    const classSnap = await getDoc(classRef);
    
    if (!classSnap.exists()) {
      return NextResponse.json({ success: false, error: "Class not found" }, { status: 404 });
    }

    await updateDoc(classRef, body);
    
    return NextResponse.json({ success: true, message: "Class updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating class:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update class" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const classRef = doc(db, "classes", id);
    const classSnap = await getDoc(classRef);
    
    if (!classSnap.exists()) {
      return NextResponse.json({ success: false, error: "Class not found" }, { status: 404 });
    }

    await deleteDoc(classRef);
    
    return NextResponse.json({ success: true, message: "Class deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting class:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete class" },
      { status: 500 }
    );
  }
}
