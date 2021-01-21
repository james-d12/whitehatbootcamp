export class Ingredient {
    private _name: string = ""
    private _imageURL: string = "" 
    private _weight: number = 0

    public constructor(name: string, imageURL: string, weight: number){
        this._name = name 
        this._imageURL = imageURL
        this._weight = weight
    }

    get name() : string { return this._name }
    get imageURL() : string { return this._imageURL }
    get weight() : number { return this._weight }

    set name(newName: string) { this._name = newName }
    set imageURL(newImageURL: string) { this._imageURL = newImageURL }
    set weight(newWeigth: number) { this._weight = newWeigth }
}