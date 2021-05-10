const Person = require('./Person')

/** Crew Class - Represents a crew member. */
class Crew extends Person {
    /**
     * 
     * @param {String} name - The crew member's name. 
     */
    constructor(name){
        super(name)
    }
}

module.exports = Crew