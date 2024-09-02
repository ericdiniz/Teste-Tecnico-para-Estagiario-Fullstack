import { db } from "../db.js";

import dotenv from 'dotenv';
dotenv.config();

export const getTasksByIdUser = (req, res, next) => {
    const { user_id } = req.body;



    const q = "SELECT * FROM tasks where user_id=?";

    db.query(q, [user_id], (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
}