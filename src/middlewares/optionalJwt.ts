import passport from "passport";
import type{ Request, Response, NextFunction } from "express";

export function optionalJwt(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
        if (err) {
            // Token parsing/verification error → ignore
            return next();
        }

        if (user) {
            req.user = user; // attach user if valid
        }

        return next(); // always continue request
    })(req, res, next);
}
