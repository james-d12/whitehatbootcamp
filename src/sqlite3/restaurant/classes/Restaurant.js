class Restaurant{
    constructor(name, image_Link){
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

    print(){
        console.log(this.menus)
    }

}

module.exports = Restaurant