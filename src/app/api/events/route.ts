import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

export async function GET() {
  try {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, orderBy("date", "asc"));
    const snapshot = await getDocs(q);
    
    const events = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: events }, { status: 200 });
  } catch (error: any) {
    // Fallback if index fails
    try {
      const eventsRef = collection(db, "events");
      const snapshot = await getDocs(eventsRef);
      const events = snapshot.docs.map(doc => ({
        _id: doc.id,
        ...doc.data()
      }));
      return NextResponse.json({ success: true, data: events }, { status: 200 });
    } catch (fallbackError) {
      console.error("Error fetching events:", fallbackError);
      return NextResponse.json(
        { success: false, error: "Failed to fetch events" },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const docRef = await addDoc(collection(db, "events"), {
      ...body,
      createdAt: serverTimestamp(),
    });
    
    return NextResponse.json(
      { success: true, data: { _id: docRef.id, ...body } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create event" },
      { status: 500 }
    );
  }
}
