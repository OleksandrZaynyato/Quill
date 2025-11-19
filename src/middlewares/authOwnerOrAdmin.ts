import type{ Request, Response, NextFunction } from "express";

export function authOwnerOrAdmin(getOwnerId: (req: Request) => string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        // Admins always allowed
        if (user.role === "admin") return next();

        const ownerId = getOwnerId(req);

        if (user.id !== ownerId) {
            return res.status(403).json({ message: "Forbidden: not your resource" });
        }

        next();
    };
}
