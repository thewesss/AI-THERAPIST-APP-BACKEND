import mongoose, { Schema } from "mongoose";
;
const moodSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    notes: {
        type: String,
        trim: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
moodSchema.index({ userId: 1, timestamp: -1 }); // compound index for efficient querying
const Mood = mongoose.model("Mood", moodSchema);
export { Mood };
//# sourceMappingURL=Mood.js.map