const express = require('express');
const router = express.Router();

const { 
  criarFuncionario, 
  obterFuncionarios, 
  obterFuncionarioPorId, 
  atualizarFuncionario, 
  deletarFuncionario 
} = require('../controllers/funcionarioController.js');

const { protegerRota } = require('../middleware/autenticacaoMiddleware.js');

router.route('/')
  .post(protegerRota, criarFuncionario) 
  .get(protegerRota, obterFuncionarios);  

router.route('/:id')
  .get(protegerRota, obterFuncionarioPorId)
  .put(protegerRota, atualizarFuncionario)
  .delete(protegerRota, deletarFuncionario);

module.exports = router;