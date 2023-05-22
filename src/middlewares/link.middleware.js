import { getLinkByIdWithUser } from "../repositories/links.repository.js";

export async function validateOwnership(req, res, next) {
    const { userId } = res.locals.session;
    const { id } = req.params;

    try {
        const link = await getLinkByIdWithUser(id);
        
        if (!link) return res.status(404).send("Short url not found");

        if(link.userId !== userId) return res.status(401).send({message:"Can't delete, you are not the owner"});

        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}