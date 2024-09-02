import dotenv from 'dotenv';
import express from "express";
import authenticateToken from '../middlewares/authenticateToken.js';

dotenv.config();


const router = express.Router()

router.get("/getTasksByIdUser", authenticateToken, getTasksByIdUser)


export default router;