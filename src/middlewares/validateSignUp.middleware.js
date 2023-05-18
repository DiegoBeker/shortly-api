import { db } from "../database/database.connection.js";

export async function validateSignUp(req, res, next) {
    const { email, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) return res.status(422).send({ message: "Passwords does not match" });

        const emailExists = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if(emailExists.rows[0]) return res.status(409).send({message: "Email already registered"});
        console.log(emailExists.rows);
        next();
    } catch (error) {

    }
}