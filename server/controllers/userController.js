import { insert, fetchOne } from '../models/query'
import { getDeezerAccessToken } from "../models/userModel";
import axios from 'axios'

const deezer = 'https://api.deezer.com'

//get profile from deezer api
export async function getProfile(req, res) {
    try {
        axios.get(`${deezer}/user/me?access_token=${req.token}`)
        .then(r => {
            //console.log(r.data)
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
    let access = `?access_token=${req.token}`
    // axios.get(path+access)
    // .then(result => res.send({"success": result}))
    // .catch(e => {console.log(e)})
    let result = await axios.get(path + access)
    res.send(result.data)
}

export async function getAlbumInfo(req, res) {
    let path = 'https://api.deezer.com/album/'
    let album_id = req.params.id
    let result = await axios.get(path + album_id)
    res.send(result.data)
}

export async function getSongInfo(req, res) {
    let path = 'https://api.deezer.com/track/'
    let song_id = req.params.id
    let result = await axios.get(path + song_id)
    res.send(result.data)
}

export async function searchTrack(req, res) {
    let path = 'http://api.deezer.com/search/track?q='
    let track = req.params.track
    let result = await axios.get(path + track)
    res.send(result.data)
}

export async function searchAlbum(req, res) {
    let path = 'http://api.deezer.com/search/album?q='
    let album = req.params.album
    let result = await axios.get(path + album)
    res.send(result.data)
}

export async function searchArtist(req, res) {
    let path = 'http://api.deezer.com/search/artist?q='
    let artist = req.params.artist
    let result = await axios.get(path + artist)
    res.send(result.data)
}

export async function getChart(req, res) {
    let path = 'https://api.deezer.com/chart'
    let result = await axios.get(path)
    res.send(result.data)
}