import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../user.model';

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
        password: hashedPassword,
        role: 'user'
    });
}