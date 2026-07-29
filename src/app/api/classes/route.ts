import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

export async function GET() {
  try {
    const classesRef = collection(db, "classes");
    // Optionally sort if createdAt exists, otherwise just fetch all
    const q = query(classesRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    const classes = snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: classes }, { status: 200 });
  } catch (error: any) {
    // If index doesn't exist, it might fail. Fallback to basic getDocs
    try {
      const classesRef = collection(db, "classes");
      const snapshot = await getDocs(classesRef);
      const classes = snapshot.docs.map(doc => ({
        _id: doc.id,
        ...doc.data()
      }));
      return NextResponse.json({ success: true, data: classes }, { status: 200 });
    } catch (fallbackError) {
      console.error("Error fetching classes:", fallbackError);
      return NextResponse.json(
        { success: false, error: "Failed to fetch classes" },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const docRef = await addDoc(collection(db, "classes"), {
      ...body,
      createdAt: serverTimestamp(),
    });
    
    return NextResponse.json(
      { success: true, data: { _id: docRef.id, ...body } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create class" },
      { status: 500 }
    );
  }
}
