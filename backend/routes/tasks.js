import dotenv from 'dotenv';
import express from "express";
import { createTasks, deleteTasks, finalizeTask, getTasksByIdUser, updateTasks } from "../controllers/taskController.js";

dotenv.config();

const router = express.Router()

router.get("/getTasksByIdUser/:user_id", getTasksByIdUser);
router.post("/createTasks", createTasks)
router.patch("/updateTasks/:id", updateTasks);
router.delete("/deleteTasks", deleteTasks);
router.patch("/finalizeTask/:id", finalizeTask);


export default router;