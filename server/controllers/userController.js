import { insert, fetchOne } from '../models/query'
import { getDeezerAccessToken } from "../models/userModel";
import axios from 'axios'

//get profile from deezer api
export async function getProfile(req, res) {
    try {
        axios.get(`http://api.deezer.com/user/me?access_token=${req.token}`)
        .then(r => {
            res.send({
                'first_name':r.data.firstname,
                'last_name': r.data.lastname,
                'email': r.data.email
            })
        }).catch(e => {res.send(e)})
    } catch (e) {res.send(e)}
}
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
//add friend
export async function addFriend(req, res) {

}
//get friends
export async function getFriends(req, res) {

}