const Utility = require('./Utility')
const ElectricScooter = require('./ElectricScooter')

/** ChargeStations charge electric scooters. */
class ChargeStation {
    static chargingStations = []

    /**
     * 
     * @param {String} locationName - The location name of the charging station.
     * @param {Float} lat - The latitude of the station's position.
     * @param {Float} lon - The longitude of the station's position.
     */
    constructor(locationName, lat, lon){
        this.id = Utility.generateID(10)
        this.locationName = locationName
        this.lat = lat
        this.lon = lon
        this.scootersCharging = []
        this.constructor.chargingStations.push(this)
    }


    addScooter(scooter){
        this.scootersCharging.push(scooter)
    }

    /**
     * 
     * @returns {Promise} - Returns a promise on whether the Scooter was charged or not. 
     */
    async chargeScooters(){
        this.scootersCharging.forEach((scooter, i) => {
            console.log(`Scooter: ${scooter.id} is charging at: ${this.locationName}.`)
            return new Promise((resolve , reject) => {
                setTimeout(() => {
                    scooter.setChargeLevel(100)
                    if(scooter.chargeLevel != 100) { reject("Reject")}

                    console.log( `Scooter: ${scooter.id} is now fully charged!`)
                    resolve('resolved')
                }, Utility.random(0,10) * 1000);
            }); 
        });
    }

    /**
     * 
     * @param {String} locationName - The location name of the charging station to get.
     * @returns {ChargingStation} - Returns the charging station with the given location name.
     */
    getChargingStation(locationName){
        this.constructor.chargingStations.forEach(cs => {
            if(locationName == cs.locationName){
                return cs 
            }
        });
        return new Error(`Could not find a charging station with the name: ${locationName}.`)
    }

    /**
     * 
     * @param {Float} lat - The latitude coordinates of your position. 
     * @param {Float} lon - The longitude coordinates of your position.
     * @returns {ChargeStation} - Returns the nearest charge station.
     */

    getNearestChargingStation(lat, lon){
        let nearest_lat = this.constructor.chargingStations[0].lat - lat
        let nearest_lon = this.constructor.chargingStations[0].lon - lon
        let nearest_total = nearest_lat + nearest_lon
        let nearest = this.constructor.chargingStations[0]

        this.constructor.chargingStations.forEach(cs => {
            const lat_distance = Math.abs(cs.lat - lat)
            const lon_distance = Math.abs(cs.lon - lon)
            const total_distance = lat_distance + lon_distance

            if(total_distance < nearest_total) {
                nearest_lat = lat_distance
                nearest_lon = lon_distance
                nearest_total = total_distance
                nearest = cs 
            }
        })

        console.log(`The nearest station to you {${lat}, ${lon}} is ${nearest.locationName} at {${nearest.lat},${nearest.lon}}`)
        return nearest
    }

    /**
     * 
     */
    details(){
        console.log("-----------------Details-----------------")
        console.log(`ID: ${this.id}\nLocation: ${this.locationName}\nLatitude: ${this.lat}\nLongitude: ${this.lon}.`)

        this.scootersCharging.forEach(scooter => {
            console.log(`Scooter: ${scooter.id} is currently charging at ${this.locationName}`)
        })
    }
}

module.exports = ChargeStation