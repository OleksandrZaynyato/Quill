import {Router} from "express";
import {registerSchema} from "./validators/registerValidator";
import {validate} from "../../middlewares/validate";
import asyncHandler from "../../middlewares/asyncHandler";
import {loginSchema} from "./validators/loginValidator";
import {register, login, logout , refresh} from "./endpoints/index";
import passport from "../../middlewares/passport";

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