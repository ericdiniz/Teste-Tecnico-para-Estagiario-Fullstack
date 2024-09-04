import dotenv from 'dotenv';
import express from "express";
import { createTasks, deleteTasks, getTasksByIdUser, updateTasks } from "../controllers/taskController.js";

dotenv.config();

const router = express.Router()

router.get("/getTasksByIdUser/:user_id", getTasksByIdUser);
router.post("/createTasks", createTasks)
router.patch("/updateTasks/:id", updateTasks);
router.delete("/deleteTasks/", deleteTasks);


export default router;