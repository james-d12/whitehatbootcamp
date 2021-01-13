const Person = require('./Person')
const Bag = require('./Bag')

/** Passenger class - has luggage and inherits from person. */
class Passenger extends Person{

    /**
     * 
     * @param {String} name - The name of the Passenger 
     */
    constructor(name){
        super(name)
        this.bags = [] 
    }

    /**
     * 
     * @param {Bag} bag - Adds a Bag object to the passenger.
     */
    addBag(...bags){
        bags.forEach(bag => {
            this.bags.push(bag)
        });
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

const p = new Passenger("james")
p.addBag(25, 35, 45)

module.exports = Passenger