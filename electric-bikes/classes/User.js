class User{

    constructor(name){
        this.name = name 
        this.bike = []
    }

    addBike(bike){
        this.bike = bike 
        console.log(`${this.name} has just hired bike ${bike.id}.`)
    }

    rideBike(distance){
        if(this.bike.canRideBike(distance)){
            this.bike.useBike(distance)
            console.log(`${this.name} is using their bike to travel: ${distance} metres. [Current Charge: ${this.bike.charge}]`)
        }
        else{
            const availableDistance = this.bike.distanceCanRide(distance)
            console.log(`The bike does not have enough charge to go: ${distance} so it only went ${availableDistance} metres.`)
        }
    }
}

module.exports = User