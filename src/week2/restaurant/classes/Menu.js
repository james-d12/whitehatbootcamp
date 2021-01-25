const MenuItem = require('./MenuItem')
const {sequelize, DataTypes, Model} = require('./Sequelize');

class Menu extends Model {
    constructor(title, restaurant_id){
        super()
        this.title = title 
        this.restaurant_id = restaurant_id
        this.menuItems = []
    }

    addMenuItems(menuItems){
        this.menuItems.concat(menuItems)
    }
    addMenuItem(menuItem){
        this.menuItems.push(menuItem)
    }
    removeMenuItemAt(index){
        this.menuItems.splice(index, 1)
    }
    removeMenuItem(menuItem){
        const index = this.menuItems.indexOf(menuItem)
        this.menuItems.splice(index, 1)
    }
}

Menu.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    title: DataTypes.STRING,
}, { 
    sequelize, 
    modelName: 'Menu' 
});


Menu.hasMany(MenuItem, { foreignKey: 'menu_id'});
MenuItem.belongsTo(Menu, { as: 'owner', foreignKey: 'menu_id'})

module.exports = Menu