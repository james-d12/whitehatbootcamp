const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './Server/Database/Users.sqlite',
    logging: false
});

module.exports = sequelize;