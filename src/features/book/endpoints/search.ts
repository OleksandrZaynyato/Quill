import type {Request, Response} from "express";
import mongoose, {HydratedDocument} from "mongoose";
import Book from "../../book/book.model";
import type {BookType} from "../book.types";
import {getPagination, sendPaginated} from "../../../utils/pagination";
import {embed} from "../../../utils/embed";

export const searchBooks = async (req: Request, res: Response) => {
    const {page, limit, skip} = getPagination(req.query.page);
    const searchValue = req.query.searchValue as string | undefined;
    const category = req.query.category as string | undefined;
    let whitelist: string[] = [];

    if (req.user) whitelist = req.user.whitelist ?? [];
    if (req.body?.whitelist) whitelist = req.body.whitelist;

    if (!searchValue && !category) {
        const docs = await Book.find({}, {embedding: 0}).skip(skip).limit(limit);
        const total = await Book.countDocuments();
        return sendPaginated(res, page, limit, total, docs);
    }

    let vectorResults: HydratedDocument<BookType>[] = [];
    let keywordResults: HydratedDocument<BookType>[] = [];

    // Embedding search by description
    if (searchValue) vectorResults = await vectorSearch(searchValue, whitelist);

    // Keyword search by title
    if (searchValue) {
        keywordResults = await Book.find({
            title: {$regex: searchValue, $options: "i"}
        }).limit(50).select("-embedding");
    }

    // Merge results
    let results: HydratedDocument<BookType>[] = [];

    if (vectorResults.length && keywordResults.length) {
        results = margeResults(vectorResults, keywordResults);
    } else if (vectorResults.length) results = vectorResults;
    else results = keywordResults;

    if (category && vectorResults.length) {
        results = results.filter(doc => doc.categories?.[0] === category);
    }

    // Pagination
    const paginationForFiltered = getPagination(req.query.page, 10);
    const paginated = results.slice(paginationForFiltered.skip, paginationForFiltered.skip + paginationForFiltered.limit);

    return sendPaginated(res, page, paginationForFiltered.limit, results.length, paginated);
};


export const vectorSearch = async (
    stringToSearch: string,
    whitelist: string[] = [],
    numCandidates: number = 1000,
    limit: number = 50
): Promise<HydratedDocument<BookType>[]> => {
    const queryVector = await embed(stringToSearch);
    // console.log("queryVector length:", queryVector?.length);

    const vectorResults = await Book.aggregate([
        {
            $vectorSearch: {
                index: "vector_index",
                queryVector,
                path: "embedding",
                numCandidates: numCandidates,
                limit: limit
            }
        },
        {$project: {embedding: 0}},
        {
            $match: {
                _id: {$nin: whitelist.map(id => new mongoose.Types.ObjectId(id))}
            }
        }
    ]) as HydratedDocument<BookType>[];

    return vectorResults;
};

export const margeResults = (
    vectorResults: HydratedDocument<BookType>[],
    keywordResults: HydratedDocument<BookType>[]
): HydratedDocument<BookType>[] => {
    const ids = new Set<string>();
    const mergedResults = [...keywordResults, ...vectorResults].filter(doc => {
        const idStr = doc._id.toString();
        if (ids.has(idStr)) return false;
        ids.add(idStr);
        return true;
    });
    return mergedResults;
}