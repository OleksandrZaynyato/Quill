// features/user/validators.ts
import { validate } from "../../../middlewares/validate.ts";
import { idSchema } from "../../../validators/common/id.validator.ts";
import * as yup from "yup";

const emailSchema = yup.object({
    body: yup.object({
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
    }),
});

const passwordSchema = yup.object({
    body: yup.object({
        password: yup
            .string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    }),
});

const whitelistSchema = yup.object({
    body: yup.object({
        whitelist: yup.array().of(yup.string()).required("Whitelist must be an array"),
    }),
});

const profileSchema = yup.object({
    body: yup.object({
        username: yup.string().optional(),
        toReadList: yup.array().of(yup.string()).optional(),
    }),
});

// Export combined middlewares
export const validateUpdateEmail = validate(idSchema.concat(emailSchema));
export const validateUpdatePassword = validate(idSchema.concat(passwordSchema));
export const validateUpdateWhitelist = validate(idSchema.concat(whitelistSchema));
export const validateUpdateProfile = validate(idSchema.concat(profileSchema));
export const validateDeleteUser = validate(idSchema);
