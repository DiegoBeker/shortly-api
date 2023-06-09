import { nanoid } from "nanoid";
import { deleteLink, getLinkById, getUrlToOpen, insertShortenUrl } from "../repositories/links.repository.js";

export async function shortenUrl(req, res) {
    const { url } = req.body;
    const { session } = res.locals;

    try {
        const shortUrl = nanoid();

        const result = await insertShortenUrl(url, shortUrl, session.userId);
        //console.log(result);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getShortUrlById(req, res) {
    const { id } = req.params;

    try {
        const link = await getLinkById(id);
        if (!link) return res.status(404).send("Url not found");

        res.send(link);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function openShortUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const url = await getUrlToOpen(shortUrl);
        if (!url) return res.status(404).send({ message: "Short url not found" });
        
        res.redirect(302, url);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteShortUrl(req, res) {
    const { id } = req.params;

    try {
        await deleteLink(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
