const User = require('./User')

const bikeMultiplier = 0.05
class Bike{

    /**
     * 
     * @param {Charge} charge - The initial charge level. 
     */
    constructor(charge=100){
        if (charge > 100) { charge = 100 }
        this.charge = charge
    }

    /**
     * 
     * @param {Number} chargeLevel - The chargeLevel to set.
     * @param {String} message - Message to display.
     * @param {Number} timer - Time to complete.
     */
    __helper(chargeLevel, message, timer){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.charge = chargeLevel
                console.log(message)
                resolve('resolved')
            }, timer);
        }); 
    }

    /**
     * @returns {Promise} - Returns a promise on whether the bike has been charged or not.
     */
    async chargeBike(){
        return await this.__helper(100, "Bike now charged!", 2000)
    }

    /**
     * 
     * @param {Number} distance - The distance (in metres) to ride the bike for.
     */
    distanceCanRide(distance){
        return (this.charge / bikeMultiplier)
    }

    /**
     * 
     * @param {Number} distance - The distance (in metres) to ride the bike for.
     */
    canRideBike(distance){
        distance = Math.abs(distance)
        const availableDistance = this.distanceCanRide(distance)
        return (availableDistance < distance ? false : true)
    }

    /**
     * 
     * @param {Number} distance - The distance (in metres) to ride the bike for.
     */
    useBike(distance){
        distance = Math.abs(distance)
        const decharge = distance * bikeMultiplier
        this.charge -= decharge
        if (this.charge <= 0) { this.charge = 0}
    }
}

const user = new User("James") 
const bike = new Bike()

bike.useBike(100)

module.exports = Bike




