import { insert, fetchOne } from '../models/query'
//test json controller
export async function hello(req, res) {
    let params = ['username', 'token', 'type']
    let vals = ['kori', 'registration', 'local']
    //let ans = await insert('tokens', params, vals)
    let ans = await fetchOne('tokens', ['username', 'token'], 'username', 'kori')
    .then(ans => {console.log(ans)})
    .catch(e => {console.log(e)})
    res.send({'msg':'hello'})
}