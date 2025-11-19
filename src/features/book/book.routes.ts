import {Router} from "express";
import passport from "../../middlewares/passport.ts";
import {validate} from "../../middlewares/validate.ts";
import {searchSchema} from "./validators/search.validator.ts";
import asyncHandler from "../../middlewares/asyncHandler.ts";
import {searchBooks} from "./endpoints/search.ts";
import {getById} from "./endpoints/findById.ts";
import {idSchema} from "../../validators/common/id.validator.ts";

const bookRoutes = Router();
bookRoutes.get('/search',
    passport.authenticate("jwt", {session: false, failWithError: false}),
    validate(searchSchema),
    asyncHandler(searchBooks));
bookRoutes.get('/:id', validate(idSchema), asyncHandler(getById));

export default bookRoutes;