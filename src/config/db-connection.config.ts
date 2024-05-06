import mongoose, { ConnectOptions } from "mongoose";
import Logger from "../utils/logger.utils";

const connectDB = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_DATABASE_URI!);
  } catch (err) {
    Logger.error(`Error connection to MongoDB database ${err}`);
  }
};

export default connectDB;
