import rateLimit from "express-rate-limit";
import { RequestHandler } from "express";

// Rate limiter middleware function
const ApiRateLimiter: RequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

export default ApiRateLimiter;
