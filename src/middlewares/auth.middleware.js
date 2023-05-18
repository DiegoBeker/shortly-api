import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function validateSignUp(req, res, next) {
    const { email, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) return res.status(422).send({ message: "Passwords do not match" });

        const emailExists = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if (emailExists.rows[0]) return res.status(409).send({ message: "Email already registered" });

        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function validateLogin(req, res, next) {
    const { email, password } = req.body;

    try {
        const userExists = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if (!userExists.rows[0]) return res.status(401).send({ message: "Email/password is incorrect" });

        const passwordisCorrect = bcrypt.compareSync(password, userExists.rows[0].password);
        if(!passwordisCorrect) return res.status(401).send({ message: "Email/password is incorrect" });

        res.locals.id = userExists.rows[0].id;

        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}