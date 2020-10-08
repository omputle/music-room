//import modules & create router
import { Router } from 'express'
import passport from 'passport'

//import controllers
import { jwtauth } from '../controllers/authController'
import { getProfile, getFriends, getplaylist, getSettings, getAlbumInfo, 
    getSongInfo, searchTrack, searchAlbum, searchArtist, getChart
} from '../controllers/userController'

//create & expose router to server
const router = Router()
export default router

//routes
.get('/me', jwtauth, getProfile)
.get('/friends', jwtauth, getFriends)
.get('/settings', jwtauth, getSettings)

//.post('/postlist', postplaylist)

.get('/get-playlist', jwtauth, getplaylist)
.get('/album-info/:id', getAlbumInfo)
.get('/song-info/:id', getSongInfo)
.get('/search-track/:track', searchTrack)
.get('/search-album/:album', searchAlbum)
.get('/search-artist/:artist', searchArtist)
.get('/chart', getChart)