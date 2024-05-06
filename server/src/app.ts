import express, { Request, Response, NextFunction } from "express";
import imageRoutes from "./routes/imagesRoute";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

// A route for handling our Api endpoints
app.use("/api/v1/images", imageRoutes);

// Handling requests to unknown endpoints
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});

// Error handling middleware that catches any errors thrown
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknown error occurred";
  // Check if error is an instance of the Error class to get its message.
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  // Send a 500 status code with the error message.
  res.status(statusCode).json(errorMessage);
});

export default app;
