import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { userSchema } from "../schemas/signUp.schema.js";
import { validateSignUp } from "../middlewares/validateSignUp.middleware.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(userSchema), validateSignUp, signUp);

export default userRouter;