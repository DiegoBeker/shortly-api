import { getAllUserInfo } from "../repositories/users.repository.js";

export async function getLinksFromUser(req, res) {
    const { session } = res.locals;

    try {
        const userinfo = await getAllUserInfo(session.userId);

        res.send(userinfo);
    } catch (error) {
        res.status(500).send(error.message);
    }
}