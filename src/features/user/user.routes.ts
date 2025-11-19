import {Router} from "express";
import {authOwnerOrAdmin} from "../../middlewares/authOwnerOrAdmin.ts";
import {validate} from "../../middlewares/validate.ts";
import {idSchema} from "../../validators/common/id.validator.ts";
import asyncHandler from "../../middlewares/asyncHandler.ts";
import {deleteUser} from "./endpoints/index.ts";

const userRoutes = Router();

userRoutes.delete("/:id",
    authOwnerOrAdmin((req) => req.params.id),
    validate(idSchema),
    asyncHandler(deleteUser)
);

export default userRoutes;