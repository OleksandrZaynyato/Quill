import yup from "yup";

export const updateSchema = yup.object().shape({
    params: yup.object({
        id: yup.string().required('User ID is required'),
    }),
    body: yup.object({
        email: yup
            .string()
            .email('Invalid email format')
            .notRequired(),
        username: yup
            .string()
            .min(3, 'Username must be at least 3 characters long')
            .max(30, 'Username cannot exceed 30 characters')
            .notRequired(),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .max(25, 'Password cannot exceed 25 characters')
            .notRequired(),
    })
})