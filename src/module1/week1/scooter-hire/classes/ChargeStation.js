const Utility = require('./Utility')
const ElectricScooter = require('./ElectricScooter')

/**
 * ChargeStation stores a list of currently charging bikes and allows bikes to be charged.
 * @property {String} id - A unique id of the charging station.
 * @property {String} locationName - The name of the location of where the charging station is.
 * @property {Float} lat - The latitude coordinate of the charging station.
 * @property {Float} lon - The longitude coordinate of the charging station.
 * @property {Array<ElectricScooter>} scootersCharging - An array of current scooters that are charging.
 */
class ChargeStation {
    static chargingStations = []

    /**
     * Constructs a ChargeStation Object with the specified parameters.
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

    /**
     * Adds a given scooter to the charging station to charge.
     * @param {ElectricScooter} scooter - The scooter to add to the charging station. 
     */
    addScooter(scooter){
        if(scooter.chargeLevel == 100) { console.log("Scooter is already fully charged!"); return; }
        this.scootersCharging.push(scooter)
    }

    /**
     * Goes through each scooter in the charging station and attempts to charge them.
     * @returns {Promise} - Returns a promise on whether the Scooter was charged or not. 
     */
    chargeScooters(){
        return new Promise((resolve) => {
            this.scootersCharging.forEach((scooter, i) => {
                console.log(`Scooter: ${scooter.id} is charging at: ${this.locationName}.`)
                    setTimeout(() => {
                        scooter.setChargeLevel(100)
                        console.log( `Scooter: ${scooter.id} is now fully charged!`)
                        resolve('resolved')
                    }, 2000);
            });
        })
    }

    /**
     * Returns the instance of the charging station that matches the location name.
     * @param {String} id - The ID of the charging station to get.
     * @returns {ChargingStation} - Returns the charging station with the given location name.
     */
    getChargingStation(id){
        let result
        this.constructor.chargingStations.forEach(cs => {
            if(id == cs.id){
                result = cs
            }
        });
        
        console.log(`Could not find a charging station with the ID: ${id}.`)
        return result
    }

    /**
     * Locates the nearest charging station based on the given lat/lon coordinates.
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
}

module.exports = ChargeStation