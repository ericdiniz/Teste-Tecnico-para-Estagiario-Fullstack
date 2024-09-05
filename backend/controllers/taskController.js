import { db } from "../db.js";

import dotenv from 'dotenv';
dotenv.config();

export const getTasksByIdUser = (req, res, next) => {
    const { user_id } = req.params;
    const q = "SELECT * FROM tasks WHERE user_id=?";

    db.query(q, [user_id], (err, data) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(data);
    });
}


export const createTasks = (req, res, next) => {
    const { title, description, user_id } = req.body;

    const q = "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?);";

    db.query(q, [title, description, user_id], (err, data) => {
        if (err) {
            return res.status(400).json(err);
        }

        return res.status(201).json({ message: "Task created successfully", task: { title, description, user_id } });
    });
};

export const updateTasks = (req, res, next) => {
    const { id } = req.params; // ID da tarefa vem na URL
    const { title, description, user_id } = req.body; // Dados e ID do usuário no corpo

    const q = "UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?;";

    db.query(q, [title, description, id, user_id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: "Error updating task", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found or user not authorized to update this task" });
        }
        return res.status(200).json({ message: "Task updated successfully" });
    });
};

export const deleteTasks = (req, res, next) => {
    const { id, user_id } = req.body;

    const q = "DELETE FROM tasks WHERE id = ? AND user_id = ?;";

    db.query(q, [id, user_id], (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found or user not authorized to delete this task" });
        }
        return res.status(200).json({ message: "Task deleted successfully" });
    });
};

export const finalizeTask = (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body; // Pegamos o user_id no corpo da requisição

    const q = "UPDATE tasks SET finalizada = true WHERE id = ? AND user_id = ?";

    db.query(q, [id, user_id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao finalizar a tarefa", err });
        }
        return res.status(200).json({ message: "Tarefa finalizada com sucesso" });
    });
};
