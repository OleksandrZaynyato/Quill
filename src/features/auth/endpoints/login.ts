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

    const token = jwt.sign(
        {userId: user._id, role: user.role},
        process.env.JWT_SECRET as string,
        {expiresIn: '1h'}
    );

    res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        }
    )

    res.status(200).json({
        message: 'Login successful',
        token,
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