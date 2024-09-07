# Como rodar o backend

## 1. Instalar as dependências
Na pasta do backend, execute o seguinte comando para instalar todas as dependências necessárias:
npm install

## 2. Configurar as variáveis de ambiente
Crie um arquivo `.env` na raiz do backend (se ele ainda não existir) e adicione as seguintes variáveis:

JWT_SECRET=sua_chave_secreta DB_HOST=localhost DB_USER=root DB_PASSWORD=sua_senha_mysql DB_NAME=gerenciadorTarefas


## 3. Configurar o arquivo de conexão com o banco de dados
No arquivo `db.js`, configure a conexão utilizando o pacote `dotenv` para carregar as variáveis de ambiente do arquivo `.env`. Aqui está um exemplo de como o arquivo deve ficar:

```javascript
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados com sucesso!");
});
```

## Como rodar o MySQL e importar o banco de dados

1. Instalar o MySQL via Homebrew (MacOS):
    brew install mysql

2. Iniciar o serviço do MySQL:
    brew services start mysql

3. Verificar se o MySQL está rodando:
    mysql --version

4. Entrar no MySQL:
    mysql -u root -p

5. Criar o banco de dados:
    CREATE DATABASE gerenciadorTarefas;

6. Importar o banco de dados:
    mysql -u root -p gerenciadorTarefas < /caminho_para_arquivo/converted_for_mysql.sql

7. Usar o banco de dados:
    USE gerenciadorTarefas;
    SHOW TABLES;
