//import modules & create router
import { Router } from 'express'
import passport from 'passport'

//import controllers
import { jwtauth } from '../controllers/authController'
import { getplaylist, getAlbumInfo, getSongInfo, searchTrack, 
    searchAlbum, searchArtist, getChart
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