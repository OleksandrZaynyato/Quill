import yup from "yup";
import mongoose from "mongoose";

export const searchSchema = yup.object({
    query: yup.object({
        searchValue: yup.string().optional(),
        category: yup.string().optional(),
        page: yup.number().default(1)
    }),
    body: yup.object({
        whitelist: yup
            .array()
            .of(
                yup.string().test(
                    "objectId",
                    "Invalid ObjectId",
                    id => !id || mongoose.Types.ObjectId.isValid(id)
                )
            )
            .optional()
    }).optional(),
    params: yup.object().optional()
});