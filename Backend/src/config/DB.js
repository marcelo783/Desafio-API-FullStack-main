const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/desafioBD.db', // Caminho para o arquivo do banco de dados SQLite
});

module.exports = sequelize;
