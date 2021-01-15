const Customer = require('./Customer')
const ElectricScooter = require('./ElectricScooter')
const Scooter = require('./Scooter')
const ScooterHire = require('./ScooterHire')

sh = new ScooterHire()
s2 = new Scooter(10)
s = new ElectricScooter(100, 100)
sh.addScooter(s)

sh.addScooter(s2)

c = new Customer("james", "durban", 100)
sh.hireScooterTo(c)
c.driveScooterFor(100)  

sh.returnScooterFrom(c)
console.log(`Available scooters: ${sh.scootersAvailable}`)