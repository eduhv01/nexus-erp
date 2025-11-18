const Funcionario = require('../models/funcionario.js');

const criarFuncionario = async (req, res) => {
  try {
    const { nome, funcionarioID, cpf, email, contato} = req.body;

    if (!nome || !funcionarioID || !cpf || !email || !contato) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    const funcionario = new Funcionario({
      nome,
      funcionarioID,
      cpf,
      email,
      contato,
    });

    const funcionarioCriado = await funcionario.save();
    res.status(201).json(funcionarioCriado);

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ mensagem: 'Erro: funcionarioID, CPF ou email já cadastrado.' });
    }
    console.error("Erro ao criar funcionário:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const obterFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.find({});
    res.json(funcionarios);
  } catch (error) {
    console.error("Erro ao obter funcionários:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const obterFuncionarioPorId = async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id);
    if (funcionario) {
      res.json(funcionario);
    } else {
      res.status(404).json({ mensagem: 'Funcionário não encontrado.' });
    }
  } catch (error) {
    console.error("Erro ao obter funcionário:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const atualizarFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id);
    if (funcionario) {
      funcionario.nome = req.body.nome || funcionario.nome;
      funcionario.funcionarioID = req.body.funcionarioID || funcionario.funcionarioID;
      funcionario.cpf = req.body.cpf || funcionario.cpf;
      funcionario.email = req.body.email || funcionario.email;
      funcionario.contato = req.body.contato || funcionario.contato;

      const funcionarioAtualizado = await funcionario.save();
      res.json(funcionarioAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Funcionário não encontrado.' });
    }
  } catch (error) {
    console.error("Erro ao atualizar funcionário:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const deletarFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id);
    if (funcionario) {
      await funcionario.remove();
      res.json({ mensagem: 'Funcionário removido.' });
    } else {
      res.status(404).json({ mensagem: 'Funcionário não encontrado.' });
    }
  } catch (error) {
    console.error("Erro ao deletar funcionário:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

module.exports = { criarFuncionario, obterFuncionarios, obterFuncionarioPorId, atualizarFuncionario, deletarFuncionario };
