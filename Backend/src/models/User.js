const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../config/DB');



const User = sequelize.define('User', {
    nome: DataTypes.STRING,
    email: { unique: true, type: DataTypes.STRING },
    senha: DataTypes.STRING,
    cpf: { unique: true, type: DataTypes.STRING },
});



module.exports = User;


