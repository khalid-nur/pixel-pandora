import "dotenv/config";
import express from "express";
import env from "./utils/validateEnv";

const app = express();

const port = env.PORT;

console.log();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("Connected ");
});
