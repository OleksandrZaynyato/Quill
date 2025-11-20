import {Router} from "express";
import {registerSchema} from "./validators/registerValidator.js";
import {validate} from "../../middlewares/validate.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import {loginSchema} from "./validators/loginValidator.js";
import {register, login, logout , refresh} from "./endpoints/index.js";
import passport from "../../middlewares/passport.js";

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