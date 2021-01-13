/** Person Class - Base class for passenger & crew */
class Person {
    /**
     * 
     * @param {String} name - The name of the person. 
     */
    constructor(name){
        if (!name) { throw new Error("Person must have a name!"); }
        this.name = name 
    }
}

module.exports = Person