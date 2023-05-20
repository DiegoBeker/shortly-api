import { db } from "../database/database.connection.js";

export async function getRanking(req, res) {
    try {
        const ranking = await db.query(`
        SELECT users.id, users.name, COALESCE(links_visit_count.sum_visit_count, 0) as "visitCount", COALESCE(links_count.links_count, 0) as "linksCount"
        FROM users
        LEFT JOIN (
            SELECT "userId", SUM("visitCount") as sum_visit_count
            FROM links
            GROUP BY "userId"
        ) links_visit_count ON users.id = links_visit_count."userId"
        LEFT JOIN (
            SELECT "userId", COUNT(*) as links_count
            FROM links
            GROUP BY "userId"
        ) links_count ON users.id = links_count."userId"
        ORDER BY "visitCount" DESC
        LIMIT 10;
        `);
        res.send(ranking.rows);
    } catch (error) {
        res.status(500).send(error.message)
    }
}


// SELECT users.id, users.name, SUM(links."visitCount") as "visitCount", count(links) as "linksCount"
//         FROM users,links
//         WHERE users.id=links."userId"
//         GROUP BY users.id
//         ORDER BY "visitCount" DESC
//         limit 10;