"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose")); //provides it a way to define the structure of the app's data and makes it easier to work with mongodb.
const logger_1 = require("./logger");
require("dotenv/config");
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI)
    throw new Error("MONGODB_URI is not set in .env");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        logger_1.logger.info("Connected to MongoDB Atlas");
    }
    catch (error) {
        logger_1.logger.error("Error connecting to MongoDB Atlas:", error);
        process.exit(1); // Exit the process with a failure code
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map