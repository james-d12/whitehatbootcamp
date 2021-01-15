const Utility = require('./Utility')
const ChargeStation = require('./ChargeStation')
const Customer = require('./Customer')
const ElectricScooter = require('./ElectricScooter')

class ScooterHire{
    constructor(){
        this.customers = []
        this.scooters = []
        this.scootersAvailable = []
        this.chargeStation = new ChargeStation("Internal Charge Station", 0, 0)
        this.currentlyHired = {}
    }

    addScooter(scooter){
        this.scooters.push(scooter)
        if(scooter.chargeLevel == 100) { this.scootersAvailable.push(scooter); }
    }

    chargeScooters(){
        this.chargeStation.chargeScooters()
    }

    hireScooterTo(customer){
        if(this.scootersAvailable.length <= 0) { console.log(`There are no available scooters for hire.`); return; }

        let scooter = this.scootersAvailable.pop()
        if(customer.canAffordScooter(scooter)){
            this.currentlyHired[customer.fullName] = scooter.id
            customer.purchaseScooter(scooter)
            this.customers.push(customer)
        }

        if(!customer.hasScooter()){
            console.log(`Could not find a scooter that was available for hire for ${customer.fullName}.`)
        }

    }
    returnScooterFrom(customer){
        if(!customer.hasScooter()) { console.log("Customer does not have a scooter to return."); return; }

        let scooter = customer.returnScooter()

        

        delete this.currentlyHired[customer.fullName]
        this.scooters.push(scooter) 
        if (this.scooters.chargeLevel == 100 ) { this.scootersAvailable.push(scooter)}
        else { this.chargeStation.addScooter(scooter) }

        console.log(`${customer.fullName} has returned their scooter.`)
    }

}

const scooterHire = new ScooterHire();

let scooters = []
let customers = []

for(let i = 0; i < 100; i++){    
    scooters.push(new ElectricScooter(Math.round(Utility.random(1, 200)), Math.round(Utility.random(50, 100))))
    scooterHire.addScooter(scooters[i])
}

for(let i = 0; i < 5; i++){
    const name = "Jack" + String.fromCharCode(Utility.random(97,122))
    customers.push(new Customer(name, "", 300))
}

scooterHire.hireScooterTo(customers[0])
