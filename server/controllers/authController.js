import { getDeezerAccessToken, loginUser, findUserToken } from "../models/userModel";
import jwt from 'njwt'

var clientUrl = ''

//jwt auth
export async function jwtauth(req, res, next) {
    try {
        const token = req.headers.authorization.replace("Bearer ", "")
        const decode = jwt.verify(token, 'secret')
        req.user = decode.body.name
        next()
    } catch (e) {
        return res.status(401).json({message: "authentication failed"})
    }
}
//get url & verify jwt token
export async function jwtUrl(req, res) {
    const url = new URL(req.body.url)
    clientUrl = url.origin
    findUserToken(url.searchParams.get('t'))
    .then(token => {
        res.send({"token":token})
    }).catch(e => {res.send(e)})
}

//oauth redirects
export async function googleRedirect(req, res) {
    console.log('google: '+clientUrl)
    loginUser(req.user.username)
    .then(token => {
        res.redirect(`${clientUrl}?t=${token}`)
    })
    .catch(e => {console.log(e)})
}
export async function deezerRedirect(req, res) {
    res.redirect(clientUrl)
}
export function fetchDeezerAccessToken(req, res) {
    let error = req.query.error_reason
    let code = req.query.code
    console.log("Error:", req.query.error_reason)
    console.log("Code: ", req.query.code)
    if (code) {
        getDeezerAccessToken(code);
        res.redirect(clientUrl)
    } else if (error) {
        res.send("Authentication error")
    }
}
