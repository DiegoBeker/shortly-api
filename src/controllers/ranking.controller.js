import { db } from "../database/database.connection.js";

export async function getRanking(req, res) {
    try {
        const ranking = await db.query(`
        SELECT users.id, users.name, SUM(links."visitCount") as "visitCount", count(links) as "linksCount"
        FROM users,links
        WHERE users.id=links."userId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        limit 10;
        `);
        res.send(ranking.rows);
    } catch (error) {
        res.status(500).send(error.message)
    }
}