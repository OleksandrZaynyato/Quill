import {Router} from "express";
import passport from "../../middlewares/passport.js";
import {validate} from "../../middlewares/validate.js";
import {searchSchema} from "./validators/search.validator.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import {searchBooks} from "./endpoints/search.js";
import {getById} from "./endpoints/findById.js";
import {idSchema} from "../../validators/common/id.validator.js";
import {optionalJwt} from "../../middlewares/optionalJwt.js";

const bookRoutes = Router();
bookRoutes.get('/search',
    optionalJwt,
    validate(searchSchema),
    asyncHandler(searchBooks));
bookRoutes.get('/:id', validate(idSchema), asyncHandler(getById));

export default bookRoutes;