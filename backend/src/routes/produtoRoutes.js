const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/produtoController');

const { protegerRota } = require('../middleware/autenticacaoMiddleware');

router.route('/')
    .post(protegerRota, createProduct) 
    .get(protegerRota, getProducts);   

router.route('/:id')
    .get(protegerRota, getProductById)   
    .put(protegerRota, updateProduct)    
    .delete(protegerRota, deleteProduct); 

module.exports = router;