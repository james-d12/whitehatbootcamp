const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './database/restaurant.sqlite'
});

class MenuItem extends Model {}
class Menu extends Model {}
class Restaurant extends Model {}

MenuItem.init({
    name: DataTypes.STRING,
    price: DataTypes.REAL,
    menuID: DataTypes.INTEGER
}, { 
    sequelize, 
    timestamps: false,
    modelName: 'MenuItem' 
});

Menu.init({
    title: DataTypes.STRING,
    restaurantID: DataTypes.INTEGER
}, { 
    sequelize,
    timestamps: false, 
    modelName: 'Menu' 
});

Restaurant.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
}, { 
    sequelize, 
    timestamps: false,
    modelName: 'Restaurant' 
});

Restaurant.hasMany(Menu, { foreignKey: 'restaurantID'});
Menu.belongsTo(Restaurant, { as: 'owner', foreignKey: 'restaurantID'})

Menu.hasMany(MenuItem, { foreignKey: 'menuID'});
MenuItem.belongsTo(Menu, { as: 'owner', foreignKey: 'menuID'})

module.exports = { sequelize, DataTypes, Model, Restaurant, Menu, MenuItem }