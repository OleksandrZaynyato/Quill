import type {Request, Response} from 'express';
import bcrypt from "bcryptjs";
import User from '../user.model.ts';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).json({message: 'Invalid email or password'});

    const isMatchPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isMatchPassword) return res.status(401).json({message: 'Invalid email or password'});

    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_SECRET!,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_SECRET!,
        { expiresIn: "30d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });

    res.status(200).json({
        message: 'Login successful',
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
            toReadList: user.toReadList,
            whitelist: user.whitelist,
            role: user.role
        }
    });
}