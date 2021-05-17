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
        unique: true,
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
    group: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
        validate: {
            notEmpty: true,
            isAlphanumeric: true
        }
    }
}, 
{
    hooks: {
        beforeCreate: async (user) => {
          try {
            user.password = await bcrypt.hash(user.password, 10);
          } catch(err){
            console.error(`Error hashing password for user ${user.username}`);
          }
        },
        beforeBulkCreate: (users) => {
            for (const user of users) {
                user.password = bcrypt.hashSync(user.password, 10);
            }
        },
    },
    instanceMethods: {
        compare: async(user, password) =>{
            try {
                return await bcrypt.compare(password, user.password);
            } catch (error) {
                console.error(`Error comparing passwords with Error: ${error.message}.`);
                return false;
            }
        }
    },
    sequelize,
    timestamps: false,
    primaryKey: true,
});


module.exports = User;