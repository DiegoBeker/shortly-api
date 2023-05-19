import { Router } from "express";
import { getShortUrlById, openShortUrl, shortenUrl } from "../controllers/links.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

const linksRouter = Router();

linksRouter.post("/urls/shorten", validateSchema(urlSchema), validateToken, shortenUrl);
linksRouter.get("/urls/:id", getShortUrlById);
linksRouter.get("/urls/open/:shortUrl", openShortUrl);

export default linksRouter;