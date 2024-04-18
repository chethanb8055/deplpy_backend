import ErrorHandler from "../middlewares/errorHandler.js";
import { Interview } from "../models/IntervieSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { asycHandler } from "../utils/asyncHandler.js";
import { Application } from "../models/applicationSchema.js";
import { asycHandler } from "../utils/asyncHandler.js";

export const scheduleInterview = asycHandler(async (req, res, next) => {
  const { date, time, location, interviewType, meetingLink } = req.body;

  const applicantID = req.params.id;

  if (interviewType === "In-person" && !location) {
    return next(
      new ErrorHandler(
        "You need to provide a location for in-person interviews"
      )
    );
  }

  if (interviewType === "Video" && !meetingLink) {
    return next(
      new ErrorHandler(
        "You need to provide a meeting link for video interviews"
      )
    );
  }

  //   console.log(req.user);

  const applicationID = await Application.findById(applicantID);
  if (!applicationID) {
    return next(new ErrorHandler("Application not found", 404));
  }

  if (["Pending", "Reject"].includes(applicationID.status)) {
    return next(
      new ErrorHandler("You can't schedule a Pending or Rejected Application")
    );
  }

  const interview = await Interview.create({
    date,
    time,
    location,
    applicationID: applicationID._id,
    employerID: req.user._id,
    interviewType,
    meetingLink,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        interview,
        "Application has been scheduled successfully"
      )
    );
});

export const getInterview = asycHandler(async (req, res, next) => {
  const { id } = req.params;
  const interview = await Interview.find({
    $or: [
      { applicationID: id }, // Search by interview ID
      { employerID: id }, // Search by employer ID
    ],
  });

  if (interview.length === 0) {
    return next(new ErrorHandler("Interview not found", 404));
  }

  res.status(200).json(new ApiResponse(200, interview, "Interview found"));
});

// Controller for DELETE method
export const deleteInterview = asycHandler(async (req, res, next) => {
  const { id } = req.params;

  const interview = await Interview.findById(id);

  if (!interview) {
    return next(new ErrorHandler("Interview not found", 404));
  }

  await interview.remove();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Interview deleted successfully"));
});
