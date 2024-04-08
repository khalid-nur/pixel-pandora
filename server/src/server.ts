import "dotenv/config";
import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });
