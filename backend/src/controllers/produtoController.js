const Produto = require('../models/produto.js'); 

const criarProduto = async (req, res) => {
  try {
    const { nome, produtoID, preco, estoque } = req.body;

    if (!nome || !produtoID || !preco || estoque === undefined) { 
       return res.status(400).json({ mensagem: 'Campos nome, produtoID, preco e estoque são obrigatórios.' });
    }
    
    const produto = new Produto({
      nome,
      produtoID,
      preco,
      estoque,
    });

    const produtoCriado = await produto.save();
    res.status(201).json(produtoCriado); 
    
  } catch (error) {
    if (error.code === 11000) { 
        return res.status(400).json({ mensagem: 'Erro: produtoID já cadastrado.' });
    }
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const obterProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find({});
    res.json(produtos); 
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

module.exports = { criarProduto, obterProdutos };