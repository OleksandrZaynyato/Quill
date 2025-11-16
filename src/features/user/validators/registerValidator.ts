import yup from "yup";

export const registerSchema = yup.object().shape({
    body: yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters long').max(30, 'Username cannot exceed 30 characters'),
        password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long').max(25, 'Password cannot exceed 25 characters'),
    })
});