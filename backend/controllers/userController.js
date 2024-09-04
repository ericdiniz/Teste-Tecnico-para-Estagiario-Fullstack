import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../db.js";

import dotenv from 'dotenv';
dotenv.config();


const secretKey = process.env.JWT_SECRET;

export const getUsers = (req, res, next) => {
    const q = "SELECT * FROM users";

    db.query(q, (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
}

export const setUser = (req, res, next) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(400).json(err);
        }
        const q = "INSERT INTO users (email, password) VALUES (?, ?);";
        db.query(q, [email, hash], (err, data) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.status(200).json(data);
        });
    });
}


export const login = (req, res, next) => {
    const { email, password } = req.body;
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [email], (err, results) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(400).json(err);
                }
                if (isMatch) {
                    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1y' });
                    return res.status(201).json({ message: "Login successful", token, data: user });
                } else {
                    return res.status(401).json({ message: "Password incorrect" });
                }
            });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    });
};
