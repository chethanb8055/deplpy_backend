import { User } from "../models/userSchema.js";
import { asycHandler } from "../utils/asyncHandler.js";
import ErrorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const isAuthorized = asycHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("User Token is invalid", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // console.log(decoded.id, "is tokern");

  req.user = await User.findById(decoded.id);

  next();
});
