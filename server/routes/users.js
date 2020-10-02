//create route
import { Router } from 'express'
const router = Router()

const passport = require('passport');
//import controllers
import { getProfile } from '../controllers/userController'

//expose router to server
export default router

//routes
.get('/:username', getProfile)
.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))
// callback route
.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send("You will be redirected to login")
})