import express from 'express';
import cors from 'cors';
import bookRoutes from "./features/book/book.routes.ts";
import authRoutes from "./features/auth/auth.routes.ts";
import type { Request, Response, NextFunction } from 'express';
import {swaggerDocs} from "./swagger.ts";

const app = express();

app.use(cors(
    { origin: "*" }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

swaggerDocs(app);

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

app.use((err: any, req: Request, res:Response, next: NextFunction) => {
    console.error("🔥 ERROR:", err);

    res.status(500).json({
        error: true,
        message: err.message || "Internal Server Error",
    });
});
export default app;