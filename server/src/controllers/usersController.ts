import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { UserModel } from "../models/users";
import bcrypt from "bcrypt";

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

    // Sends a 201 response with the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
