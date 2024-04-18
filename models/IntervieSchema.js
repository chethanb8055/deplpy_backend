import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  applicationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true,
  },
  employerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  interviewType: {
    type: String,
    enum: ["Phone", "Video", "In-person"],
  },
  meetingLink: {
    type: String,
    default: "",
  },
});

export const Interview = mongoose.model("Interview", interviewSchema);
