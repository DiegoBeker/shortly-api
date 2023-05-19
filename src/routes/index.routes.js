import { Router } from "express";
import userRouter from "./users.routes.js";
import linksRouter from "./links.routes.js";

const router = Router();
router.use(userRouter);
router.use(linksRouter);

export default router;