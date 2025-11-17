import yup from "yup";

export const loginSchema = yup.object().shape({
    body: yup.object().shape({
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
        password: yup
            .string()
            .required("Password is required"),
    })
});
