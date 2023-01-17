import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
export const protectRoutes = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_JWT);
      const user = await User.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        message: "Token Expired",
      });
    }
  } else {
    res.status(401).json({
      message: "Not authenticated to access this route",
    });
  }
});
export const protectAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({
      message: "Route restricting to that admin only",
    });
    next();
  }
});
