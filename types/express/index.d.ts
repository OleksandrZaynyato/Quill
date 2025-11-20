import "express";

declare global {
    namespace Express {
        interface User {
            _id: string;
            role: "user" | "admin";
            email: string;
            username?: string;
            toReadList?: string[];
            whitelist?: mongoose.Types.ObjectId[];
        }
    }
}
