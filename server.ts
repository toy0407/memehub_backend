import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import http from "http";
import Logger from "./src/utils/logger.utils";
import connectDB from "./src/config/db-connection.config";
import ApiRateLimiter from "./src/utils/api-rate-limiter.utils";
import UserRouter from "./src/routes/user.routes";

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(ApiRateLimiter);
app.use(express.json());

// Routes
app.use(`/user`, UserRouter)
// app.get("/", (req: Request, res: Response) => {
//   Logger.info("Home Executed");
//   res.send("Hello World!");
// });




// Server
const PORT: number = parseInt(process.env.PORT || "5001", 10);

connectDB();
mongoose.connection.once("open", () => {
  Logger.info("Connection established to MongoDB");
  server.listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", () => {
  Logger.error(`Connection failed to MongoDB`);
});
