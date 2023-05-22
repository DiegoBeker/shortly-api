import { v4 as uuid } from "uuid";
import { insertUser } from "../repositories/users.repository.js";
import { createSession } from "../repositories/sessions.repository.js";

export async function signUp(req, res) {
    
    try {
        await insertUser(req.body);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function signTn(req, res) {
    const { id } = res.locals;

    try {
        const token = uuid();

        await createSession(id, token);

        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
}