import dotenv from 'dotenv';
import express from "express";
import { getUsers, login, setUser } from "../controllers/userController.js";
import authenticateToken from '../middlewares/authenticateToken.js';

dotenv.config();

const router = express.Router()

router.get("/getUsers", authenticateToken, getUsers)

router.post("/cadastrar-usuario", setUser)

router.post("/login", login)

export default router;