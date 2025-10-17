const connectDB = require('./config/db');

const dotenv = require('dotenv'); 
dotenv.config();

console.log('Iniciando conexão com o banco de dados...');

connectDB();

console.log('Aplicação iniciada. Aguardando conexão com o banco...');