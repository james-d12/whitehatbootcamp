const Scooter = require('./Scooter')
class ElectricScooter extends Scooter {
    constructor(cost, chargeLevel=100){
        super(cost)
        this.chargeLevel = chargeLevel
    }

    distanceCanRide(){
        return (this.chargeLevel / super.distanceMultiplier())
    }

    canRideFor(distance){
        distance = Math.abs(distance)
        const availableDistance = this.distanceCanRide(distance)
        return (availableDistance < distance ? false : true)
    }

    ride(distance){
        distance = Math.abs(distance)
        super.use(distance)
        
        const decharge = distance * super.distanceMultiplier()
        this.chargeLevel -= decharge
        if (this.chargeLevel <= 0) { this.chargeLevel = 0}
    }

    setChargeLevel(chargeLevel){
        if (chargeLevel > 100) { this.chargeLevel = 100}
        else if (chargeLevel < 0) { this.chargeLevel = 0}
        else { chargeLevel = chargeLevel }
    }
}

module.exports = ElectricScooter