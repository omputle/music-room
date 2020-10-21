//import modules
import { Router } from 'express'
import passport from 'passport'

//import controllers
import { 
    fetchDeezerAccessToken, googleRedirect, deezerRedirect, jwtUrl 
} from '../controllers/authController'

//create & expose router to server
const router = Router()
export default router

//jwt auth
/**
 * @swagger
 * /auth/jwt:
 *  post:
 *      description: Returns google auth token after user is authenticates successfully
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.post('/jwt', jwtUrl)

//google oauth
.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))
.get('/google/redirect', passport.authenticate('google'), googleRedirect)

//deezer oauth
.get('/deezer-pass', passport.authenticate('deezer', {scope: ['profile', 'email']}))
.get('/deezer-pass/redirect', passport.authenticate('deezer'), deezerRedirect)
/**
 * @swagger
 * /auth/deezer/redirect:
 *  get:
 *      description: Returns deezer access token after user authenticates successfully
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.get('/deezer/redirect', fetchDeezerAccessToken)