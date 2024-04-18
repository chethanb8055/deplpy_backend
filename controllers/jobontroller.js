import { Job } from "../models/jobSchema.js";
import { asycHandler } from "../utils/asyncHandler.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAlljob = asycHandler(async (req, res, next) => {
  const job = await Job.find({ expired: false }).sort({ jobPostedOn: "desc" });
  res.status(200).json(new ApiResponse(200, job));
});

export const postJob = asycHandler(async (req, res, next) => {
  const { role } = req.user;
  // console.log(req.user, "userRequest");

  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is not allowed this resources", 400)
    );
  }

  const {
    name,
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details", 400));
  }
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler("Please either provide fixed salary or ranged salary")
    );
  }

  if (fixedSalary && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Cannot enter fixed salary and ranged salary together")
    );
  }

  const postedBy = req.user._id;

  const job = await Job.create({
    name,
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });

  res.status(200).json(new ApiResponse(200, job, "Job posted successfully"));
});

export const getmyJobs = asycHandler(async (req, res, next) => {
  const { role } = req.user;

  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is not allowed this resources", 400)
    );
  }

  const myjobs = await Job.find({ postedBy: req.user._id });

  // console.log("why", myjobs);

  res.status(200).json(new ApiResponse(200, myjobs, "My All Job Posted"));
});

export const updateJobe = asycHandler(async (req, res, next) => {
  const { role } = req.user;

  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is not allowed this resources", 400)
    );
  }

  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops the Job ID Not Found", 404));
  }

  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModiy: false,
  });
  res.status(200).json({
    success: true,
    job,
    message: "Job Updated Successfully",
  });
});

export const deleteJob = asycHandler(async (req, res, next) => {
  const { role } = req.user;

  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is not allowed this resources", 400)
    );
  }

  const { id } = req.params;
  let job = await Job.findByIdAndDelete(id);
  if (!job) {
    return next(new ErrorHandler("Oops the Job ID Not Found", 404));
  }

  res.status(200).json({
    success: true,
    job: null,
    message: "Job Deleted Successfully",
  });
});

export const getOnejob = asycHandler(async (req, res, next) => {
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops the Job ID Not Found", 404));
  }
  res.status(200).json({
    success: true,
    job: job,
    message: "Job One geted Successfully",
  });
});

export const apply = asycHandler(async (req, res, next) => {
  const { jobId } = req.body;
  const userId = req.user._id;
  console.log(jobId, userId);
  res.status(200).json({
    success: true,
    jobId,
    message: "Job One geted Successfully",
  });
});
