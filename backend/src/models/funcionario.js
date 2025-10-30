const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    funcionarioID: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    contato: {
        type: String,
        required: true,
    },
    dataAdmissao: {
        type: Date,
        required: false,
    },
}, {
  timestamps: true, 
});

const funcionario = mongoose.model('Funcionario', funcionarioSchema);

module.exports = funcionario;