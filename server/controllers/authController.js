import { getDeezerAccessToken } from "../models/userModel";

var token = 'frRx5sqgfTE8VMBKLC4SSqwSx5sjH3lfZmMxKQDahcmn5dQpwsM'

//oauth redirects
export async function googleRedirect(req, res) {
    res.redirect('http://localhost.localdomain:8080/')
}
export async function deezerRedirect(req, res) {
    res.redirect('http://localhost.localdomain:8080')
}
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
