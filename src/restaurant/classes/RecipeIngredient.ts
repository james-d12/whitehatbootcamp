import { Ingredient } from "./Ingredient"

export class RecipeIngredient {
    private _item: Ingredient 
    private _quantity: number = 0

    constructor(item: Ingredient, quantity: number){
        this._item = item
        this._quantity = quantity
    }

    get item() : Ingredient { return this._item }
    get quantity() : number { return this._quantity }

    set item(newItem: Ingredient) { this.item = newItem }
    set quantity(newQuantity: number) { this.quantity = newQuantity }
}