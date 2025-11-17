import {Router} from "express";

import asyncHendler from "../../middlewares/asyncHendler.ts";
import {validate} from "../../middlewares/validate.ts";
import {register, login, update} from "./endpoints/index.ts";
import {registerSchema, loginSchema, updateSchema} from "./validators/index.ts";

const userRoutes = Router();

userRoutes.post("/register", validate(registerSchema), asyncHendler(register));
userRoutes.post("/login", validate(loginSchema), asyncHendler(login));
userRoutes.put("/update/:id", validate(updateSchema), asyncHendler(update));

export default userRoutes;