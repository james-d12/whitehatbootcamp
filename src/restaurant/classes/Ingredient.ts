import { Item } from "./Item"

export class Ingredient {
    private _item: Item 
    private _quantity: number = 0

    constructor(item: Item, quantity: number){
        this._item = item
        this._quantity = quantity
    }

    get item() : Item { return this._item }
    get quantity() : number { return this._quantity }

    set item(newItem: Item) { this.item = newItem }
    set quantity(newQuantity: number) { this.quantity = newQuantity }
}