const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const authRoutes = require('./routes/authRoutes.js');
const produtoRoutes = require('./routes/produtoRoutes.js'); 
const clienteRoutes = require('./routes/clienteRoutes.js');
const funcionarioRoutes = require('./routes/funcionarioRoutes.js');
const fornecedorRoutes = require('./routes/fornecedorRoutes.js');
const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('API do Nexus ERP está rodando...');
});

app.use('/api/auth', authRoutes);
app.use('/api/produtos', produtoRoutes); 
app.use('/api/clientes', clienteRoutes);
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/fornecedores', fornecedorRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});