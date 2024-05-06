import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import http from "http";

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Server
const PORT: number = parseInt(process.env.PORT || "5000", 10);

mongoose.connection.once("open", () => {
  console.log("Connection established to MongoDB");
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
