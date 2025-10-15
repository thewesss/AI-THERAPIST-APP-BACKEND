"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const Session_1 = require("../models/Session");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../utils/logger");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Name, email, and password are required." });
        }
        // Check if user exists
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use." });
        }
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create user
        const user = new User_1.User({ name, email, password: hashedPassword });
        await user.save();
        // Respond
        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            message: "User registered successfully.",
        });
    }
    catch (error) {
        console.error("🔥 Registration failed:", error); // log to terminal immediately
        logger_1.logger.error("Error creating user:", error); // log via winston to file/console
        res.status(500).json({
            message: "Server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required." });
        }
        // Find user
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        // Verify password
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "24h" });
        // Create session
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now
        const session = new Session_1.Session({
            userId: user._id,
            token,
            expiresAt,
            deviceInfo: req.headers["user-agent"],
        });
        await session.save();
        // Respond with user data and token
        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
            message: "Login successful",
        });
    }
    catch (error) {
        logger_1.logger.error("Error during login:", error);
        // Return a clean error message
        res.status(500).json({
            message: "Server error during login",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (token) {
            await Session_1.Session.deleteOne({ token });
        }
        res.json({ message: "Logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map