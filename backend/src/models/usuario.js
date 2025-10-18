const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

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

usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) { 
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
});

usuarioSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.senha);
};

const Usuario = mongoose.model('Usuario', usuarioSchema); 
module.exports = Usuario;