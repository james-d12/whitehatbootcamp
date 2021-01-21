class Menu{
    static menus = []

    constructor(title, restaurant_id){
        this.title = title 
        this.restaurant_id = restaurant_id
        this.constructor.menus.push(this)
    }
}

module.exports = Menu