import express from 'express';
import cors from 'cors';
import bookRoutes from "./features/book/book.routes.ts";
import userRoutes from "./features/user/user.routes.ts";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", bookRoutes);
app.use("/api/user", userRoutes);

export default app;