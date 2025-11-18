import express from 'express';
import cors from 'cors';
import bookRoutes from "./features/book/book.routes.ts";
import userRoutes from "./features/user/user.routes.ts";
import type { Request, Response, NextFunction } from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", bookRoutes);
app.use("/api/user", userRoutes);

app.use((err: any, req: Request, res:Response, next: NextFunction) => {
    console.error("🔥 ERROR:", err);

    res.status(500).json({
        error: true,
        message: err.message || "Internal Server Error",
    });
});
export default app;