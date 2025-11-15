import express from 'express';
import cors from 'cors';
import bookRoutes from "./features/book/book.routes.ts";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", bookRoutes)

export default app;