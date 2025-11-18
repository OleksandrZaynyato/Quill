import {Router} from "express";
import {registerSchema} from "./validators/registerValidator.ts";
import {register} from "./endpoints/register.ts";
import {validate} from "../../middlewares/validate.ts";
import asyncHendler from "../../middlewares/asyncHendler.ts";
import {loginSchema} from "./validators/loginValidator.ts";
import {login} from "./endpoints/login.ts";

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), asyncHendler(register));
authRoutes.post("/login", validate(loginSchema), asyncHendler(login));

export default authRoutes;