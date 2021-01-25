const Utility = require('./Utility')
const ChargeStation = require('./ChargeStation')
const Customer = require('./Customer')
const ElectricScooter = require('./ElectricScooter')
const Scooter = require('./Scooter')


/**
 * A scooterhire station where customers can hire/returns scooters.
 * @property {Array<ElectricScooter>} scooter - The list of current scooters
 * @property {Array<ElectricScooter>} scootersAvailable - The list of current available / fully charged scooters
 * @property {ChargeStation} chargeStation - An internal chargestation to charge current scooters.
 * @property {Dictionary} currentlyHired - A dictionary storing the customers full name as a key to the ID of the scooter.
 */
class ScooterHire{

    /**
     * Constructs a ScooterHire Object.
     */
    constructor(){
        this.scooters = []
        this.scootersAvailable = []
        this.chargeStation = new ChargeStation("Internal Charge Station", 0, 0)
        this.currentlyHired = {}
    }

    /**
     * Adds a scooter to the system.
     * @param {ElectricScooter} scooter - The scooter to add.
     */
    addScooter(scooter){
        this.scooters.push(scooter)
        if(scooter.chargeLevel == 100) { this.scootersAvailable.push(scooter); }
        else { this.chargeStation.addScooter(scooter); }
    }

    /**
     * Adds all scooter in an array of scooters.
     * @param {Array<ElectricScooter>} scooters 
     */
    addScooters(scooters){
        for(let i = 0; i < scooters.length; i++){
            this.addScooter(scooters[i])
        }
    }

    /**
     * Uses the internal charge station to charge all the current scooters that need charging.
     */
    chargeScooters(){ 
        this.chargeStation.chargeScooters().then(data => {
            this.chargeStation.scootersCharging.forEach(scooter => {
                if(scooter.chargeLevel == 100){
                    this.scootersAvailable.push(scooter)
                }
            })
        })
    }

    /**
     * 
     * @param {Customer} customer - The customer to hire the scooter to.
     */
    hireScooterTo(customer){
        if(this.scootersAvailable.length <= 0) { console.log(`There are no available scooters for hire.`); return; }
        
        let scooter = this.scootersAvailable[this.scootersAvailable.length-1]
        
        if(customer.canAffordScooter(scooter)){
            this.currentlyHired[customer.fullName] = scooter.id
            customer.purchaseScooter(scooter)
            this.scootersAvailable.pop()
        } else{
            console.log(`${customer.fullName} cannot afford scooter [${scooter.id}], they are short £${scooter.cost - customer.money}.`)
        }

    }

    /**
     * 
     * @param {Customer} customer - The customer to get the scooter from.
     */
    returnScooterFrom(customer){
        if(!customer.hasScooter()) { console.log(`Customer: ${customer.fullName} does not have a scooter to return.`); return; }

        let scooter = customer.returnScooter()

        delete this.currentlyHired[customer.fullName]
        this.scooters.push(scooter) 
        if (scooter.chargeLevel == 100 ) { this.scootersAvailable.push(scooter)}
        else { this.chargeStation.addScooter(scooter); }

        console.log(`${customer.fullName} has returned scooter [${scooter.id}].`)
    }
}

module.exports = ScooterHire
