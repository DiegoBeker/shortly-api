import { db } from "../database/database.connection.js";

export async function createSession(id,token){

    await db.query(`
            INSERT INTO sessions ("userId",token)
            VALUES ($1,$2);
        `, [id, token]);
}

export async function getSessionByToken(token){
    const session = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);

    return session.rows[0];
}