import { Request, Response, NextFunction } from "express";
import { Mood } from "../models/Mood";
import { logger } from "../utils/logger";

export const createMood = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { score, note, context, activities }  = req.body;
        const userId = req.user?._id; 

        if (!userId) {
            return res.status(401).json({ message: "User is not authenticated" });
        }
        const mood = new Mood({
            userId,
            score,
            note,
            context,
            activities,
            timestamp: new Date(),
        });
        await mood.save();
        logger.info(`Mood created for user: ${userId}`);
        res.status(201).json({ success: true, data: mood });
    } catch (error) {
        next(error);
    }
};