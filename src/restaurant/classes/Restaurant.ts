import { Menu } from "./Menu"

export class Restaurant {
    _name : string 
    _imageURL : string 
    _city : string 

    _drinksMenu: Menu
    _desertsMenu: Menu
    _mainsMenu: Menu 

    constructor(name: string, imageURL: string, city: string){
        this._name = name 
        this._imageURL = imageURL
        this._city = city
    }   

}

const r = new Restaurant("Pizza Restaurant", "", "London")

