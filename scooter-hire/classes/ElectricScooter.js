const Scooter = require('./Scooter')
class ElectricScooter extends Scooter {
    constructor(cost, chargeLevel=0){
        super(cost)
        this.chargeLevel = chargeLevel
    }

    distanceCanDrive(){
        return (this.chargeLevel / super.getDistanceMultiplier())
    }

    canDriveFor(distance){
        distance = Math.abs(distance)
        const availableDistance = this.distanceCanDrive(distance)
        return (availableDistance < distance ? false : true)
    }

    drive(distance){
        distance = Math.abs(distance)
        super.use(distance)
        const decharge = distance * super.getDistanceMultiplier()
        this.chargeLevel -= decharge
        if (this.chargeLevel <= 0) { this.chargeLevel = 0}
    }

    setChargeLevel(chargeLevel){
        if (chargeLevel > 100) { this.chargeLevel = 100}
        else if (chargeLevel < 0) { this.chargeLevel = 0}
        else { this.chargeLevel = chargeLevel }
    }
}

module.exports = ElectricScooter