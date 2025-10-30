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
    console.error("Erro ao obter os produtos:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const obterProdutoPorId = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);

    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error("Erro ao obter produto por ID:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const atualizarProduto = async (req, res) => {
  try {
    const { nome, produtoID, preco, estoque } = req.body;
    const produto = await Produto.findById(req.params.id);

    if (produto) {
      produto.nome = nome !== undefined ? nome : produto.nome;
      produto.produtoID = produtoID !== undefined ? produtoID : produto.produtoID;
      produto.preco = preco !== undefined ? preco : produto.preco;
      produto.estoque = estoque !== undefined ? estoque : produto.estoque;

      const produtoAtualizado = await produto.save(); 
      res.json(produtoAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Produto não encontrado para atualização.' });
    }
  } catch (error) {
     if (error.code === 11000) { 
        return res.status(400).json({ mensagem: 'Erro: produtoID já está cadastrado.' });
    }
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const deletarProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);

    if (produto) {
      await Produto.deleteOne({ _id: req.params.id });
      res.json({ mensagem: 'Produto deletado.' });
    } else {
      res.status(404).json({ mensagem: 'Produto não encontrado para exclusão.' });
    }
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

module.exports = { criarProduto, obterProdutos, obterProdutoPorId, atualizarProduto, deletarProduto };