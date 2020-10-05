//create route
import { Router } from 'express'
const router = Router()

const passport = require('passport');
//import controllers
import { getProfile, fetchDeezerAccessToken, googleRedirect, deezerRedirect } from '../controllers/userController'

//expose router to server
export default router

//routes
.get('/:username', getProfile)
.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))
// callback route
.get('/auth/google/redirect', passport.authenticate('google'), googleRedirect)
.get('/auth/deezer-pass', passport.authenticate('deezer', {scope: ['profile', 'email']}))
.get('/auth/deezer-pass/redirect', passport.authenticate('deezer'), deezerRedirect)
// callback route
.get('/auth/deezer/redirect', fetchDeezerAccessToken)