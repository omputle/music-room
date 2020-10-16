//import modules & create router
import { Router } from 'express'
import passport from 'passport'

//import controllers
import { jwtauth } from '../controllers/authController'
import { getplaylist, getAlbumInfo, getSongInfo, searchTrack, searchAlbum, 
    searchArtist, getChart, getPlaylist2, addToPlaylist, removeFromPlaylist, 
    getTracks, getplaylistInfo, createPlaylist, deletePlaylist, getFriendPlaylist
} from '../controllers/musicController'

//create & expose router to server
const router = Router()
export default router

//routes

//get info
.get('/get-playlist', jwtauth, getplaylist)
.get('/album-info/:id', getAlbumInfo)
.get('/song-info/:id', getSongInfo)

//search query
.get('/search-track/:track', searchTrack)
.get('/search-album/:album', searchAlbum)
.get('/search-artist/:artist', searchArtist)

.get('/chart', getChart)

//playlist functions
//get playlists
.get('/getPlaylist', jwtauth, getPlaylist2)
//get friend playlist
.get('/friendPlaylist/:id', jwtauth, getFriendPlaylist)
//add track to playlist
.post('/addToPlaylist', jwtauth, addToPlaylist)
//remove track from playlist
.delete('/removeFromPlaylist', jwtauth, removeFromPlaylist)
//get playlist tracks
.get('/getTracks/:playlist_id', jwtauth, getTracks)

//get playlist info
.get('/playlist-info/:playlist_id', getplaylistInfo)
//create playlist
.post('/create-playlist', jwtauth, createPlaylist)
//delete playlist
.delete('/delete-playlist', jwtauth, deletePlaylist)