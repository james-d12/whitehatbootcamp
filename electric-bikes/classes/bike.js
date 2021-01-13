const User = require('./User')

const bikeMultiplier = 0.05
class Bike{

    /**
     * @param {Number} charge - The initial charge level. 
     */
    constructor(charge=100){
        if (charge > 100) { charge = 100 }
        this.charge = charge
        this.id = this.generateID()
    }

    generateID(){
        let id = ""
        for(let i = 0; i < 6; i++){
            const num = Math.round(Math.random() * (90 - 65) + 65)
            id += String.fromCharCode(num)
        }
        return id 
    }

    /**
     * @returns {Promise} - Returns a promise on whether the bike has been charged or not.
     */
    async chargeBike(){
        if(this.charge >= 100) { return }

        return new Promise((resolve , reject) => {
            setInterval(() => {
                this.charge = 100
                console.log( `Bike: ${this.id} now fully charged!`)
                resolve('resolved')
            }, 2000);
        }); 
    }

    /**
     * 
     * @param {Number} distance - The distance (in metres) to ride the bike for.
     */
    distanceCanRide(){
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

module.exports = Bike




