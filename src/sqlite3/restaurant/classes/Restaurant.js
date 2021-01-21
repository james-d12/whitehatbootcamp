class Restaurant{
    static menu_items = []

    constructor(name, price, menu_id){
        this.name = name 
        this.price = price 
        this.menu_id = menu_id
        this.constructor.menu_items.push(this)
    }
}

module.exports = Restaurant