import yup from "yup";

export const getAllSchema = yup.object({
    body: yup.object().optional(),
    params: yup.object().optional(),
    query: yup.object({
        page: yup.number().default(1),
        limit: yup.number().default(20),
    })
});