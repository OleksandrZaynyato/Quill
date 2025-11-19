import type { Request, Response } from "express";
import User from "../user.model";

export const updateEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const userId = req.params.id;

        // Check if email already exists
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { email },
            { new: true }
        ).select("-passwordHash -refreshToken");

        res.json({ message: "Email updated", user });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
