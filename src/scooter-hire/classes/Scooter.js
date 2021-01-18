const Utility = require('./Utility')

/**
 * A base class for other inherited scooter classes.
 * @property {Int} cost - The cost of the bike to hire.
 * @property {String} id - A randomly generated ID for the scooter.
 */
class Scooter {
    /** A variable that is used when calculating how far a scooter can go for. */
    static distanceMultiplier = 0.05

    /**
     * Constructs a Scooter Object with the specified cost.
     * @param {Float} cost - The cost of the scooter. 
     */
    constructor(cost=0){
        this.cost = Math.abs(cost)
        this.id = Utility.generateID(6)
    }

    /**
     * Returns the distance Multiplier variable.
     * @returns {Float} - Returns the distance multiplier variable.
     */
    getDistanceMultiplier(){
        return this.constructor.distanceMultiplier
    }

    /**
     * 
     * @param {Float} distance - The distance to travel. 
     */
    use(distance){

    }

}

module.exports = Scooter