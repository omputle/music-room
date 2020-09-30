import { insert } from '../models/query'
//test json controller
export async function hello(req, res) {
    let params = ['username', 'token', 'type']
    let vals = ['kori', 'registration', 'local']
    await insert('tokens', params, vals)
    .catch(e => {console.log(e)})
    .then(console.log('success'))
    res.send({'msg':'hello'})
}