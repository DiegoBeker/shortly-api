import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
    const { url } = req.body;
    const { session } = res.locals;

    try {
        const shortUrl = nanoid();
        const result = await db.query(`
            INSERT INTO links (url,"shortUrl","userId")
            VALUES ($1,$2,$3)
            RETURNING id;
        `, [url, shortUrl, session.userId]);
        // console.log(result.rows);
        res.status(201).send({ id: result.rows[0].id, shortUrl });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getShortUrlById(req, res) {
    const { id } = req.params;

    try {
        const link = await db.query(`SELECT id, "shortUrl", url FROM links WHERE id=$1`, [id]);
        if (!link.rows[0]) return res.status(404).send("Url not found");

        res.send(link.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function openShortUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const link = await db.query(`SELECT * FROM links WHERE "shortUrl"=$1`, [shortUrl]);
        if (!link.rows[0]) return res.status(404).send("Short url not found");

        await db.query(`
            UPDATE links
            SET "visitCount"="visitCount"+1
            WHERE "shortUrl"=$1
        `, [shortUrl]);

        const { url } = link.rows[0];

        res.redirect(200, url);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteShortUrl(req, res){
    const { id } = req.params;

    try {
        await db.query(`DELETE FROM links WHERE id=$1`, [id]);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
