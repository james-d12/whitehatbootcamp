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
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isAlphanumeric: true
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isAlphanumeric: true
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isAlphanumeric: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isAlphanumeric: true
        }
    },
}, 
{
    hooks: {
        beforeCreate: async (user) => {
          try {
            user.password = await bcrypt.hash(user.password, 10);
          } catch(err){
            console.error(`Error hashing password for user ${user.username}`);
          }
        }
    },  
    sequelize,
    timestamps: false,
    primaryKey: true,
});


module.exports = User;