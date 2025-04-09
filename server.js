// Importa as dependências
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

// Configurações
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'database', 'MGV.db');

// Conexão com o banco
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err);
  } else {
    console.log('Conectado ao SQLite!');
    criarTabela(); // Cria a tabela se não existir
  }
});

// Cria tabela de usuários
function criarTabela() {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Middlewares
app.use(express.static('public')); // Serve arquivos estáticos
app.use(express.urlencoded({ extended: true })); // Para receber dados de formulários

// Rota do formulário
app.post('/cadastrar', (req, res) => {
  const { nome, email } = req.body;
  
  // Prevenção contra SQL Injection
  db.run(
    'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
    [nome, email],
    function(err) {
      if (err) {
        return res.status(400).send('Erro: ' + err.message);
      }
      res.send('Cadastro realizado com sucesso!');
    }
  );
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
