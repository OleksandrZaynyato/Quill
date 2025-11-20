import type { Request, Response } from "express";
import User from "../../user/user.model.js";

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        await User.updateOne(
            { refreshToken },
            { $unset: { refreshToken: "" } }
        );
    }

    res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });

    return res.json({ message: "Logged out" });
};
