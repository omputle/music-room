//import mysql & util module for async connection
import { createConnection } from 'mysql';

//import configs
import { logins, db } from '../configs/database';
import tables from '../configs/tables';

//create connection & promisify query function
const dc = createConnection(logins, db);
export const query = (sql, vals) => {
    return new Promise((resolve, reject) => {
        dc.query(sql, vals, (e, res) => {e ? reject(e) : resolve(res)});
    })
}
//initialize database (connect db || create db && tables)
export const init = async () => {
    new Promise(async (resolve,reject) => {
        await query(`USE ${db}`)
        .catch(async e => {
            if (e.errno === 1049) {
                await query(`CREATE DATABASE ${db}`)
                .then(query(`USE ${db}`)).catch(e => {reject(e);});
                let tables = await create_tables()
                .catch(e => {reject(e)});
                resolve(`DB: ${db} (created) & (connected)${tables}`);
            } else {reject(e);}
        });resolve(`DB: ${db} (connected)`);
    }).then(msg => {console.log(msg);}).catch(e => {console.log(e);});
}
//create tables
const create_tables = () => {
    return new Promise(async (resolve, reject) => {
        let msg = '';
        for (let t in tables) {
            await query(tables[t])
            .then(msg += `\nT: ${t} (created)`)
            .catch(e => {e.errno === 1050 ? msg += `\nT: ${t} (found)` : reject(e);});
        }resolve(`${msg}`);
    })
}