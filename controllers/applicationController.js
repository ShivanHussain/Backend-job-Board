import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import application from "../models/application.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/user.js";


// @desc    Create a new job application
export const createApplication = catchAsyncErrors(async (req, res, next) => {
  const { jobId } = req.body;




  if (!jobId ) {
    return next(new ErrorHandler("Job ID and are required", 400));
  }

  const applicationData = {
    job: jobId,
    applicant: req.user._id,
    resumeUrl: await User.findById(req.user._id).then(user => user.resume.url),
  };

  const newApplication = await application.create(applicationData);

  res.status(201).json({
    success: true,
    message: "Application submitted successfully!",
    application: newApplication,
  });
});

// @desc    Get all applications made by the user
export const getMyApplications = catchAsyncErrors(async (req, res, next) => {
  const applications = await application.find({ applicant: req.user._id }).populate("job");

  if (!applications.length) {
    return next(new ErrorHandler("No applications found", 404));
  }

  res.status(200).json({
    success: true,
    applications,
  });
});