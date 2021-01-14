const Plane = require('./Plane')
const fs = require('fs')

class Airport {
    static airports = []

    /**
     * 
     * @param {String} name - The name of the airport. 
     */
    constructor(name){
        this.name = name
        this.planes = []
        this.constructor.airports.push(this)
    }

    /**
     * 
     * @param {Plane} plane - The plane to land.
     */
    landPlane(plane){
        console.log("Flight:", plane.flightNumber, "has landed at:", this.name)
        this.planes.push(plane)
    }
jsdo
    /**
     * 
     * @param {String} name - Name of the airport 
     * @returns {Airport} - Returns the airport with the name.
     */
    findAirport(name){
        this.constructor.airports.forEach(airport => {
            if (airport.name == name){
                return airport
            }
        })
        return new Error(`Could not find an airport with the name: ${name}`)
    }

    /**
     * 
     * @param {Plane} plane - Flight number of plane to take off.
     */
    takeOffPlane(plane){
        const index = this.planes.indexOf(plane)
        this.planes.splice(index, 1)
        console.log("Flight:", plane.flightNumber, "has taken off from ", this.name, "to:", plane.destination)

        this.constructor.airports.forEach(airport => {
            if (airport.name === plane.destination){
                airport.landPlane(plane)
            }
        })
    }

    /**
     * @returns {Number} - Returns the number of planes.
     */
    numOfPlanes(){
        return this.planes.length;
    }

    /**
     * @returns {Airport} - Returns an airport.
     */
    getInfo() {
        return new Promise((resolve, reject) => {
            fs.readFile('airport/data/airports.json', (err, data) => {
                if (err) return reject(err)

                const airports = JSON.parse(String(data))
                const [airport] = Object.keys(airports).filter(airportCode => airports[airportCode].iata === this.name).map(airportCode => airports[airportCode])

                if (airport == undefined) { reject(new Airport("")) }

                resolve(airport)
            })
        });
    }

}

module.exports = Airport