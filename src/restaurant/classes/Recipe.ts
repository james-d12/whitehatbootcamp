import { Ingredient } from "./Ingredient"

export class Recipe {
    private _name: string = ""
    private _ingredients: Array<Ingredient> = []

    constructor(name: string){
        this._name = name 
    }

    addIngredient(ingredient: Ingredient){
        this._ingredients.push(ingredient)
    }

    removeIngredient(ingredient: Ingredient){
        const index: number = this._ingredients.indexOf(ingredient)
        this._ingredients.splice(index, 1)
    }
}