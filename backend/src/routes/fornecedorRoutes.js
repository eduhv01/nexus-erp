const express = require('express');
const router = express.Router();

const { 
  criarFornecedor, 
  obterFornecedores, 
  obterFornecedorPorId, 
  atualizarFornecedor, 
  deletarFornecedor 
} = require('../controllers/fornecedorController.js');

const { protegerRota } = require('../middleware/autenticacaoMiddleware.js');

router.route('/')
  .post(protegerRota, criarFornecedor) 
  .get(protegerRota, obterFornecedores);  

router.route('/:id')
  .get(protegerRota, obterFornecedorPorId)
  .put(protegerRota, atualizarFornecedor)
  .delete(protegerRota, deletarFornecedor);

module.exports = router;