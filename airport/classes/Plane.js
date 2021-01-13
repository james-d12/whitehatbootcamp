const Passenger = require('./Passenger')

/** Plane class - stores information about a plane. */
class Plane {
    /**
     * @param {String} origin - The origin airport.
     * @param {String} destination - The destination airport.
     * @param {String} flightNumber - The flight number.
     */
    constructor(origin, destination, flightNumber){
        this.origin = origin
        this.destination = destination
        this.flightNumber = flightNumber
        this.passengers=[]
        this.crew = []
    }

    addPassengers(...passengers){
        passengers.forEach(passenger => {
            this.passengers.push(passenger)
        })
    }
    addCrew(...crew){
        crew.forEach(crewMember => {
            this.crew.push(crewMember)
        })
    }

    board(){
        this.passengers.forEach(passenger => {
            console.log(`[PASSENGER] ${passenger.name} is boarding plane: ${this.flightNumber}`)
        })
        this.crew.forEach(crewMember => {
            console.log(`[CREW] ${crewMember.name} is boarding plane: ${this.flightNumber}`)
        })
    }

    /**
     * @returns {Number} passengers.length - The number of passengers.
     */
    numOfPasengers(){
        return this.passengers.length
    }
}

module.exports = Plane