import axios from 'axios'

const deezer = 'https://api.deezer.com'

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

//experimental music functions

//get playlists
export async function getPlaylist2(req, res) {
    try {
        axios.get(`${deezer}/user/me/playlists?access_token=${req.token}`)
        .then(r => {
            res.send(r.data.data)
        }).catch(e => {console.log(e)})
    } catch (e) {res.send(e)}
}
//add track to playlist
export async function addToPlaylist(req, res) {
    try {
        let url = `${deezer}/playlist/${req.body.playlist_id}/tracks?access_token=${req.token}`
        let data = `&songs=${req.body.track_id}&request_method=POST`
        axios.get(url+data)
        .then(r => {res.send(r.data)})
        .catch(e => {console.log(e)})
    } catch (e) {res.send(e)}
}
//remove track to playlist
export async function removeFromPlaylist(req, res) {
    try {
        let url = `${deezer}/playlist/${req.body.playlist_id}/tracks?access_token=${req.token}`
        let data = `&songs=${req.body.track_id}&request_method=DELETE`
        axios.get(url+data)
        .then(r => {res.send(r.data)})
        .catch(e => {console.log(e)})
    } catch (e) {res.send(e)}
}
//get playlist tracks
export async function getTracks(req, res) {
    try {
        axios.get(`${deezer}/playlist/${req.params.playlist_id}/tracks?access_token=${req.token}`)
        .then(r => {
            res.send(r.data.data)
        }).catch(e => {console.log(e)})
    } catch (e) {res.send(e)}
}