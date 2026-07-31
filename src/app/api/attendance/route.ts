import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, doc, query, where, serverTimestamp } from "firebase/firestore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");
  const date = searchParams.get("date");
  const studentEmail = searchParams.get("studentEmail");

  try {
    const attendanceRef = collection(db, "attendance");
    let q = query(attendanceRef);
    
    if (classId && date) {
      q = query(attendanceRef, where("classId", "==", classId), where("date", "==", date));
    } else if (studentEmail) {
      // Simple fetch for student dashboard (this would need a composite index in firestore ideally)
      q = query(attendanceRef, where("presentEmails", "array-contains", studentEmail));
    }
    
    const snapshot = await getDocs(q);
    const records = snapshot.docs.map(d => ({ _id: d.id, ...d.data() }));
    return NextResponse.json({ success: true, data: records }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch attendance" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // body: { classId, date, presentEmails: ["email1", "email2"], recordId?: string }
    
    if (body.recordId) {
      // Update existing record
      await updateDoc(doc(db, "attendance", body.recordId), {
        presentEmails: body.presentEmails,
        updatedAt: serverTimestamp(),
      });
      return NextResponse.json({ success: true, data: body }, { status: 200 });
    } else {
      // Create new record
      const docRef = await addDoc(collection(db, "attendance"), {
        classId: body.classId,
        date: body.date,
        presentEmails: body.presentEmails,
        createdAt: serverTimestamp(),
      });
      return NextResponse.json({ success: true, data: { _id: docRef.id, ...body } }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to mark attendance" }, { status: 500 });
  }
}
