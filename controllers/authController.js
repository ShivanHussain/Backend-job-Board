import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import User from "../models/user.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    password,
    role,
  } = req.body;

  if (!req.files || !req.files.profilePicture || !req.files.resume) {
    return next(new ErrorHandler("ProfilePicture and Resume are required!", 400));
  }

  if (!name || !email || !phone || !password )
    return next(new ErrorHandler("All fields are required!", 400));
  
  if (password.length < 6)
    return next(new ErrorHandler("Password must be at least 6 characters long!", 400));


  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new ErrorHandler("User already registered!", 400));

  // Upload Avatar
  const profilePictureUpload = await cloudinary.uploader.upload(req.files.profilePicture.tempFilePath, {
    folder: "Profile_Pictures",
  });

  // Upload Resume
  const resumeUpload = await cloudinary.uploader.upload(req.files.resume.tempFilePath, {
    folder: "Profile_Resume",
  });

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
    profilePicture: {
      public_id: profilePictureUpload.public_id,
      url: profilePictureUpload.secure_url,
    },
    resume: {
      public_id: resumeUpload.public_id,
      url: resumeUpload.secure_url,
    },
  });

  generateToken(user, "Registration Successful!", 201, res);
});

// @desc    Login User
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Email and password are required!", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password)))
    return next(new ErrorHandler("Invalid Email or Password", 401));

  generateToken(user, "Login Successfully!", 200, res);
});

// @desc    Logout user
export const logout = catchAsyncErrors(async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .status(200)
    .json({ success: true, message: "Logged Out!" });
});
