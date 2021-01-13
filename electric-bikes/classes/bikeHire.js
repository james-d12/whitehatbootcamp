const Bike = require('./Bike')
const User = require('./User')

class BikeHire{

    constructor(initialiBikes=[]){
        this.bikes = initialiBikes
    }

    addBike(bike){
        this.bikes.push(bike)
    }

    returnBike(bike){
        bike.chargeBike()
        this.bikes.push(bike)
    }

    hireBike(){
        this.bikes.forEach(bike => {
            if(bike.charge == 100){
                const index = this.bikes.indexOf(bike)
                this.bikes.splice(index, 1)
                return bike 
            }
            bike.chargeBike()
        })
    }

    printBikes(){
        this.bikes.forEach(bike => {
            console.log(bike)
        })
    }

}

let bikes = []

let charge = 0
for (let index = 0; index < 10; ++index) {
    if (index % 3 == 0) { charge = 100 }
    else { charge = Math.round(Math.random() * 100)}
    const b = new Bike(charge)
    bikes.push(b)
}

const bh = new BikeHire(bikes)
const user = new User("james")

availableBike = bh.hireBike()
console.log("bike: " + availableBike)

