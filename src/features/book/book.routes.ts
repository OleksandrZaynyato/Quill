import {Router} from "express";
import bookController from "./book.controller.ts";

const bookRoutes = Router();
bookRoutes.get('/', bookController.getAll);
bookRoutes.get('/search', bookController.search);
bookRoutes.get('/:id', bookController.getById);

export default bookRoutes;