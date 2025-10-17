const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
    },
}, {
  timestamps: true, 
});

const usuario = mongoose.model('User', usuarioSchema);

module.exports = usuario;