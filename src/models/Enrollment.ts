import mongoose, { Schema, model, models } from "mongoose";

export interface IEnrollment {
  _id?: string;
  student_name: string;
  age: number;
  phone: string;
  email: string;
  preferred_style: "Kandyan" | "Hip-Hop" | "Classical" | "Contemporary";
  status: "pending" | "approved" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    student_name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    preferred_style: {
      type: String,
      enum: ["Kandyan", "Hip-Hop", "Classical", "Contemporary"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Enrollment =
  models.Enrollment || model<IEnrollment>("Enrollment", enrollmentSchema);

export default Enrollment;
