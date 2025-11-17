import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import User from '../user.model.ts';

interface RegisterBody {
    email: string;
    username: string;
    password: string;
}

export const register = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new Error('User with this email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        username,
        passwordHash: hashedPassword,
        toReadList: [],
        whitelist: [],
        role: 'user'
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser});
}