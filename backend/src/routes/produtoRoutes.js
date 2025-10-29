const express = require('express');
const router = express.Router();

const { criarProduto, obterProdutos } = require('../controllers/produtoController.js');

const { protegerRota } = require('../middleware/autenticacaoMiddleware.js'); 

router.route('/')
  .post(protegerRota, criarProduto) 
  .get(protegerRota, obterProdutos);  

module.exports = router;