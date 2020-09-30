import { query } from './db'

export const insert = async (t_name, params, vals) => {
    var v = ''
    for (let p in params)
        v += '?, '
    v = v.slice(0, -2)
    var sql = `INSERT INTO ${t_name} (${params.join()}) VALUES (${v})`
    return (await query(sql, vals))
}