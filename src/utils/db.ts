import mongoose from "mongoose"; //provides it a way to define the structure of the app's data and makes it easier to work with mongodb.
import { logger } from "./logger";
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not set in .env");

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        logger.info("Connected to MongoDB Atlas");

    } catch (error) {
        logger.error("Error connecting to MongoDB Atlas:", error);
        process.exit(1); // Exit the process with a failure code
    }
};
