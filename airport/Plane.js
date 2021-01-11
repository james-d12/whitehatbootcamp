const Passenger = require('./Passenger')
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
    }

    /**
     * @param {Array<Passenger>} passengers - The passengers to board.
     */
    boardPassengers(passengers){
        this.passengers = passengers
        this.passengers.forEach(passenger => {
            console.log(passenger.name + " is boarding plane:" + this.flightNumber)
        });
    }

    /**
     * 
     * @param {Passenger} passenger - The passenger to board.
     */
    boardPassenger(passenger){
        this.passengers.push(passenger)
        console.log(passenger.name + " is boarding plane:" + this.flightNumber)
    }

    /**
     * @returns {Number} passengers.length - The number of passengers.
     */
    numOfPasengers(){
        return this.passengers.length
    }
}

const p = new Plane("Heathrow Airport", "Luton Airport", "0A2FD")
p.boardPassengers([
    new Passenger("Jake"),
    new Passenger("Jack")
])

console.log(p.numOfPasengers())

module.exports = Plane