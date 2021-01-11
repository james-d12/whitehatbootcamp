const Plane = require('./Plane')
class Airport {
    constructor(name){
        this.name = name
        this.planes = []
    }

    /**
     * 
     * @param {Plane} plane - The plane to land.
     */
    landPlane(plane){
        console.log("Flight:", plane.flightNumber, "has landed at:", this.name)
        this.planes.push(plane)
    }

    /**
     * 
     * @param {Plane} plane - Plane to takeoff.
     */
    takeOffPlane(flightNumber){
        this.planes.forEach(plane => {
            if (plane.flightNumber == flightNumber){
                const index = this.planes.indexOf(plane)
                console.log("Flight:", plane.flightNumber, "has taken off from ", this.name, "to:", plane.destination)
                this.planes.splice(index, 1)
            }
        });
    }

    /**
     * 
     * @param {String} flightNumber - The flight number to display details.
     */

    details(flightNumber){
        this.planes.forEach(plane => {
            if (plane.flightNumber == flightNumber){
                console.log("Flight Number:", plane.flightNumber)
                console.log("Flight Origin:", this.name)
                console.log("Flight Destination:", plane.destination)
            }
        })
    }

    /**
     * @returns {Number} - Returns the number of planes.
     */
    numOfPlanes(){
        return this.planes.length;
    }



}

const heathrow = new Airport("Heathrow Airport")
heathrow.landPlane(new Plane("Heathrow Airport", "Luton Airport", "0AS23DF"))
heathrow.takeOffPlane("0AS23DF")


module.exports = Airport