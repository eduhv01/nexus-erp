const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
}, {
  timestamps: true, 
});

const funcionario = mongoose.model('Funcionario', funcionarioSchema);

module.exports = funcionario;