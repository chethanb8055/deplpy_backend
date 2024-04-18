import ErrorHandler from "../middlewares/errorHandler.js";
import { User } from "../models/userSchema.js";
import { asycHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = asycHandler(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;

  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("All fields are required"));
  }

  const existingUser = await User.findOne({
    $or: [{ phone }, { email }],
  });

  if (existingUser) {
    return next(new ErrorHandler("User is already registered"));
  }

  const user = await User.create({ name, email, phone, role, password });

  sendToken(user, 200, res, "User has been created Successfully");
});

export const login = asycHandler(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!password || !email || !role) {
    return next(
      new ErrorHandler("Please Provide valid email,password and role .", 400)
    );
  }

  //validating existence
  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorHandler("User Doest not Exist", 404);
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Password", 401));
  }

  // user validation
  if (user.role !== role) {
    return next(new ErrorHandler("User Role is Wrong"));
  }

  sendToken(user, 200, res, "loggedIn sucessfully");
});

export const logout = asycHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json(new ApiResponse(200, "", "User loggedOut Successfully"));
});

export const getUser = asycHandler(async (req, res, next) => {
  const user = req.user;
  // console.log(user);
  res.status(200).json({
    success: true,
    user,
  });
});
