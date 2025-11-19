import * as yup from "yup";
import mongoose from "mongoose";

export const addToListSchema = yup.object({
    params: yup.object({
        id: yup.string()
            .required()
            .test("objectId", "Invalid id", v => mongoose.Types.ObjectId.isValid(v)),
    }),
    body: yup.object({
        bookId: yup.string()
            .required("bookId is required")
            .test("objectId", "Invalid bookId", v => mongoose.Types.ObjectId.isValid(v)),
    }),
    query: yup.object().optional()
});

export const removeFromListSchema = yup.object({
    params: yup.object({
        id: yup.string()
            .required()
            .test("objectId", "Invalid id", v => mongoose.Types.ObjectId.isValid(v)),
        bookId: yup.string()
            .required()
            .test("objectId", "Invalid bookId", v => mongoose.Types.ObjectId.isValid(v)),
    }),
    query: yup.object().optional(),
    body: yup.object().optional()
});
