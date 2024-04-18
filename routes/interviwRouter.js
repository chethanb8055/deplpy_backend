import express from "express";
// import { isAuthorized } from "../middlewares/authMiddle.js";
import {
  deleteInterview,
  getInterview,
  scheduleInterview,
} from "../controllers/Interview.js";
import { isAuthorized } from "../middlewares/authMiddle.js";

const router = express.Router();

// Route to schedule an interview
router.post("/schedule/:id", isAuthorized, scheduleInterview);

// Route to get an interview by ID
router.get("/:id", isAuthorized, getInterview);

// Route to delete an interview by ID
router.delete("/:id", isAuthorized, deleteInterview);

export default router;
