const Menu = require('./Menu')
const {sequelize, DataTypes, Model} = require('./Sequelize');

class Restaurant extends Model {
    constructor(id, name, image_Link){
        super()

        this.id = id
        this.name = name 
        this.image_link = image_Link 
        this.menus = []
    }

    addMenu(menu){
        this.menus.push(menu)
    }
    removeMenuAt(index){
        this.menus.splice(index, 1)
    }
    removeMenu(menu){
        const index = this.menus.indexOf(menu)
        this.menus.splice(index, 1)
    }

}

Restaurant.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    name: DataTypes.STRING,
    image_link: DataTypes.STRING,
}, { 
    sequelize, 
    modelName: 'Restaurant' 
});


Restaurant.hasMany(Menu, { foreignKey: 'restaurant_id'});
Menu.belongsTo(Restaurant, { as: 'owner', foreignKey: 'restaurant_id'})

module.exports = Restaurant