import Job from '../models/job.js';
import Application from '../models/application.js';
import User from '../models/user.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';


// @desc    Get dashboard statistics
export const dashboardStats = catchAsyncErrors(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalJobs = await Job.countDocuments();
  const totalApplications = await Application.countDocuments();

  const appsPerJob = await Application.aggregate([
    { $group: { _id: '$job', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    { $lookup: { from: 'jobs', localField: '_id', foreignField: '_id', as: 'job' } },
    { $unwind: '$job' }
  ]);

  res.json({ totalUsers, totalJobs, totalApplications, appsPerJob });
});

// @desc    Get all users
export const getAllUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json({ success: true, users });
});

// @desc    Create new job
export const getAllJobs = catchAsyncErrors(async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json({ success: true, jobs });
});


// @desc    Get all applications
export const getAllApplications = catchAsyncErrors(async (req, res) => {  
  const applications = await Application.find()
    .populate('job', 'title company')
    .populate('applicant', 'name email');

  res.status(200).json({ success: true, applications });
});

//@desc delete user by id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  await user.deleteOne();
  res.status(200).json({ success: true, message: "User deleted" });
});


//@desc delete job by id
export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) return next(new ErrorHandler("Job not found", 404));

  await job.deleteOne();
  res.status(200).json({ success: true, message: "Job deleted" });
});






