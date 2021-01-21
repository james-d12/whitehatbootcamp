const sqlite3 = require('sqlite3').verbose();

class Database {
    constructor(dbFilePath, mode){
        this.dbFilePath = dbFilePath
        this.mode = mode 
        this.db = new sqlite3.Database(this.dbFilePath, this.mode, (err) => {
            if (err) {
                console.log(`Could not connect to the database: ${err.message}`)
            } else{
                console.log('Connected to the database.')
            }
        })
    }

    queryEach(sqlCommand){
        this.db.serialize(() => {
            this.db.each(sqlCommand, (err, row) => {
                if(err) { console.log(err.message) }
                console.log(row)
            });
        });
    }
    
    close(){    
        this.db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Closed the database connection.');
        });
    }
}

module.exports = Database