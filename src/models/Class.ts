import mongoose, { Schema, model, models } from "mongoose";

export interface IClass {
  _id?: string;
  title: string;
  style: "Kandyan" | "Hip-Hop" | "Classical" | "Contemporary";
  day: string;
  time: string;
  instructor_name: string;
  hall_no: string;
}

const classSchema = new Schema<IClass>(
  {
    title: { type: String, required: true },
    style: {
      type: String,
      enum: ["Kandyan", "Hip-Hop", "Classical", "Contemporary"],
      required: true,
    },
    day: { type: String, required: true },
    time: { type: String, required: true },
    instructor_name: { type: String, required: true },
    hall_no: { type: String, required: true },
  },
  { timestamps: true }
);

const Class = models.Class || model<IClass>("Class", classSchema);

export default Class;
