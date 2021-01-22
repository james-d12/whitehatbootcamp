const sqlite3 = require('sqlite3').verbose();

class RestaurantDatabase {
    constructor(dbFilePath="", mode=""){
        this.dbFilePath = dbFilePath
        this.mode = mode 
        this.db = undefined
    }

    connect(){
        this.db = new sqlite3.Database(this.dbFilePath, this.mode, (err) => {
            if (err) {
                console.log(`Could not connect to the database: ${err.message}`)
            } else{
                console.log('Connected to the database.')
            }
        })
    }

    queryEach(sqlCommand=""){
        this.db.serialize(() => {
            this.db.each(sqlCommand, (err, row) => {
                if(err) { console.log(err.message) }
                console.log(row)
            });
        });
    }
 
    queryAll(sqlCommand=""){
        this.db.serialize(() => {
            this.db.all(sqlCommand, (err, row) => {
                if(err) { console.log(err.message) }
                console.log(row)
            });
        });
    }

    prepare(sqlCommand){
        return this.db.prepare(sqlCommand)
    }

    finalise(){
        this.db.finalise()
    }

    close(){    
        this.db.close((err) => {
            if (err) { return console.error(err.message); }
            console.log('Closed the database connection.');
        });
    }

}

module.exports = RestaurantDatabase
