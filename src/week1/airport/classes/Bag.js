/** Bag class - has a weight. */
class Bag{
    /**
     * 
     * @param {number} weight - The weight of the bag. 
     */
    constructor(weight){
        if (!weight) { throw new Error("Weight must have a value!"); }
        if (weight < 0) { throw new Error("Weight must be positive!"); }
        
        this.weight = weight;
    }
}

module.exports = Bag