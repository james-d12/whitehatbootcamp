const Bag = require('./Bag')

class Passenger {

    /**
     * 
     * @param {String} name - The name of the Passenger 
     */
    constructor(name){
        if (!name) { throw new Error("Passenger must have a name!"); }

        this.name = name 
        this.bags = [] 
    }

    /**
     * 
     * @param {Bag} bag - Adds a Bag object to the passenger.
     */
    addBag(bag){
        this.bags.push(bag)
    }

    /**
     * 
     * @param {Bag} bag - Removes a Bag object from the passenger. 
     */
    removeBag(bag){
        const index = this.bags.indexOf(bag)
        this.bags.splice(index, 1)
    }

    /**
     * @return {Number} - Returns the length of the bags.
     */
    numOfBags(){
        return this.bags.length;
    }
}

module.exports = Passenger