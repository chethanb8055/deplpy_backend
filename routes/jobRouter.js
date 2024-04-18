import express from "express";
import {
  apply,
  deleteJob,
  getAlljob,
  getOnejob,
  getmyJobs,
  postJob,
  updateJobe,
} from "../controllers/jobontroller.js";
import { isAuthorized } from "../middlewares/authMiddle.js";

const router = express.Router();

router.get("/getAll", getAlljob);
router.post("/post", isAuthorized, postJob);
router.get("/getmyjobs", isAuthorized, getmyJobs);
router.put("/update/:id", isAuthorized, updateJobe);
router.delete("/delete/:id", isAuthorized, deleteJob);
router.get("/:id", isAuthorized, getOnejob);
// **
router.post("/apply", isAuthorized, apply);

export default router;
