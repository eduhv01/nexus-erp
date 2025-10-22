const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.js'); 

const protegerRota = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decodificado = jwt.verify(token, process.env.JWT_SECRET);

      req.usuario = await Usuario.findById(decodificado.id).select('-senha');
      next();
    } catch (error) {
      console.error("Erro na verificação do token:", error);
      res.status(401).json({ mensagem: 'Não autorizado, token inválido.' });
    }
  }

  if (!token) {
    res.status(401).json({ mensagem: 'Não autorizado, token não encontrado.' });
  }
};

module.exports = { protegerRota };