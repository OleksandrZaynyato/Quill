import type {Request, Response} from 'express';
import User from '../../user/user.model.ts';

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
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

    return res.json({ message: "User deleted successfully" });
}