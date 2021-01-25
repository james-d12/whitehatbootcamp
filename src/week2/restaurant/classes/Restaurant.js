const Menu = require('./Menu');
const MenuItem = require('./MenuItem');

class Restaurant {
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


module.exports = Restaurant