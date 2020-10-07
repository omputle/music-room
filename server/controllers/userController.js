import { insert, fetchOne } from '../models/query'
import { getDeezerAccessToken } from "../models/userModel";
import axios from 'axios'

const deezer = 'https://api.deezer.com'

//get profile from deezer api
export async function getProfile(req, res) {
    try {
        axios.get(`${deezer}/user/me?access_token=${req.token}`)
        .then(r => {
            res.send({
                'username':r.data.name,
                'first_name':r.data.firstname,
                'last_name': r.data.lastname,
                'email': r.data.email
            })
        }).catch(e => {console.log(e)})
    } catch (e) {res.send(e)}
}
//get friends (followers & followings)
export async function getFriends(req, res) {
    try {
        let followers = axios.get(`${deezer}/user/me/followers?access_token=${req.token}`)
        let followings = axios.get(`${deezer}/user/me/followings?access_token=${req.token}`)
        let friends = await Promise.all([followers, followings])
        .catch(e => {console.log(e)})
        res.send({
            'followers':friends[0].data.data, 
            'followings':friends[1].data.data
        })
    } catch (e) {res.send(e)}
}
//follow a user

//add playlist
export async function postplaylist(req, res) {
    let path = `https://api.deezer.com/user/me/playlists`
    let access = `?access_token=${token}`
    var pay = req.body
    console.log(pay)
    axios.post(path+access, {"title":"testing2"})
    .then(res => {console.log(res.data)})
    .catch(e => {console.log(e)})
}
//get playlists
export async function getplaylist(req, res) {
    let path = `https://api.deezer.com/user/me/playlists`
    let access = `?access_token=${token}`
    axios.get(path+access)
    .then(res => {console.log(res.data)})
    .catch(e => {console.log(e)})
}

