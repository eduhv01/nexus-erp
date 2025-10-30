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
    cidade: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, {
  timestamps: true, 
});

const cliente = mongoose.model('Cliente', clienteSchema);

module.exports = cliente;