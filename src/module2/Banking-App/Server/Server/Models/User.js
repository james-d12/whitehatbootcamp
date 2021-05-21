const sequelize = require("./Config");
const bcrypt = require("bcrypt");
const {DataTypes, Model} = require('sequelize');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    money: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: true
        }
    }
}, 
{
    sequelize,
    timestamps: false,
    primaryKey: true,
});


module.exports = User;