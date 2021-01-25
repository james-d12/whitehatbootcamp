const {sequelize, DataTypes, Model} = require('./Sequelize');

class MenuItem extends Model {
    constructor(name, price, menu_id){
        super()
        this.name = name 
        this.price = price 
        this.menu_id = menu_id
    }
}

MenuItem.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    name: DataTypes.STRING,
    price: DataTypes.REAL,
}, { 
    sequelize, 
    modelName: 'MenuItem' 
});

module.exports = MenuItem