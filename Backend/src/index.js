
const express = require('express');
const sequelize = require('./config/DB.js');
const app = express();
const cors = require('cors');
const { body, validationResult } = require('express-validator')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); 

app.use('/auth', authRoutes); // rota de autenticação
app.use('/users', userRoutes); // rota de usuário
app.use('/produtos', productRoutes); // rota de produtos

(async () => {
    try {
        await sequelize.sync();
        
        app.listen(3000, () => {
            console.log("Servidor iniciado na porta 3000");
        });
    } catch (error) {
        console.error('Erro ao sincronizar modelo com o banco de dados:', error);
    }
})();
