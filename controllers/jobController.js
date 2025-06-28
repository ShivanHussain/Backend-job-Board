import Job from '../models/job.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';

// @desc    Create new job
export const createJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.create({
    ...req.body,
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Job created successfully!",
    job,
  });
});

// @desc    Get all jobs
export const getJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find();
  res.status(200).json({
    success: true,
    jobs,
  });
});

// @desc    Filter jobs by company/location
export const applyFilter = catchAsyncErrors(async (req, res, next) => {
  const { company, location } = req.query;

  const filter = {};

  if (company) {
    filter.company = { $regex: company, $options: "i" }; // case-insensitive
  }

  if (location) {
    filter.location = { $regex: location, $options: "i" }; // partial match
  }

  const jobs = await Job.find(filter);

  res.status(200).json({
    success: true,
    jobs,
  });
});



// @desc    Get job by ID
export const getJobById = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  
  if (!job) {
    return next(new ErrorHandler("Job not found", 404));
  }

  res.status(200).json({
    success: true,
    job,
  });
}); 