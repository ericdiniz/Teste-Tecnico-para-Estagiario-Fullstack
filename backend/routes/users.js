import dotenv from 'dotenv';
import express from "express";
import { getUsers, login, setUser } from "../controllers/userController.js";
dotenv.config();


const router = express.Router()

router.get("/getUsers", getUsers)

router.post("/cadastrar-usuario", setUser)

router.post("/login", login)

export default router;