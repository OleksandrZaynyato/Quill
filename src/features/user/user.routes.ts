import {Router} from "express";
import passport from "../../middlewares/passport.ts"
import {authOwnerOrAdmin} from "../../middlewares/authOwnerOrAdmin.ts";
import {validate} from "../../middlewares/validate.ts";
import {idSchema} from "../../validators/common/id.validator.ts";
import asyncHandler from "../../middlewares/asyncHandler.ts";
import {deleteUser, updateEmail, updatePassword, updateProfile, updateWhitelist} from "./endpoints/index.ts";
import { validateUpdateEmail, validateUpdatePassword, validateUpdateWhitelist, validateUpdateProfile, validateDeleteUser } from "./validators/user.validators.ts";

const userRoutes = Router();


userRoutes.patch("/:id/email",
    passport.authenticate("jwt", { session: false }),
    authOwnerOrAdmin(req => req.params.id),
    validateUpdateEmail,
    updateEmail);
userRoutes.patch("/:id/password",
    passport.authenticate("jwt", { session: false }),
    authOwnerOrAdmin(req => req.params.id),
    validateUpdatePassword,
    updatePassword);
userRoutes.patch("/:id/whitelist",
    passport.authenticate("jwt", { session: false }),
    authOwnerOrAdmin(req => req.params.id),
    validateUpdateWhitelist,
    updateWhitelist);
userRoutes.patch("/:id/profile",
    passport.authenticate("jwt", { session: false }),
    authOwnerOrAdmin(req => req.params.id),
    validateUpdateProfile,
    updateProfile);
userRoutes.delete("/:id",
    passport.authenticate("jwt", { session: false }),
    authOwnerOrAdmin(req => req.params.id),
    validateDeleteUser, deleteUser);

export default userRoutes;