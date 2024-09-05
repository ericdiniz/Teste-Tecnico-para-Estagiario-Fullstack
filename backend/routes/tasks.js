import dotenv from 'dotenv';
import express from "express";
import { createTasks, deleteTasks, finalizeTask, getTasksByIdUser, updateTasks } from "../controllers/taskController.js";
import authenticateToken from '../middlewares/authenticateToken.js';

dotenv.config();

const router = express.Router()

router.get("/getTasksByIdUser/:user_id", authenticateToken, getTasksByIdUser);
router.post("/createTasks", authenticateToken, createTasks)
router.patch("/updateTasks/:id", authenticateToken, updateTasks);
router.delete("/deleteTasks", authenticateToken, deleteTasks);
router.patch("/finalizeTask/:id", authenticateToken, finalizeTask);


export default router;