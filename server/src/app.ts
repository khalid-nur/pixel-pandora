import express, { Request, Response, NextFunction } from "express";
import imageRoutes from "./routes/imagesRoute";

const app = express();

app.use(express.json());

// A route for handling our Api endpoints
app.use("/api/v1/images", imageRoutes);

// Handling requests to unknown endpoints
app.use((req: Request, res: Response, next: NextFunction) => {
  next(Error("Endpoint not found"));
});

// Error handling middleware that catches any errors thrown
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknown error occurred";
  // Check if error is an instance of the Error class to get its message.
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  // Send a 500 status code with the error message.
  res.status(500).json(errorMessage);
});

export default app;
