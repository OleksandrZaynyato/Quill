import type { Request, Response } from 'express';
import User from "../user.model.js"
import {getPagination, sendPaginated} from "../../../utils/pagination.js";

export const getAll = async (req: Request, res: Response) => {
    const pageQuery = req.query.page ? Number(req.query.page) : undefined;
    const limitQuery = req.query.limit ? Number(req.query.limit) : undefined;

    const {page, limit, skip} = getPagination(pageQuery, limitQuery);
    const docs = await User.find().select('-passwordHash -refreshToken').skip(skip).limit(limit);
    const total = await User.countDocuments();

    return sendPaginated(res, page, limit, total, docs);
}