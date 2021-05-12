const sequelize = require("./Config");
const {DataTypes, Model} = require('sequelize');

class Plane extends Model {}

Plane.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    origin: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    flight_number: { 
        type: DataTypes.STRING,
        allowNull: false
    }
}, 
{
    sequelize,
    timestamps: false,
    primaryKey: true
});

module.exports = Plane;