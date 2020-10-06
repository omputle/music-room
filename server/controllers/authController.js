import { getDeezerAccessToken, loginUser, findUserToken, connectDeezer } from "../models/userModel";
import jwt from 'njwt'
import keys from '../configs/keys'

var clientUrl = ''

//jwt auth
export async function jwtauth(req, res, next) {
    try {
        const token = req.headers.authorization.replace("Bearer ", "")
        const decode = jwt.verify(token, keys.jwt)
        req.token = decode.body.token
        next()
    } catch (e) {
        return res.status(401).json({message: "authentication failed"})
    }
}
//get url & verify jwt token
export async function jwtUrl(req, res) {
    const url = new URL(req.body.url)
    clientUrl = url.origin
    let token = url.searchParams.get('t')
    if (token) {
        findUserToken(token)
        .then(token => {
            res.send({"google":token})
        }).catch(e => {res.send(e)})
    } else {
        try {
            token = url.searchParams.get('d')
            const decode = jwt.verify(token, keys.jwt)
            res.send({"deezer":token})
        } catch (e) {res.send(e)}
    }
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
export async function fetchDeezerAccessToken(req, res) {
    let error = req.query.error_reason
    let code = req.query.code
    //console.log("Error:", req.query.error_reason)
    //console.log("Code: ", req.query.code)
    if (code) {
        let access = await getDeezerAccessToken(code);
        connectDeezer(access)
        .then(token => {res.redirect(`${clientUrl}?d=${token}`)})
        .catch(e => {console.log(e)})
    } else if (error) {res.send("Authentication error")}
}