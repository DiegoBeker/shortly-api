import { Router } from "express";
import { signTn, signUp } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { userSchema } from "../schemas/signUp.schema.js";
import { validateLogin, validateSignUp } from "../middlewares/auth.middleware.js";
import { signInSchema } from "../schemas/signIn.schema.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(userSchema), validateSignUp, signUp);
userRouter.post("/teste", validateSchema(signInSchema), validateLogin, signTn);

export default userRouter;