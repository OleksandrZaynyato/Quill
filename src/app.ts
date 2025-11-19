import express from 'express';
import cors from 'cors';
import bookRoutes from "./features/book/book.routes";
import authRoutes from "./features/auth/auth.routes";
import type { Request, Response, NextFunction } from 'express';
import {swaggerDocs} from "./swagger";
import cookieParser from "cookie-parser";
import passport from "./middlewares/passport";
import { initPassport } from "./middlewares/passport";
import userRoutes from "./features/user/user.routes";

const app = express();

app.use(cors(
    { origin: "*" }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

swaggerDocs(app);

initPassport();
app.use(passport.initialize());

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use((err: any, req: Request, res:Response, next: NextFunction) => {
    console.error("🔥 ERROR:", err);

    res.status(500).json({
        error: true,
        message: err.message || "Internal Server Error",
    });
});
export default app;