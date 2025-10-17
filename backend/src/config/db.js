const moongose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await moongose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Conectado`);   
   }catch (error) {

    console.error(`Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;