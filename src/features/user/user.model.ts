import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    toReadList: { type: [mongoose.Schema.Types.ObjectId], ref: "Book", default: [] },
    whitelist: { type: [mongoose.Schema.Types.ObjectId], ref: "Book", default: [] },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    refreshToken: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    collection: "users",
    timestamps: true
})

export default mongoose.model("User", userModel);