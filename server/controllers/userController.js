import { insert, fetchOne } from '../models/query'
//test json controller
export async function getProfile(req, res) {
    const params = ['username', 'first_name','last_name', 'email']
    let ans = await fetchOne('users', params, 'username', req.params.username)
    .then(ans => {res.send(ans[0])})
    .catch(e => {res.send(e)})
}
//time to work