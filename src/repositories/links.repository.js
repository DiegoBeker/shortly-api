import { db } from "../database/database.connection.js";

export async function insertShortenUrl(url, shortUrl, userId) {

    const result = await db.query(`
            INSERT INTO links (url,"shortUrl","userId")
            VALUES ($1,$2,$3)
            RETURNING id;
        `, [url, shortUrl, userId]);

    return { id: result.rows[0].id, shortUrl };
}

export async function getLinkById(id) {
    const link = await db.query(`SELECT id, "shortUrl", url FROM links WHERE id=$1`, [id]);

    return link.rows[0];
}

export async function getUrlToOpen(req, res) {
    const { shortUrl } = req.params;

    const link = await db.query(`SELECT * FROM links WHERE "shortUrl"=$1`, [shortUrl]);

    if (!link.rows[0]) return res.status(404).send("Short url not found");

    await db.query(`
            UPDATE links
            SET "visitCount"="visitCount"+1
            WHERE "shortUrl"=$1
    `, [shortUrl]);

    const { url } = link.rows[0];
    return url;
}

export async function deleteLink(id){
    await db.query(`DELETE FROM links WHERE id=$1`, [id]);
}