//import mysql & util module for async connection
import { createConnection } from 'mysql'

//import configs
import { logins, db } from '../configs/database'
import tables from '../configs/tables'

const dc = createConnection(logins, db)

//database creation class
export default class DB {
    constructor() {}
    
    //create connections & promisify query
    static query = (sql) => {
        return new Promise((resolve, reject) => {
            dc.query(sql, (e, res) => {e ? reject(e) : resolve(res)})
        })
    }
    //initialize database (connect db || create db && tables)
    static async init() {
        new Promise(async () => {
            await this.query(`USE ${db}`)
            .then(this.create_tables())
            .catch(async e => {
                if (e.errno === 1049) {
                    await this.query(`CREATE DATABASE ${db}`)
                    .then(this.query(`USE ${db}`))
                    .then(this.create_tables())
                    .catch(e => {console.log(e.sqlMessage)})
                } else {console.log(`Error: ${e.sqlMessage}`)}
            })
        })
    }
    //create tables
    static async create_tables() {
        for (let t in tables) {
            await this.query(tables[t])
            .then(console.log(`T: ${t} -> (created)`))
            .catch(e => {
                console.log(e.errno === 1050 ? `T: ${t} -> (found)` : e)
            })
        }
    }
}