import { query } from './db'

//insert data function
export const insert = (t_name, params, vals) => {
    return new Promise(async (resolve, reject) => {
        try {
            let v = ''
            for (let p in params)
                v += '?, '
            v = v.slice(0, -2)
            let sql = `INSERT INTO ${t_name} (${params.join()}) VALUES (${v})`
            let msg = await query(sql, vals)
            resolve({'success':{insertId: msg.insertId}})
        } catch (e) {reject({'error':e.sqlMessage})}
    })
}

//fetch data function for 1 search criteria
export const fetchOne = (t_name, vals, param, pval) => {
    return new Promise(async (resolve, reject) => {
        try {resolve(await query(`SELECT ${vals} FROM ${t_name} WHERE ${param} =\'${pval}\'`))} 
        catch (e) {reject({'error':e.sqlMessage})}
    })
}

//delete data function for 1 search criteria
export const delOne = (t_name, param, pval) => {
    return new Promise(async (resolve, reject) => {
        try {resolve(await query(`DELETE FROM ${t_name} WHERE ${param} =\'${pval}\'`))}
        catch (e) {reject({"error":e.sqlMessage})}
    })
}