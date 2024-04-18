import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  // You can add more fields here related to the application, like application date, etc.
});

export const JobApplication = mongoose.model(
  "JobApplication",
  jobApplicationSchema
);
