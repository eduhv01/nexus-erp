const Fornecedor = require('../models/fornecedor.js');

const criarFornecedor = async (req, res) => {
  try {
    const { nome, fornecedorID, cnpj, razaoSocial, nomeFantasia, inscricaoEstadual, contato, uf, cidade, logradouro, numero } = req.body;

    if (!nome || !fornecedorID || !cnpj || !razaoSocial || !nomeFantasia || !inscricaoEstadual || !contato || !uf || !cidade || !logradouro || !numero) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    const fornecedor = new Fornecedor({
      nome,
      fornecedorID,
      cnpj,
      razaoSocial,
      nomeFantasia,
      inscricaoEstadual,
      contato,
      uf,
      cidade,
      logradouro,
      numero,
    });

    const fornecedorCriado = await fornecedor.save();
    res.status(201).json(fornecedorCriado);

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ mensagem: 'Erro: fornecedorID ou CNPJ já cadastrado.' });
    }
    console.error("Erro ao criar fornecedor:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const obterFornecedores = async (req, res) => {
  try {
    const fornecedores = await Fornecedor.find({});
    res.json(fornecedores);
  } catch (error) {
    console.error("Erro ao obter fornecedores:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const obterFornecedorPorId = async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findById(req.params.id);
    if (fornecedor) {
      res.json(fornecedor);
    } else {
      res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
    }
  } catch (error) {
    console.error("Erro ao obter fornecedor:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const atualizarFornecedor = async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findById(req.params.id);
    if (fornecedor) {
      fornecedor.nome = req.body.nome || fornecedor.nome;
      fornecedor.fornecedorID = req.body.fornecedorID || fornecedor.fornecedorID;
      fornecedor.cnpj = req.body.cnpj || fornecedor.cnpj;
      fornecedor.razaoSocial = req.body.razaoSocial || fornecedor.razaoSocial;
      fornecedor.nomeFantasia = req.body.nomeFantasia || fornecedor.nomeFantasia;
      fornecedor.inscricaoEstadual = req.body.inscricaoEstadual || fornecedor.inscricaoEstadual;
      fornecedor.contato = req.body.contato || fornecedor.contato;
      fornecedor.uf = req.body.uf || fornecedor.uf;
      fornecedor.cidade = req.body.cidade || fornecedor.cidade;
      fornecedor.logradouro = req.body.logradouro || fornecedor.logradouro;
      fornecedor.numero = req.body.numero || fornecedor.numero;

      const fornecedorAtualizado = await fornecedor.save();
      res.json(fornecedorAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
    }
  } catch (error) {
    console.error("Erro ao atualizar fornecedor:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const deletarFornecedor = async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findById(req.params.id);
    if (fornecedor) {
      await fornecedor.remove();
      res.json({ mensagem: 'Fornecedor removido.' });
    } else {
      res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
    }
  } catch (error) {
    console.error("Erro ao deletar fornecedor:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

module.exports = { criarFornecedor, obterFornecedores, obterFornecedorPorId, atualizarFornecedor, deletarFornecedor };
