const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    produtoID: {
        type: Number,
        required: true,
        unique: true,
    },
    preco: {
        type: Number,
        required: true,
    },
    estoque: {
        type: Number,
        required: true,
    },
}, {
  timestamps: true, 
});

const produto = mongoose.model('Produto', produtoSchema);

module.exports = produto;