import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

export const db = mysql.createConnection({
    host: process.env.HOST || "localhost",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "12345678",
    database: process.env.DATABASE || "gerenciadorTarefas",
    allowPublicKeyRetrieval: true,
});

// db.connect((err) => {
//     if (err) {
//         console.log("Erro ao conectar ao banco de dados:", err);
//         return;
//     }
//     console.log("Conectado ao banco de dados com sucesso!");
// });
