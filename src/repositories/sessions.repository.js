import { db } from "../database/database.connection.js";

export async function createSession(id,token){

    await db.query(`
            INSERT INTO sessions ("userId",token)
            VALUES ($1,$2);
        `, [id, token]);
}