import {Router} from "express";
import passport from "../../middlewares/passport.js"
import {authOwnerOrAdmin} from "../../middlewares/authOwnerOrAdmin.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import {
    addToReadList,
    addToWhitelist,
    deleteUser,
    getAll,
    getProfile,
    removeFromReadList,
    removeFromWhitelist,
    updateEmail,
    updatePassword,
    updateProfile
} from "./endpoints/index.js";
import { validateUpdateEmail, validateUpdatePassword, validateUpdateProfile, validateDeleteUser } from "./validators/user.validators.js";
import {authAdmin} from "../../middlewares/authAdmin.js";
import {getAllSchema} from "./validators/getAll.validator.js";
import {validate} from "../../middlewares/validate.js";
import {addToListSchema, removeFromListSchema} from "./validators/lists.validator.js";

const userRoutes = Router();

userRoutes.get("/",
    passport.authenticate("jwt", { session: false }),
    authAdmin,
    validate(getAllSchema),
    asyncHandler(getAll));
userRoutes.get("/profile",
    passport.authenticate("jwt", { session: false }),
    asyncHandler(getProfile));

userRoutes.post(
    "/:id/whitelist",
    passport.authenticate("jwt", { session: false }),
    authOwnerOrAdmin(req => req.params.id),
    validate(addToListSchema),
    addToWhitelist
);

userRoutes.delete(
    "/:id/whitelist/:bookId",
    passport.authenticate("jwt", { session: false }),
    authOwnerOrAdmin(req => req.params.id),
    validate(removeFromListSchema),
    removeFromWhitelist
);

userRoutes.post(
    "/:id/toReadList",
    passport.authenticate("jwt", { session: false }),
    authOwnerOrAdmin(req => req.params.id),
    validate(addToListSchema),
    addToReadList
);

userRoutes.delete(
    "/:id/toReadList/:bookId",
    passport.authenticate("jwt", { session: false }),
    authOwnerOrAdmin(req => req.params.id),
    validate(removeFromListSchema),
    removeFromReadList
);
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