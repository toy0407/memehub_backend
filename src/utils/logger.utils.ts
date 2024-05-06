import winston from "winston";

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
};

// Define log colors
const logColors = {
  error: "red",
  warn: "yellow",
  info: "green",
};

// Create logger instance
const Logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "./logs/combined.log" }),
  ],
});
if (process.env.NODE_ENV !== "production") {
  Logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Extend logger with custom log levels and colors
winston.addColors(logColors);

export default Logger;
