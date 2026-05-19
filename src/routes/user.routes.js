const express = require('express');
const router = express.Router();
const quitandaService = require('../services/user.service');

// Rota para cadastrar um item na quitanda (frutas, legumes, etc)
router.post('/produtos', (req, res) => {
  try {
    const novoProduto = quitandaService.cadastrarProduto(req.body);
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

module.exports = router;