import {Router} from "express";
import {registerSchema} from "./validators/registerValidator.ts";
import {validate} from "../../middlewares/validate.ts";
import asyncHandler from "../../middlewares/asyncHandler.ts";
import {loginSchema} from "./validators/loginValidator.ts";
import {register, login, logout , refresh} from "./endpoints/index.ts";
// import passport from "passport";
import passport from "../../middlewares/passport.ts"

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), asyncHandler(register));
authRoutes.post("/login", validate(loginSchema), asyncHandler(login));
authRoutes.post("/logout", asyncHandler(logout));
authRoutes.post("/refresh", asyncHandler(refresh));

authRoutes.get(
    "/me",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({ user: req.user });
    }
);

export default authRoutes;