import type { Request, Response } from 'express';

export const getProfile = async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({
        id: user._id,
        email: user.email,
        username: user.username,
        toReadList: user.toReadList,
        whitelist: user.whitelist,
        role: user.role
    });
}