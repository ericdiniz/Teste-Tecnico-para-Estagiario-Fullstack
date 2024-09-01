import { db } from "../db.js";

export const getUsers = (req, res, next) => {
    const q = "SELECT * FROM users"

    db.query(q, (err, data) => {
        if (err) return err.json(err)
        console.log(data)
        return res.status(200).json(data)
    })
}