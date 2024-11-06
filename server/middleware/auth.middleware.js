import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const tokenFromCookie = req.cookies?.accessToken;
    const tokenFromHeader = authHeader?.replace("Bearer ", "");
    const token = tokenFromCookie || tokenFromHeader;

    // Debug logging (remove in production)
    console.log({
      hasCookie: !!tokenFromCookie,
      hasAuthHeader: !!authHeader,
      finalToken: !!token
    });

    if (!token) {
      if (req.isAuthenticated && req.isAuthenticated()) {
        console.log("Passport authentication found");
        return next();
      }
      throw new ApiError("Unauthorized - No token provided", 401);
    }

    // Trim and validate token format
    const cleanToken = token.trim();
    if (!cleanToken) {
      throw new ApiError("Invalid token format", 401);
    }

    try {
      const decodedToken = jwt.verify(cleanToken, process.env.ACCESS_TOKEN_SECRET);
      
      const user = await User.findById(decodedToken?._id)
        .select("-refreshToken")
        .lean(); // Use lean() for better performance

      if (!user) {
        throw new ApiError("User not found", 401);
      }

      req.user = user;
      next();
    } catch (jwtError) {
      // Specific handling of JWT errors
      if (jwtError.name === 'TokenExpiredError') {
        throw new ApiError("Token has expired", 401);
      }
      if (jwtError.name === 'JsonWebTokenError') {
        throw new ApiError("Invalid token", 401);
      }
      throw jwtError;
    }
  } catch (error) {
    return next(new ApiError(error?.message || "Authentication failed", error.status || 500));
  }
};
