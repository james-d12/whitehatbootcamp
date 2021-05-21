const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './Server/Database/Banking.sqlite',
    logging: false
});

module.exports = sequelize;