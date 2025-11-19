import yup from "yup";
import mongoose from "mongoose";

export const idSchema = yup.object({
    body: yup.object().optional(),
    params: yup.object({
        id: yup.string()
            .required("id is required")
            .test("is-objectid", "Invalid ObjectId", (value:string):boolean =>
                mongoose.Types.ObjectId.isValid(value)
            ),
    }),
    query: yup.object().optional()
});