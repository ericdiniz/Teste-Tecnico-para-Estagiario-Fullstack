import dotenv from 'dotenv';
import express from "express";
import { createTasks, getTasksByIdUser, updateTasks } from "../controllers/taskController.js";

dotenv.config();

const router = express.Router()

router.get("/getTasksByIdUser", getTasksByIdUser)
router.post("/createTasks", createTasks)
router.patch("/updateTasks/:id", updateTasks);


export default router;