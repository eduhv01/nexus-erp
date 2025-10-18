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
    contato: {
        type: String,
        required: true,
    },
    dataAdmissao: {
        type: Date,
        required: true,
    },
    dataNascimento: {
        type: Date,
        required: true,
    },
}, {
  timestamps: true, 
});

const Funcionario = mongoose.model('Funcionario', funcionarioSchema);

module.exports = Funcionario;