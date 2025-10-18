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
    contato: {
        type: String,
        required: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    datNascimento: {
        type: Date,
        required: true,
    },
}, {
  timestamps: true, 
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;