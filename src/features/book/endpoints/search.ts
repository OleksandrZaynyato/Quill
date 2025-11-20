import type {Request, Response} from "express";
import mongoose, {HydratedDocument} from "mongoose";
import Book from "../../book/book.model.js";
import type {BookType} from "../book.types.js";
import {getPagination, sendPaginated} from "../../../utils/pagination.js";
import {embed} from "../../../utils/embed.js";

export const searchBooks = async (req: Request, res: Response) => {
    const {page, limit, skip} = getPagination(req.query.page);
    const searchValue = req.query.searchValue as string | undefined;
    const category = req.query.category as string | undefined;
    let whitelist: mongoose.Types.ObjectId[] = [];

    if (req.user?.whitelist?.length) whitelist = [...req.user.whitelist];

    if (req.body?.whitelist?.length) {
        const bodyIds: mongoose.Types.ObjectId[] = (req.body?.whitelist || []).map(
            (id: string | mongoose.Types.ObjectId) =>
                typeof id === "string" ? new mongoose.Types.ObjectId(id) : id
        );

        whitelist = Array.from(new Set([...whitelist, ...bodyIds].map(id => id.toString()))).map(
            idStr => new mongoose.Types.ObjectId(idStr)
        );
    }


    console.log("whitelist before IDs:", whitelist);


    console.log("Whitelist IDs:", whitelist);
    // console.log("Search params:", {searchValue, category, page, limit, whitelistLength: whitelist.length, user: req.user, body: req.body});

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
            title: {$regex: searchValue, $options: "i"},
            _id: {
                $nin: whitelist
            }
        }).limit(50).select("-embedding");
    }
    console.log(`Vector results: ${vectorResults.length}, Keyword results length: ${keywordResults.length}, Keyword results: ${keywordResults}`);

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
    whitelist: mongoose.Types.ObjectId[] = [],
    numCandidates: number = 1000,
    limit: number = 50
): Promise<HydratedDocument<BookType>[]> => {
    const queryVector = await embed(stringToSearch);
    // console.log("whiteList:", whitelist);

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
        ...(whitelist.length > 0
            ? [
                {
                    $match: {
                        _id: {
                            $nin: whitelist.map(id =>
                                typeof id === "string" ? new mongoose.Types.ObjectId(id) : id
                            )
                        }
                    }
                }
            ]
            : [])
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