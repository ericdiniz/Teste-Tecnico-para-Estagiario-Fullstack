import { db } from "../db.js";

import dotenv from 'dotenv';
dotenv.config();


const secretKey = process.env.JWT_SECRET;

export const getTasksByIdUser = (req, res, next) => {
    const { idUser } = req.body;

    const q = "SELECT * FROM tasks where id=?";

    db.query(q, (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
}