const Scooter = require('./Scooter')

/**
 * An electric version of the base scooter class - has a chargelevel and uses chargestations.
 * @property {Int} cost - The cost of the scooter.
 * @property {Int} chargelevel - The initial chargelevel of the scooter.
 */
class ElectricScooter extends Scooter {

    /**
     * Constructs an ElectricScooter Object with the specified parameters.
     * @param {Int} cost - The cost of the electric scooter. 
     * @param {Int} chargeLevel - The initial chargelevel of the scooter.
     */
    constructor(cost, chargeLevel=0){
        super(cost)
        this.chargeLevel = chargeLevel
    }

    /**
     * Returns the distance the scooter can drive for.
     * @returns {Int} - The distance the scooter can drive for.
     */
    distanceCanDrive(){
        return (this.chargeLevel / super.getDistanceMultiplier())
    }

    /**
     * Checks if the electric scooter can drive for a given distance.
     * @param {Int} distance - The distance to check if scooter can drive.
     * @returns {Boolean} - Returns true / false depending on whether the scooter can drive the distance.
     */
    canDriveFor(distance){
        distance = Math.abs(distance)
        const availableDistance = this.distanceCanDrive(distance)
        return (availableDistance < distance ? false : true)
    }

    /**
     * Drives the electric scooter a specified distance.
     * @param {Int} distance - The distance to travel. 
     */
    drive(distance){
        distance = Math.abs(distance)
        super.use(distance)
        const decharge = distance * super.getDistanceMultiplier()
        this.chargeLevel -= decharge
        if (this.chargeLevel <= 0) { this.chargeLevel = 0}
    }

    /**
     * Sets the charge level of the scooter, performing validating as well.
     * @param {Int} chargeLevel - The chargelevel to set the scooter's charge to.
     */
    setChargeLevel(chargeLevel){
        if (chargeLevel > 100) { this.chargeLevel = 100}
        else if (chargeLevel < 0) { this.chargeLevel = 0}
        else { this.chargeLevel = chargeLevel }
    }
}

module.exports = ElectricScooter