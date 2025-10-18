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
    quantidade: {
        type: Number,
        required: true,
    },
}, {
  timestamps: true, 
});

const produto = moongose.model('Produto', produtoSchema);

module.exports = produto;