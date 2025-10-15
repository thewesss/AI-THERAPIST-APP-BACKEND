"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // MUST be first
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); //  ensures env is loaded
const express_1 = __importDefault(require("express"));
const express_2 = require("inngest/express");
const client_1 = require("./inngest/client"); // ← now env is available
const functions_1 = require("./inngest/functions");
const logger_1 = require("./utils/logger");
const db_1 = require("./utils/db");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const errorHandler_1 = require("./middleware/errorHandler");
const chat_1 = __importDefault(require("./routes/chat"));
const mood_1 = __importDefault(require("./routes/mood"));
const activity_1 = __importDefault(require("./routes/activity"));
if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in .env');
}
// Create an Express application
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)()); // Allow cross-origin requests
app.use((0, helmet_1.default)()); // Secure HTTP headers
app.use((0, morgan_1.default)("dev")); // HTTP request logging
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// routes
app.use("/auth", auth_1.default);
app.use("/chat", chat_1.default);
app.use("/api/mood", mood_1.default);
app.use("/api/activity", activity_1.default);
// Inngest endpoint to handle events
app.use("/api/inngest", (0, express_2.serve)({ client: client_1.inngest, functions: functions_1.functions }));
//error handling middleware
app.use(errorHandler_1.errorHandler);
app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});
app.get("/api/chat", (req, res) => {
    res.send("This is a response from the chat endpoint.");
});
// Start the server
const startServer = async () => {
    try {
        await (0, db_1.connectDB)();
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            // Log server start message using the logger
            logger_1.logger.info(`Server is running on port:${PORT}`);
            logger_1.logger.info(`Inngest endpoint available at http://localhost:${PORT}/api/inngest`);
        });
    }
    catch (error) {
        // Handle any errors that occur during server startup
        logger_1.logger.error("Error starting server:", error);
        process.exit(1); // Exit the process with a failure code
    }
};
startServer();
//# sourceMappingURL=index.js.map