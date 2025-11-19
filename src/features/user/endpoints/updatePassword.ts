import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../user.model.ts";

export const updatePassword = async (req: Request, res: Response) => {
    try {
        const { password } = req.body;
        const userId = req.params.id;

        const hash = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(userId, { passwordHash: hash });

        res.json({ message: "Password updated" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
