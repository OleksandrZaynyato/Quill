import type { Request, Response } from "express";
import User from "../user.model.ts";
import mongoose from "mongoose";

export const updateWhitelist = async (req: Request, res: Response) => {
    try {
        const { whitelist } = req.body; // array of ObjectIds
        const userId = req.params.id;

        // Validate ObjectIds
        const validIds = whitelist.every((id: string) => mongoose.Types.ObjectId.isValid(id));
        if (!validIds) return res.status(400).json({ message: "Invalid IDs in whitelist" });

        const user = await User.findByIdAndUpdate(
            userId,
            { whitelist },
            { new: true }
        ).select("-passwordHash -refreshToken");

        res.json({ message: "Whitelist updated", user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
