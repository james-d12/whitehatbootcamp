import { Recipe } from "./Recipe"

export class Menu {
    private _items: Array<Recipe> = []

    constructor(items: Array<Recipe> = []){
        this._items = items
    }
}