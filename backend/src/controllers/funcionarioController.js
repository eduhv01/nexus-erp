const Funcionario = require('../models/funcionario.js'); 

const criarFuncionario = async (req, res) => {
  try {
    const { nome, funcionarioID, email, cargo, contato } = req.body;

    if (!nome || !funcionarioID || !email || !cargo) {
      return res.status(400).json({ mensagem: 'Campos nome, funcionarioID, email e cargo são obrigatórios.' });
    }

    const funcionario = new Funcionario({
      nome,
      funcionarioID,
      email,
      cargo,
      contato,
    });

    const funcionarioCriado = await funcionario.save();
    res.status(201).json(funcionarioCriado);

  } catch (error) {
    if (error.code === 11000) { 
        return res.status(400).json({ mensagem: 'Erro: FuncionarioID ou Email já cadastrado.' });
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
    console.error("Erro ao obter funcionário por ID:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const atualizarFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id);

    if (funcionario) {
      funcionario.nome = req.body.nome || funcionario.nome;
      funcionario.funcionarioID = req.body.funcionarioID || funcionario.funcionarioID;
      funcionario.email = req.body.email || funcionario.email;
      funcionario.cargo = req.body.cargo || funcionario.cargo;
      funcionario.contato = req.body.contato || funcionario.contato;

      const funcionarioAtualizado = await funcionario.save();
      res.json(funcionarioAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Funcionário não encontrado para atualização.' });
    }
  } catch (error) {
     if (error.code === 11000) { 
        return res.status(400).json({ mensagem: 'Erro: FuncionarioID ou Email já cadastrado para outro funcionário.' });
    }
    console.error("Erro ao atualizar funcionário:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

const deletarFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id);

    if (funcionario) {
      await Funcionario.deleteOne({ _id: req.params.id });
      res.json({ mensagem: 'Funcionário excluído com sucesso.' });
    } else {
      res.status(404).json({ mensagem: 'Funcionário não encontrado para exclusão.' });
    }
  } catch (error) {
    console.error("Erro ao deletar funcionário:", error);
    res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
  }
};

module.exports = { 
  criarFuncionario, 
  obterFuncionarios, 
  obterFuncionarioPorId, 
  atualizarFuncionario, 
  deletarFuncionario 
};