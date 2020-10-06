import { getDeezerAccessToken, loginUser } from "../models/userModel";

var token = 'frRx5sqgfTE8VMBKLC4SSqwSx5sjH3lfZmMxKQDahcmn5dQpwsM'

//jwt auth
export async function jwtauth(req, res, next) {
    try {
        const token = req.headers.authorization.replace("Bearer ", "")
        const decode = verify(token, 'secret')
        console.log(decode.body)
        req.user = decode.body
        next()
    } catch (e) {
        return res.status(401).json({message: "authentication failed"})
    }
}
//jwt redirect
export async function jwtRedirect(req, res) {
    let token = req.params.token
    res.send(token)
}
//oauth redirects
export async function googleRedirect(req, res) {
    loginUser(req.user.username)
    .then(token => {
        //console.log(token)
        res.redirect('http://localhost.localdomain:8080/')
    })
    .catch(e => {console.log(e)})
}
export async function deezerRedirect(req, res) {
    console.log(req.user)
    res.redirect('http://localhost.localdomain:8080')
}
export function fetchDeezerAccessToken(req, res) {
    let error = req.query.error_reason
    let code = req.query.code
    console.log("Error:", req.query.error_reason)
    console.log("Code: ", req.query.code)
    console.log('test')
    console.log(req.user)
    if (code) {
        getDeezerAccessToken(code);
        res.redirect('http://localhost.localdomain:8080/u/ksefeane')
    } else if (error) {
        res.send("Authentication error")
    }
}
