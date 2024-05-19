import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
}

// Create user schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, select: false },
  password: { type: String, required: true, select: false },
});

export const UserModel = model<IUser>("user", userSchema);
