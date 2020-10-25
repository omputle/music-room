//import modules & create router
import { Router } from 'express'
import passport from 'passport'

//import controllers
import { jwtauth, licenseAuth } from '../controllers/authController'
import { getplaylist, getAlbumInfo, getSongInfo, searchTrack, searchAlbum, 
    searchArtist, getChart, getPlaylist2, addToPlaylist, removeFromPlaylist, 
    getTracks, getplaylistInfo, createPlaylist, deletePlaylist, getFriendPlaylist, 
    delegateControl, delegateMatch, getLicensedPlaylists
} from '../controllers/musicController'

//create & expose router to server
const router = Router()
export default router

//routes

//get info
.get('/get-playlist', jwtauth, getplaylist)
/**
 * @swagger
 * /music/album-info/{album_id}:
 *  get:
 *      description: searches for an album's info on Deezer
 *      parameters:
 *        - in: path
 *          name: album_id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          200:
 *              description: ran successfully
 */
.get('/album-info/:id', getAlbumInfo)
/**
 * @swagger
 * /music/song-info/{track_id}:
 *  get:
 *      description: searches for a song's info on Deezer
 *      parameters:
 *        - in: path
 *          name: track_id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          200:
 *              description: ran successfully
 */
.get('/song-info/:id', getSongInfo)

//search query
/**
 * @swagger
 * /music/search-track/{track}:
 *  get:
 *      description: searches for a song on Deezer
 *      parameters:
 *        - in: path
 *          name: track
 *          schema:
 *              type: string
 *          required: true
 *      responses:
 *          200:
 *              description: ran successfully
 */
.get('/search-track/:track', searchTrack)

/**
 * @swagger
 * /music/search-album/{album_name}:
 *  get:
 *      description: searches for an album on Deezer
 *      parameters:
 *        - in: path
 *          name: album_name
 *          schema:
 *              type: string
 *          required: true
 *      responses:
 *          200:
 *              description: ran successfully
 */
.get('/search-album/:album', searchAlbum)

/**
 * @swagger
 * /music/search-artist/{artist_name}:
 *  get:
 *      description: searches for an album on Deezer
 *      parameters:
 *        - in: path
 *          name: artist_name
 *          schema:
 *              type: string
 *          required: true
 *      responses:
 *          200:
 *              description: ran successfully
 */
.get('/search-artist/:artist', searchArtist)
//fetches popular songs

/**
 * @swagger
 * /music/chart:
 *  get:
 *      description: use to request popular songs and artists
 *      responses:
 *          200:
 *              description: ran successfully
 */
.get('/chart', getChart)

//playlist functions
//get playlists
/**
 * @swagger
 * /music/getPlaylist:
 *  get:
 *      description: fetches a user's playlists (requires authentication)
 *      responses:
 *          404:
 *              description: No authentication
 */
.get('/getPlaylist', jwtauth, getPlaylist2)
//get friend playlist
/**
 * @swagger
 * /music/friendPlaylist/{user_id}:
 *  get:
 *      description: fetches a user's friend's playlists (requires authentication)
 *      responses:
 *          404:
 *              description: No authentication
 */
.get('/friendPlaylist/:id', jwtauth, getFriendPlaylist)
//add track to playlist
/**
 * @swagger
 * /music/addToPlaylist:
 *  post:
 *      description: adds songs to a playlist (requires authentication)          
 *      responses:
 *          201:
 *              description: song added to playlist
 *          404:
 *              description: No authentication
 */
.post('/addToPlaylist', jwtauth, addToPlaylist)
//add track to playlist with license
/**
 * @swagger
 * /music/addToPlaylist-license:
 *  post:
 *      description: adds songs to another user's playlist. Must have license to do so(requires authentication)       
 *      responses:
 *          201:
 *              description: song added to playlist
 *          404:
 *              description: No authentication
 */
.post('/addToPlaylist-license', jwtauth, licenseAuth, addToPlaylist)
//remove track from playlist
/**
 * @swagger
 * /music/removeFromPlaylist:
 *  delete:
 *      description: removes a song from a user's playlist.     
 *      responses:
 *          201:
 *              description: song removed from playlist
 *          404:
 *              description: No authentication
 */
.delete('/removeFromPlaylist', jwtauth, removeFromPlaylist)
//remove track from playlist eith license
/**
 * @swagger
 * /music/removeFromPlaylist-license:
 *  delete:
 *      description: removes a song from another user's playlist. Must have license to do so(requires authentication)     
 *      responses:
 *          201:
 *              description: song removed from playlist
 *          404:
 *              description: No authentication
 */
.delete('/removeFromPlaylist-license', jwtauth, licenseAuth, removeFromPlaylist)
//get playlist tracks
/**
 * @swagger
 * /music/getTracks/{playlist_id}:
 *  get:
 *      description: fetches tracks from a playlist
 *      parameters:
 *        - in: path
 *          name: playlist_id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.get('/getTracks/:playlist_id', jwtauth, getTracks)

//get playlist info
/**
 * @swagger
 * /music/playlist-info/{playlist_id}:
 *  get:
 *      description: fetches a playlist's info
 *      parameters:
 *        - in: path
 *          name: playlist_id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.get('/playlist-info/:playlist_id', getplaylistInfo)
//create playlist
/**
 * @swagger
 * /music/create-playlist:
 *  post:
 *      description: Creates a new playlist
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.post('/create-playlist', jwtauth, createPlaylist)
//delete playlist
/**
 * @swagger
 * /music/delete-playlist:
 *  delete:
 *      description: Deletes a playlist
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.delete('/delete-playlist', jwtauth, deletePlaylist)
//delegate control
/**
 * @swagger
 * /music/delegate-control:
 *  post:
 *      description: give playlist control to selected friends
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.post('/delegate-control', jwtauth, delegateControl)
//find delegate match
/**
 * @swagger
 * /music/delegate-match:
 *  post:
 *      description: check if user has delegate control
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.post('/delegate-match', jwtauth, delegateMatch)
/**
 * @swagger
 * /music/get-licensed-playlists:
 *  post:
 *      description: Fetches playlists that a user can edit. Playlists where the user was given license(s) to edit
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.post('/get-licensed-playlists', jwtauth, getLicensedPlaylists)