const express = require('express');
const router = express.Router();

const { 
  criarCliente, 
  obterClientes, 
  obterClientePorId, 
  atualizarCliente, 
  deletarCliente 
} = require('../controllers/clienteController.js');

const { protegerRota } = require('../middleware/autenticacaoMiddleware.js');

router.route('/')
  .post(protegerRota, criarCliente) 
  .get(protegerRota, obterClientes);  

router.route('/:id')
  .get(protegerRota, obterClientePorId)
  .put(protegerRota, atualizarCliente)
  .delete(protegerRota, deletarCliente);

module.exports = router;