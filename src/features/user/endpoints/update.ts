import type {Request, Response} from 'express';
import User from '../user.model.ts';

interface updateBody {
    email?: string;
    username?: string;
    password?: string;
    toReadList?: string[];
    whitelist?: string[];
    role?: string;
}

export const update = async (req: Request, res: Response) => {
    console.log(req.params)
    const { id } = req.params;
    const updateData = req.body;

    if (updateData)

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-passwordHash');

    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
}