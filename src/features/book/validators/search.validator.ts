import yup from "yup";

export const searchSchema = yup.object({
    body: yup.object().optional(),
    params: yup.object().optional(),
    query: yup.object({
        searchValue: yup.string().optional(),
        category: yup.string().optional(),
        page: yup.number().default(1)
    })
});