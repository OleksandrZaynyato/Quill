import type { Response } from "express";

export const getPagination = (pageQuery: any, limit: number = 20) => {
    const page = Number(pageQuery) || 1;
    const skip = (page - 1) * limit;

    return { page, limit, skip };
};

export const sendPaginated = (
    res: Response,
    page: number,
    limit: number,
    total: number,
    data: any[]
) => {
    res.json({
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        data,
    });
};