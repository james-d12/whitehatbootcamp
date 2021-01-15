const Scooter = require('./Scooter')
const ElectricScooter = require('./ElectricScooter')
const ChargeStation = require('./ChargeStation')

/** Customer has name, money and a current scooter. */
class Customer {

    /**
     * Constructs a Customer Object with the specified parameters.
     * @param {String} firstName - The customer's firstname.
     * @param {String} lastName - The customer's lastname.
     * @param {Float} money - The customer's amount of money.
     */
    constructor(firstName="", lastName="", money=0.0){
        this.firstName = firstName
        this.lastName = lastName
        this.fullName = firstName + " " + lastName
        this.money = money
        this.scooter = undefined 
    }

    rideScooterFor(distance){
        if(this.scooter == undefined) { console.log("There is no scooter to ride."); return }
        if(!this.scooter.canRideFor(distance)) { console.log(`${this.fullName} cannot ride for the distance ${distance}`); return; }


        this.scooter.ride(distance)
        console.log(`${this.fullName} is riding their scooter for ${distance} metres. Current Charge [${this.scooter.chargeLevel}%].`)
    }

    hasScooter(){
        return this.scooter == undefined ? false : true;
    }

    /**
     * Checks if a customer can afford a specific scooter.
     * @param {Scooter} scooter - The scooter to check the price of.
     * @returns {Boolean} - Returns a boolean (true/false) on whether they can afford the scooter. 
     */
    canAffordScooter(scooter){
        return (this.money >= scooter.cost) ? true : false
    }

    /**
     * Purchases a scooter and adds it to the customer's inventory.
     * @param {Scooter} scooter - The scooter to purchase. 
     */
    purchaseScooter(scooter){
        this.money -= scooter.cost 
        this.scooter = scooter 
        console.log(`${this.fullName} has purchased scooter: ${scooter.id} for: £${scooter.cost}`)
    }

    /**
     * Removes the Scooter from the customer's inventory.
     */
    returnScooter(){
        const scooter = this.scooter 
        this.scooter = undefined
        return scooter 
    }
}

module.exports = Customer