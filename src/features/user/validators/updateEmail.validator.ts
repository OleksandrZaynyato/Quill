import yup from "yup";

export const updateEmailSchema = yup.object().shape({
    body: yup.object().shape({
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
    }),
    params: yup.object().shape({
        id: yup.string().required("User ID is required"),
    }),
    query: yup.object().optional(),
});