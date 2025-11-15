import type {Request, Response} from 'express';

import Book from './book.model.ts';
import {OpenAI} from "openai";


console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Loaded' : 'Not Loaded');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function embed(text: string) {
    const res = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
    });
    return res.data[0].embedding;
}

const bookController = {
    getAll: async (req: Request, res: Response) => {
        const books = await Book.find().select("-embedding");
        res.json(books);
    },
    getById: async (req: Request, res: Response) => {
        const {id} = req.params;
        const book = await Book.findById(id).select("-embedding");
        if (!book) {
            return res.status(404).json({message: 'Book not found'});
        }
        res.json(book);
    },
    search: async (req: Request, res: Response) => {
        const { searchValue } = req.query;

        const queryVector = await embed(searchValue as string);

        const books = await Book.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index",
                    queryVector,
                    path: "embedding",
                    numCandidates: 150,
                    limit: 10
                }
            }
        ]);

        res.json(books);
    }
}

export default bookController