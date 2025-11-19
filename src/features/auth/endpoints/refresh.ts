import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../user/user.model";

export const refresh = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Missing refresh token" });

    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ message: "Invalid refresh token" });

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as any;

        const newAccessToken = jwt.sign(
            { userId: payload.userId, role: user.role },
            process.env.ACCESS_SECRET!,
            { expiresIn: "15m" }
        );

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return res.json({ message: "Token refreshed" });
    } catch {
        return res.status(403).json({ message: "Expired refresh token" });
    }
};
