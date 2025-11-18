import type {Request, Response} from 'express';
import Book from '../book.model.ts';

export const getById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const book = await Book.findById(id).select("-embedding");
    if (!book) {
        return res.status(404).json({message: 'Book not found'});
    }
    res.json(book);
};