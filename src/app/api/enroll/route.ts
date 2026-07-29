import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";

export async function POST(request: Request) {
  try {
    await dbConnect();
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

    const newEnrollment = await Enrollment.create(body);

    return NextResponse.json(
      { success: true, data: newEnrollment },
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
