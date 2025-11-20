import type { Request, Response } from "express";
import User from "../user.model.js";

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const userId = req.params.id;

        const updateData: any = {};
        if (username) updateData.username = username;

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true })
            .select("-passwordHash -refreshToken");

        res.json({ message: "Profile updated", user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
