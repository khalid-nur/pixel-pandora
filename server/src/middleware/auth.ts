import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

// Middleware to check if user is authenticated
export const requiredAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the user is authenticated by verifying session userId
  if (req.session.userId) {
    next();
  } else {
    // If not authenticated, pass a 401 Unauthorized error to the next error handler
    next(createHttpError(401, "User not authenticated"));
  }
};
