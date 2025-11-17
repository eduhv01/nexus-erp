const Produto = require('../models/produto.js'); 
const asyncHandler = require('express-async-handler'); 

// @desc    Criar um novo produto
// @route   POST /api/produtos
// @access  Private 
const createProduct = asyncHandler(async (req, res) => {
    const { nome, produtoID, preco, estoque } = req.body; 

    // Validação de Campos Obrigatórios (fixa o bug anterior)
    if (!nome || !produtoID || preco === undefined || estoque === undefined) { 
        res.status(400); 
        throw new Error('Nome, ID, preço e estoque são obrigatórios.');
    }

    // Validação de Unicidade
    const productExists = await Produto.findOne({ $or: [{ nome }, { produtoID }] });
    if (productExists) {
        res.status(400);
        throw new Error('Produto com este nome ou ID já existe.');
    }

    const product = new Produto({
        nome,
        produtoID,
        preco,
        estoque 
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Obter todos os produtos
// @route   GET /api/produtos
// @access  Private 
const getProducts = asyncHandler(async (req, res) => {
    const products = await Produto.find({});
    res.status(200).json(products);
});

// @desc    Obter um único produto por ID
// @route   GET /api/produtos/:id
// @access  Private
const getProductById = asyncHandler(async (req, res) => { 
    const product = await Produto.findById(req.params.id);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404);
        throw new Error('Produto não encontrado.');
    }
});

// @desc    Atualizar um produto
// @route   PUT /api/produtos/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
    const { nome, produtoID, preco, estoque } = req.body;

    const product = await Produto.findById(req.params.id);

    if (product) {
        product.nome = nome !== undefined ? nome : product.nome;
        product.produtoID = produtoID !== undefined ? produtoID : product.produtoID;
        product.preco = preco !== undefined ? preco : product.preco;
        product.estoque = estoque !== undefined ? estoque : product.estoque; 

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Produto não encontrado.');
    }
});

// @desc    Excluir um produto
// @route   DELETE /api/produtos/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => { 
    const product = await Produto.findById(req.params.id);

    if (product) {
        await product.deleteOne(); 
        res.status(200).json({ message: 'Produto removido.' });
    } else {
        res.status(404);
        throw new Error('Produto não encontrado.');
    }
});

module.exports = {
    createProduct,
    getProducts,  
    getProductById,
    updateProduct,
    deleteProduct
};