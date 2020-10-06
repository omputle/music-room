//import modules
import { Router } from 'express'
import passport from 'passport'

//import controllers
import { fetchDeezerAccessToken, googleRedirect, deezerRedirect 
} from '../controllers/authController'

//create & expose router to server
const router = Router()
export default router

//google oauth
.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))
.get('/google/redirect', passport.authenticate('google'), googleRedirect)

//deezer oauth
.get('/deezer-pass', passport.authenticate('deezer', {scope: ['profile', 'email']}))
.get('/deezer-pass/redirect', passport.authenticate('deezer'), deezerRedirect)
.get('/deezer/redirect', fetchDeezerAccessToken)