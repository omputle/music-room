//import modules & create router
import { Router } from 'express'
import passport from 'passport'

//import controllers
import { jwtauth, licenseAuth } from '../controllers/authController'
import { getProfile, getFriends, getSettings, makeLicense, removeLicense, getKey, getLicensedPlaylists
} from '../controllers/userController'

//create & expose router to server
const router = Router()
export default router

//routes
.get('/me', jwtauth, getProfile)
.get('/friends', jwtauth, getFriends)
.get('/settings', jwtauth, getSettings)

//.post('/postlist', postplaylist)

//licence
.post('/give-license', jwtauth, makeLicense)
.post('/revoke-license',jwtauth, removeLicense)
.post('/yebo', licenseAuth, getKey)
.post('/get-licensed-playlists', getLicensedPlaylists)