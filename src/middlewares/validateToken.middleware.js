import { getSessionByToken } from "../repositories/sessions.repository.js";

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        if(!token) return res.status(401).send("The token is missing");

        const session = await getSessionByToken(token);
        
        if(!session) return res.status(401).send("Invalid token");

        res.locals.session = session;

        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}