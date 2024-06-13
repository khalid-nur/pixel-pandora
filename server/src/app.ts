import express, { Request, Response, NextFunction } from "express";
import imageRoutes from "./routes/imagesRoute";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import userRoute from "./routes/userRoute";
import session from "express-session";
import env from "./utils/validateEnv";
import MongoStore from "connect-mongo";
import { requiredAuth } from "./middleware/auth";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

// A middleware to use session management with MongoDB as the session store.
app.use(
  session({
    secret: env.SESSION_SECRET,
    // Prevent session from being saved back to the session store if it wasn't modified during the request
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // Sets the maximum session duration to 1 hour for the session cookie
    },

    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

// A route for handling our user api endpoints
app.use("/api/v1/users", userRoute);

// A route for handling our image api endpoints
app.use("/api/v1/images", requiredAuth, imageRoutes);

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
