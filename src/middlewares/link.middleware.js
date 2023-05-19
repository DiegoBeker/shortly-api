import { db } from "../database/database.connection.js";

export async function validateOwnership(req, res, next) {
    const { userId } = res.locals.session;
    const { id } = req.params;

    try {
        const link = await db.query(`SELECT * FROM links WHERE id=$1`, [id]);
        
        if (!link.rows[0]) return res.status(404).send("Short url not found");

        if(link.rows[0].userId !== userId) return res.status(401).send({message:"Can't delete, you are not the owner"});

        next();
    } catch (error) {
        
    }
}