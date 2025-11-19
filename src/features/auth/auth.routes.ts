import {Router} from "express";
import {registerSchema} from "./validators/registerValidator.ts";
import {validate} from "../../middlewares/validate.ts";
import asyncHendler from "../../middlewares/asyncHendler.ts";
import {loginSchema} from "./validators/loginValidator.ts";
import {register, login, logout , refresh} from "./endpoints/index.ts";
// import passport from "passport";
import passport from "../../middlewares/passport.ts"

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), asyncHendler(register));
authRoutes.post("/login", validate(loginSchema), asyncHendler(login));
authRoutes.post("/logout", asyncHendler(logout));
authRoutes.get("/refresh", asyncHendler(refresh));

authRoutes.get(
    "/me",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({ user: req.user });
    }
);

export default authRoutes;