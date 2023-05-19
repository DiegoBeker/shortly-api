import { db } from "../database/database.connection.js";

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        if(!token) return res.status(401).send("The token is missing");
        //console.log(token);

        const session = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
        //console.log(session.rows);
        if(!session.rows[0]) return res.status(401).send("Invalid token");

        res.locals.session = session.rows[0];

        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}