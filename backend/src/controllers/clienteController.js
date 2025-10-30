const Cliente = require('../models/cliente.js');

const criarCliente = async (req, res) => {
  try {
    const { nome, clienteID, contato, endereco, email, datNascimento } = req.body;

if (!nome || !clienteID || !email || !contato) {
      return res.status(400).json({ mensagem: 'Campos nome, clienteID, email e contato são obrigatórios.' });
    }

    const cliente = new Cliente({
      nome,
      clienteID,
      contato,
      endereco,
      email,
      datNascimento,
    });

    const clienteCriado = await cliente.save();
    res.status(201).json(clienteCriado);

  } catch (error) {
    if (error.code === 11000) { // Erro de duplicidade (para clienteID ou email)
        return res.status(400).json({ mensagem: 'Erro: ClienteID ou Email já cadastrado.' });
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
    console.error("Erro ao obter cliente por ID:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const atualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);

    if (cliente) {
      cliente.nome = req.body.nome || cliente.nome;
      cliente.clienteID = req.body.clienteID || cliente.clienteID;
      cliente.contato = req.body.contato || cliente.contato;
      cliente.endereco = req.body.endereco || cliente.endereco;
      cliente.email = req.body.email || cliente.email;
      cliente.datNascimento = req.body.datNascimento || cliente.datNascimento;

      const clienteAtualizado = await cliente.save();
      res.json(clienteAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Cliente não encontrado para atualização.' });
    }
  } catch (error) {
     if (error.code === 11000) { 
        return res.status(400).json({ mensagem: 'Erro: ClienteID ou Email já cadastrado para outro cliente.' });
    }
    console.error("Erro ao atualizar o cliente:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const deletarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);

    if (cliente) {
      await Cliente.deleteOne({ _id: req.params.id });
      res.json({ mensagem: 'Cliente excluído.' });
    } else {
      res.status(404).json({ mensagem: 'Cliente não encontrado para exclusão.' });
    }
  } catch (error) {
    console.error("Erro ao excluir o cliente:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};
module.exports = { 
  criarCliente, 
  obterClientes, 
  obterClientePorId, 
  atualizarCliente, 
  deletarCliente 
};