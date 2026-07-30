import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

export async function GET() {
  try {
    const inquiriesRef = collection(db, "inquiries");
    const q = query(inquiriesRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const inquiries = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: inquiries }, { status: 200 });
  } catch (error: any) {
    // Fallback if index fails
    try {
      const inquiriesRef = collection(db, "inquiries");
      const snapshot = await getDocs(inquiriesRef);
      const inquiries = snapshot.docs.map(doc => ({
        _id: doc.id,
        ...doc.data()
      }));
      return NextResponse.json({ success: true, data: inquiries }, { status: 200 });
    } catch (fallbackError) {
      console.error("Error fetching inquiries:", fallbackError);
      return NextResponse.json(
        { success: false, error: "Failed to fetch inquiries" },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const docRef = await addDoc(collection(db, "inquiries"), {
      ...body,
      status: "unread",
      createdAt: serverTimestamp(),
    });
    
    return NextResponse.json(
      { success: true, data: { _id: docRef.id, ...body } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
