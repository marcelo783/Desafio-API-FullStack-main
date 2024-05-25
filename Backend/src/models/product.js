// product.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/DB');

const Product = sequelize.define('Product', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Product;
