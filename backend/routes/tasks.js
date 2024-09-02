import dotenv from 'dotenv';
import express from "express";
import { getTasksByIdUser } from "../controllers/taskController.js";

dotenv.config();

const router = express.Router()

router.get("/getTasksByIdUser", getTasksByIdUser)

export default router;