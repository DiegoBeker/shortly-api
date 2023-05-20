import { db } from "../database/database.connection.js";

export async function getLinksFromUser(req, res) {
    const { session } = res.locals;

    try {
        const userinfo = await db.query(`
            SELECT users.id, users.name, SUM(links."visitCount") as "visitCount"
            FROM users,links
            WHERE users.id=$1 and links."userId"=$1
            GROUP BY users.id;
        `,[session.userId]);
        const linksList = await db.query(`SELECT id,url,"shortUrl","visitCount" FROM links WHERE "userId"=$1`, [session.userId]);
        const linksFromUser = {...userinfo.rows[0], shortenedUrls: linksList.rows};

        res.send(linksFromUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
}