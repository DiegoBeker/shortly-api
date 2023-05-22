import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function insertUser(body) {
    const { name, email, password } = body;
    const hash = bcrypt.hashSync(password, 10);

    await db.query(`
            INSERT INTO users (name,email,password)
            VALUES ($1, $2, $3)
    `, [name, email, hash]);
}

export async function getUsersRanking() {
    const ranking = await db.query(`
        SELECT users.id, users.name, COALESCE(links_visit_count.sum_visit_count, 0) as "visitCount", COALESCE(links_count.links_count, 0) as "linksCount"
        FROM users
        LEFT JOIN (
            SELECT "userId", SUM("visitCount") as sum_visit_count
            FROM links
            GROUP BY "userId"
        ) links_visit_count ON users.id = links_visit_count."userId"
        LEFT JOIN (
            SELECT "userId", COUNT(*) as links_count
            FROM links
            GROUP BY "userId"
        ) links_count ON users.id = links_count."userId"
        ORDER BY "visitCount" DESC
        LIMIT 10;
    `);

    return ranking.rows;
}

export async function getAllUserInfo(userId) {
    const userinfo = await db.query(`
            SELECT users.id, users.name, SUM(links."visitCount") as "visitCount"
            FROM users,links
            WHERE users.id=$1 and links."userId"=$1
            GROUP BY users.id;
        `, [userId]);
    const linksList = await db.query(`SELECT id,url,"shortUrl","visitCount" FROM links WHERE "userId"=$1`, [userId]);
    const allUserInfo = { ...userinfo.rows[0], shortenedUrls: linksList.rows };
    
    return allUserInfo;
}

export async function getUserByEmail(email){
    const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
    return user.rows[0];
}