import { RecipeIngredient } from "./RecipeIngredient"

export class Recipe {
    private _name: string = ""
    private _ingredients: Array<RecipeIngredient> = []

    constructor(name: string){
        this._name = name 
    }

    addIngredient(ingredient: RecipeIngredient){
        this._ingredients.push(ingredient)
    }

    removeIngredient(ingredient: RecipeIngredient){
        const index: number = this._ingredients.indexOf(ingredient)
        this._ingredients.splice(index, 1)
    }
}