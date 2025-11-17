const Cliente = require('../models/cliente.js');

const criarCliente = async (req, res) => {
  try {
    const { nome, clienteID, cpf, contato, logradouro, numero, uf, cidade, email, dataNascimento } = req.body;

    if (!nome || !clienteID || !cpf || !contato || !logradouro || !numero || !uf || !cidade || !email || !dataNascimento) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    const cliente = new Cliente({
      nome,
      clienteID,
      cpf,
      contato,
      logradouro,
      numero,
      uf,
      cidade,
      email,
      dataNascimento,
    });

    const clienteCriado = await cliente.save();
    res.status(201).json(clienteCriado);

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ mensagem: 'Erro: clienteID, CPF ou email já cadastrado.' });
    }
    console.error("Erro ao criar cliente:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const obterClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find({});
    res.json(clientes);
  } catch (error) {
    console.error("Erro ao obter clientes:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const obterClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }
  } catch (error) {
    console.error("Erro ao obter cliente:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const atualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (cliente) {
      cliente.nome = req.body.nome || cliente.nome;
      cliente.clienteID = req.body.clienteID || cliente.clienteID;
      cliente.cpf = req.body.cpf || cliente.cpf;
      cliente.contato = req.body.contato || cliente.contato;
      cliente.logradouro = req.body.logradouro || cliente.logradouro;
      cliente.numero = req.body.numero || cliente.numero;
      cliente.uf = req.body.uf || cliente.uf;
      cliente.cidade = req.body.cidade || cliente.cidade;
      cliente.email = req.body.email || cliente.email;
      cliente.dataNascimento = req.body.dataNascimento || cliente.dataNascimento;

      const clienteAtualizado = await cliente.save();
      res.json(clienteAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const deletarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (cliente) {
      await cliente.remove();
      res.json({ mensagem: 'Cliente removido.' });
    } else {
      res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

module.exports = { criarCliente, obterClientes, obterClientePorId, atualizarCliente, deletarCliente };
