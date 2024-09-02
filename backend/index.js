import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import userRoutes from "./routes/users.js";

dotenv.config();


const app = express()

app.use(express.json())
app.use(cors())

app.use("/", userRoutes)

app.listen(9999)