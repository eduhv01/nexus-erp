const express = require('express');
const router = express.Router();

const { 
  criarProduto, 
  obterProdutos, 
  obterProdutoPorId, 
  atualizarProduto,  
  deletarProduto    
} = require('../controllers/produtoController.js');

const { protegerRota } = require('../middleware/autenticacaoMiddleware.js');

router.route('/')
  .post(protegerRota, criarProduto) 
  .get(protegerRota, obterProdutos);  

router.route('/:id')
  .get(protegerRota, obterProdutoPorId)  
  .put(protegerRota, atualizarProduto)    
  .delete(protegerRota, deletarProduto);  

module.exports = router;