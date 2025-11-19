import type { Request, Response } from "express";
import User from "../user.model";

export const addToWhitelist = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { bookId } = req.body;

    await User.findByIdAndUpdate(id, {
        $addToSet: { whitelist: bookId }
    });

    res.status(200).json({ message: "Book added to whitelist" });
};

export const removeFromWhitelist = async (req: Request, res: Response) => {
    const { id, bookId } = req.params;

    await User.findByIdAndUpdate(id, {
        $pull: { whitelist: bookId }
    });

    res.status(200).json({ message: "Book removed from whitelist" });
};

// ---- TO READ LIST ----

export const addToReadList = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { bookId } = req.body;

    await User.findByIdAndUpdate(id, {
        $addToSet: { toReadList: bookId }
    });

    res.status(200).json({ message: "Book added to toReadList" });
};

export const removeFromReadList = async (req: Request, res: Response) => {
    const { id, bookId } = req.params;

    await User.findByIdAndUpdate(id, {
        $pull: { toReadList: bookId }
    });

    res.status(200).json({ message: "Book removed from toReadList" });
};