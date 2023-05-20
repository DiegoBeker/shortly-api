import { Router } from "express";
import userRouter from "./users.routes.js";
import linksRouter from "./links.routes.js";
import rankingRouter from "./ranking.routes.js";

const router = Router();
router.use(userRouter);
router.use(linksRouter);
router.use(rankingRouter);

export default router;