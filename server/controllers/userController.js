import { insert, fetchOne } from '../models/query'
import { getDeezerAccessToken } from "../models/userModel";
import axios from 'axios'

var token = 'frRx5sqgfTE8VMBKLC4SSqwSx5sjH3lfZmMxKQDahcmn5dQpwsM'

//get profile
export async function getProfile(req, res) {
    console.log(req.user)
    const params = ['username', 'first_name','last_name', 'email']
    fetchOne('users', params, 'username', req.params.username)
    .then(ans => {res.send(ans[0])})
    .catch(e => {res.send(e)})
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