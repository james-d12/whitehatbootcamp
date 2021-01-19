const Customer = require('./classes/Customer')
const ElectricScooter = require('./classes/ElectricScooter')
const Scooter = require('./classes/Scooter')
const ScooterHire = require('./classes/ScooterHire')

sh = new ScooterHire()
s2 = new Scooter(10)
s = new ElectricScooter(100, 100)
sh.addScooter(s)

c = new Customer("james", "durban", 100)
sh.hireScooterTo(c)
c.driveScooterFor(100)  

sh.returnScooterFrom(c)

sh.chargeScooters()

console.log(`Available scooters: ${sh.scootersAvailable}`)


const fs = require('fs')
const { create } = require('domain')
const ChargeStation = require('./classes/ChargeStation')


function readScooters(file){
    return new Promise((resolve, reject) => {
        let scooters = []
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) reject(`error whilst reading ${file}.`)
            const scooterData = JSON.parse(String(data))
            for (let i = 0; i < scooterData.length; i++){
                scooters.push(new ElectricScooter(scooterData[i].cost, scooterData[i].chargeLevel))
            }
            return resolve(scooters)
        })
    })
}

function readCustomers(file){
    return new Promise((resolve, reject) => {
        let customers = []
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) reject(`error whilst reading ${file}.`)
            const customerData = JSON.parse(String(data))
            for (let i = 0; i < customerData.length; i++){
                customers.push(new Customer(customerData[i].firstName, customerData[i].lastName, customerData[i].money))
            }
            return resolve(customers)
        })
    })
}

async function createScooters(){
    const scooter_file = (__dirname + "/data/electric-scooters.json")
    const scooters = await readScooters(scooter_file)
    return scooters
}

async function createCustomers(){
    const customer_file = (__dirname + "/data/customers.json")
    const customers = await readCustomers(customer_file)
    return customers
}

async function test(){
    let scooters = await createScooters()
    let customers = await createCustomers()

    const sh = new ScooterHire()

    for(let i = 0; i < scooters.length; i++){
        sh.addScooter(scooters[i])
    }

}

console.log(ChargeStation.chargingStations)
