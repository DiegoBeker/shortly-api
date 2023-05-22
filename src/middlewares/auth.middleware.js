import bcrypt from "bcrypt";
import { getUserByEmail } from "../repositories/users.repository.js";

export async function validateSignUp(req, res, next) {
    const { email, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) return res.status(422).send({ message: "Passwords do not match" });

        const emailExists = await getUserByEmail(email);
        if (emailExists) return res.status(409).send({ message: "Email already registered" });

        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function validateLogin(req, res, next) {
    const { email, password } = req.body;

    try {
        const userExists = await getUserByEmail(email);
        if (!userExists) return res.status(401).send({ message: "Email/password is incorrect" });

        const passwordisCorrect = bcrypt.compareSync(password, userExists.password);
        if(!passwordisCorrect) return res.status(401).send({ message: "Email/password is incorrect" });

        res.locals.id = userExists.id;

        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}