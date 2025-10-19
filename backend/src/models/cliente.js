const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    clienteID: {
        type: Number,
        required: true,
        unique: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    contato: {
        type: String,
        required: true,
    },
    logradouro: {
        type: String,
        required: true,
    },
    numero: {
        type: String,
        required: true,    
    },
    uf: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dataNascimento: {
        type: Date,
        required: true,
    },
}, {
  timestamps: true, 
});

const cliente = mongoose.model('Cliente', clienteSchema);

module.exports = cliente;