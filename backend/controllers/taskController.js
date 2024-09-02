import { db } from "../db.js";

import dotenv from 'dotenv';
dotenv.config();

export const getTasksByIdUser = (req, res, next) => {
    const { idUser } = req.body;

    const q = "SELECT * FROM tasks where user_id=?";

    db.query(q, [idUser], (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
}