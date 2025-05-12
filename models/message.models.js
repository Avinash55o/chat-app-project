import mongoose from "mongoose";

const userMessageSchema = new mongoose.Schema({}, { timestamps: true });

export const Message = mongoose.model("Message", userMessageSchema);
