import { query } from './db'

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

export const fetchOne = (t_name, vals, param, pval) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `SELECT ${vals} FROM ${t_name} WHERE ${param} =\'${pval}\'`
            resolve(await query(sql))
        } catch (e) {reject({'error':e.sqlMessage})}
    })
}