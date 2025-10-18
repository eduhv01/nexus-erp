const mongoose = require('mongoose');

const fornecedorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    fornecedorID: {
        type: Number,
        required: true,
        unique: true,
    },
    cnpj: {
        type: String,
        required: true,
        unique: true,
    },
    razaoSocial: {
        type: String,
        required: true,
    },
    nomeFantasia: {
        type: String,
        required: true,
    },
    inscricaoEstadual: {
        type: String,
        required: true,
    },
    contato: {
        type: String,
        required: true
    },
    uf: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    logradouro: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    }
}, {
  timestamps: true, 
});


module.exports = mongoose.model('Fornecedor', fornecedorSchema);