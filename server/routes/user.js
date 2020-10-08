//import modules & create router
import { Router } from 'express'
import passport from 'passport'

//import controllers
import { jwtauth } from '../controllers/authController'
import { getProfile, getFriends, getplaylist, getSettings
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