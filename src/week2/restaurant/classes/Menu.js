const MenuItem = require('./MenuItem')

class Menu {
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

module.exports = Menu