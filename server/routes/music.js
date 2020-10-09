//import modules & create router
import { Router } from 'express'
import passport from 'passport'

//import controllers
import { jwtauth } from '../controllers/authController'
import { getplaylist, getAlbumInfo, getSongInfo, searchTrack, 
    searchAlbum, searchArtist, getChart, getPlaylist2, addToPlaylist, 
    removeFromPlaylist
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
//add track to playlist
.post('/addToPlaylist', jwtauth, addToPlaylist)
//remove track from playlist
.delete('/removeFromPlaylist', jwtauth, removeFromPlaylist)
//add track to playlist

