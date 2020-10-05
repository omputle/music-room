import { insert, fetchOne } from '../models/query'
import { getDeezerAccessToken } from "../models/userModel";

//oauth redirect
export async function googleRedirect(req, res) {
    res.redirect('http://localhost.localdomain:8080/')
}
export async function deezerRedirect(req, res) {
    res.redirect('http://localhost.localdomain:8080')
}
//test json controller
export async function getProfile(req, res) {
    const params = ['username', 'first_name','last_name', 'email']
    let ans = await fetchOne('users', params, 'username', req.params.username)
    .then(ans => {res.send(ans[0])})
    .catch(e => {res.send(e)})
}

//time to work
export function fetchDeezerAccessToken(req, res) {
    let error = req.query.error_reason
    let code = req.query.code
    console.log("Error:", req.query.error_reason)
    console.log("Code: ", req.query.code)
    if (code) {
        getDeezerAccessToken(code);
        res.redirect('http://localhost.localdomain:8080/u/ksefeane')
    } else if (error) {
        res.send("Authentication error")
    }
}
