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
    price: DataTypes.INTEGER,
}, {
    sequelize,
    timestamps: false
});

Menu.init({
    title: DataTypes.STRING}, {
    sequelize,
    timestamps: false
});

Restaurant.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

Menu.hasMany(MenuItem, {as: 'items', foreignKey: 'menu_id'});
MenuItem.belongsTo(Menu, {foreignKey: 'menu_id'});

Restaurant.hasMany(Menu, {as: 'menus', foreignKey: 'restaurant_id'})
Menu.belongsTo(Restaurant, {foreignKey: 'restaurant_id'})

module.exports = { sequelize, DataTypes, Model, Restaurant, Menu, MenuItem }