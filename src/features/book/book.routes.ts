import {Router} from "express";
import passport from "../../middlewares/passport";
import {validate} from "../../middlewares/validate";
import {searchSchema} from "./validators/search.validator";
import asyncHandler from "../../middlewares/asyncHandler";
import {searchBooks} from "./endpoints/search";
import {getById} from "./endpoints/findById";
import {idSchema} from "../../validators/common/id.validator";

const bookRoutes = Router();
bookRoutes.get('/search',
    passport.authenticate("jwt", {session: false, failWithError: false}),
    validate(searchSchema),
    asyncHandler(searchBooks));
bookRoutes.get('/:id', validate(idSchema), asyncHandler(getById));

export default bookRoutes;