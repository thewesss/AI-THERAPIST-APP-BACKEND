"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayActivities = exports.logActivity = void 0;
const Activity_1 = require("../models/Activity");
const logger_1 = require("../utils/logger");
// Allowed enum values from your schema
const allowedTypes = ["meditation", "exercise", "walking", "reading", "journaling", "therapy"];
const logActivity = async (req, res, next) => {
    try {
        const { type, name, description, duration, difficulty, feedback } = req.body;
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User is not authenticated" });
        }
        // Validate enum type
        if (!allowedTypes.includes(type)) {
            return res.status(400).json({
                message: `Invalid activity type. Allowed types: ${allowedTypes.join(", ")}`
            });
        }
        // Ensure duration is a number
        const durationNumber = Number(duration);
        if (isNaN(durationNumber)) {
            return res.status(400).json({ message: "Duration must be a number in minutes" });
        }
        const activity = new Activity_1.Activity({
            userId, // set userId
            type,
            name,
            description,
            duration: durationNumber,
            difficulty,
            feedback,
            timestamp: new Date(),
        });
        await activity.save();
        logger_1.logger.info(`Activity logged for user: ${userId}`);
        res.status(201).json({
            success: true,
            data: activity,
        });
    }
    catch (error) {
        logger_1.logger.error("Error logging activity:", error);
        next(error);
    }
};
exports.logActivity = logActivity;
const getTodayActivities = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User is not authenticated" });
        }
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const activities = await Activity_1.Activity.find({
            userId,
            timestamp: { $gte: startOfDay, $lte: endOfDay },
        }).sort({ timestamp: -1 });
        res.status(200).json({ success: true, data: activities });
    }
    catch (error) {
        logger_1.logger.error("Error fetching today's activities:", error);
        next(error);
    }
};
exports.getTodayActivities = getTodayActivities;
//# sourceMappingURL=activityController.js.map