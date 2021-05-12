const sequelize = require("./Config");
const {DataTypes, Model} = require('sequelize');

const Plane = require("./Plane");

class Airport extends Model {}

Airport.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    icao: {
        type: DataTypes.STRING
    },
    iata: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    elevation: {
        type: DataTypes.DECIMAL,
        validate: {
            isDecimal: true
        }
    },
    lat: {
        type: DataTypes.DECIMAL,
        validate: {
            isDecimal: true
        }
    },
    lon: {
        type: DataTypes.DECIMAL,
        validate: {
            isDecimal: true
        }
    },
    tz: {
        type: DataTypes.STRING
    }
}, 
{
    sequelize,
    timestamps: false,
    primaryKey: true,
});


Airport.hasMany(Plane, {as: "planes", foreignKey: 'airport_id'})
Plane.belongsTo(Airport, {foreignKey: 'airport_id'})

module.exports = Airport;