// backend/src/routes/produtoRoutes.js

const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/produtoController');

const { protegerRota } = require('../middleware/autenticacaoMiddleware'); // Importa o middleware de proteção

// Rotas para /api/produtos
// Todas essas rotas exigem autenticação (protect)
router.route('/')
    .post(protegerRota, createProduct) // Rota para criar um produto (POST)
    .get(protegerRota, getProducts);   // Rota para obter todos os produtos (GET)

// Rotas para /api/produtos/:id
// Todas essas rotas exigem autenticação (protect)
router.route('/:id')
    .get(protegerRota, getProductById)   // <--- CORRIGIDO: Rota para obter um produto por ID (GET)
    .put(protegerRota, updateProduct)    // Rota para atualizar um produto por ID (PUT)
    .delete(protegerRota, deleteProduct); // Rota para deletar um produto por ID (DELETE)

module.exports = router; // Exporta o router para ser usado no server.js