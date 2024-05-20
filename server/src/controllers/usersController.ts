import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { UserModel } from "../models/users";
import bcrypt from "bcrypt";

export const getAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Retrieve the authenticated user's ID from the session
  const authenticatedUserId = req.session.userId;

  try {
    // If no authenticated user ID is found in the session, throw a 401 error with user not authenticated message
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }

    // Find the user in the database by their ID and select the email field
    const user = await UserModel.findById(authenticatedUserId).select("+email");

    // Send a 201 status code and the user data
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password: passwordRaw } = req.body;

  // Check if any parameters are missing
  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }

    // Check if username already exists
    const existingUsername = await UserModel.findOne({ username: username });
    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already taken. Please choose a different one or login instead"
      );
    }

    // Check if email already exists
    const existingEmail = await UserModel.findOne({ email: email });
    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email address already exits. Please login instead"
      );
    }

    // Encrypt the password for secure storage
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    // Create a new user document
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;

    // Sends a 201 response with the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    // Check if email or password is missing
    if (!email || !password) {
      throw createHttpError(400, "Parameters missing");
    }

    // Find user by email and select password and email fields
    const user = await UserModel.findOne({ email: email }).select(
      "+password +email"
    );

    // If user is not found, throw a 401 error to inform user that it is a invalid credentials
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    // Compare provided password with user's hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, throw a 401 error to inform inform user that it is a invalid credentials
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    // Set userId in the session to indicate user is authenticated
    req.session.userId = user._id;

    // Send a 201 Created status and user data
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
