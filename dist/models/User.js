import mongoose, { Schema } from "mongoose";
// Define the User schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });
export const User = mongoose.model("User", UserSchema); // Create and export the User model
//# sourceMappingURL=User.js.map