import {Router} from "express";
import {validate} from "../../middlewares/validate.ts";
import {searchSchema} from "./validators/search.validator.ts";
import asyncHendler from "../../middlewares/asyncHendler.ts";
import {searchBooks} from "./endpoints/search.ts";
import {getById} from "./endpoints/findById.ts";

const bookRoutes = Router();
// bookRoutes.get('/', bookController.getAll);
bookRoutes.get('/search',validate(searchSchema),  asyncHendler(searchBooks));
bookRoutes.get('/:id', asyncHendler(getById));

export default bookRoutes;