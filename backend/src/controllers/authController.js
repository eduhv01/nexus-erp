const Usuario = require('../models/usuario.js'); 
const jwt = require('jsonwebtoken');

const generateToken = (id) => {

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', 
  });
};

const registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body; 

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos: nome, email e senha.' });
    }
    const userExists = await Usuario.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Este e-mail já está cadastrado.' });
    }
    const usuario = await Usuario.create({
      nome,
      email,
      senha, 
    });

    if (usuario) {
      res.status(201).json({
        _id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        token: generateToken(usuario._id),
      });
    } else {
      res.status(400).json({ message: 'Dados do usuário inválidos.' });
    }
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: `Erro interno: ${error.message}` });
  }
};

const authUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (usuario && (await usuario.matchPassword(senha))) { 
      res.json({
        _id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        token: generateToken(usuario._id),
      });
    } else {
      res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    res.status(500).json({ message: `Erro interno do servidor: ${error.message}` });
  }
};

module.exports = { registerUser, authUser };