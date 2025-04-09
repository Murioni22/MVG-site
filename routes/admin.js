const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../private/auth'); // Arquivo de autenticação

// Middleware de proteção
router.use((req, res, next) => {
  if (auth.checkAuth(req)) {
    console.log('Acesso autorizado para:', req.auth.user);
    return next();
  }
  
  console.warn('Tentativa de acesso não autorizado:', req.ip);
  res.set('WWW-Authenticate', 'Basic realm="Área Administrativa - MVG Charcutaria"');
  res.status(401).send(`
    <h1 style="color: #8B0000">Acesso não autorizado</h1>
    <p>Credenciais inválidas ou faltando</p>
    <a href="/">Voltar ao site</a>
  `);
});

// Rota do formulário de cadastro
router.get('/cadastro', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../private', 'cadastro.html'), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error('Erro ao carregar formulário:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota para listar cadastros (exemplo adicional)
router.get('/cadastros', (req, res) => {
  const db = require('../database/MGV.db'); // Ajuste conforme sua conexão
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;