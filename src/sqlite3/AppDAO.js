const sqlite3 = require('sqlite3')
const Promise = require('bluebird')

class AppDAO {
    constructor(dbFilePath){
        this.dbFilePath = dbFilePath
        this.db = new sqlite3.Database(this.dbFilePath, (err) => {
            if (err) {
                console.log(`Could not connect to the database: ${err.message}`)
            } else{
                console.log('Connected to the database.')
            }
        })
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.dun(sql, params, function(err) {
                if (err){
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else{
                    resolve({ id: this.lastID})
                }
            })
        })
    }
}

module.exports = AppDAO