import { getUsersRanking } from "../repositories/users.repository.js";

export async function getRanking(req, res) {
    try {
        const ranking = await getUsersRanking();
       
        res.send(ranking);
    } catch (error) {
        res.status(500).send(error.message)
    }
}