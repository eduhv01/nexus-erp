// nexus-erp/backend/src/routes/produtoRoutes.js
const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/produtoController'); // <--- AQUI ESTÁ OK, SEM .js, pois é um módulo
const { protegerRota } = require('../middleware/autenticacaoMiddleware');

// Rotas protegidas (exigem que o usuário esteja logado)
router.route('/')
    .post(protegerRota, createProduct)
    .get(protegerRota, getProducts);

router.route('/:id')
    .get(protegerRota, getProductById)
    .put(protegerRota, updateProduct)
    .delete(protegerRota, deleteProduct);

module.exports = router;