//create route
import { Router } from 'express'
const router = Router()

const passport = require('passport');
//import controllers
import { hello } from '../controllers/userController'

//expose router to server
export default router

//routes
.get('/', hello)
.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))
// callback route
.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send("You will be redirected to login")
})