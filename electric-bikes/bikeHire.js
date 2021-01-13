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
            if(bike.chargeLevel == 100){
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

for (let index = 0; index < 5; ++index) {
    const b = new Bike(Math.round(Math.random() * 100))
    bikes.push(b)
}

const bh = new BikeHire(bikes)
const user = new User("james")

user.hireBike(bh.hireBike())
bh.printBikes()