"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMood = void 0;
const Mood_1 = require("../models/Mood");
const logger_1 = require("../utils/logger");
const createMood = async (req, res, next) => {
    try {
        const { score, note, context, activities } = req.body;
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User is not authenticated" });
        }
        const mood = new Mood_1.Mood({
            userId,
            score,
            note,
            context,
            activities,
            timestamp: new Date(),
        });
        await mood.save();
        logger_1.logger.info(`Mood created for user: ${userId}`);
        res.status(201).json({ success: true, data: mood });
    }
    catch (error) {
        next(error);
    }
};
exports.createMood = createMood;
//# sourceMappingURL=moodController.js.map