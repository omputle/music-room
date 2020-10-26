//import modules & create router
import { Router } from 'express'
import passport from 'passport'

//import controllers
import { jwtauth, licenseAuth } from '../controllers/authController'
import { getProfile, getFriends, getSettings, makeLicense, removeLicense, 
    editDetails, unfollowUser, followUser, getUsers
} from '../controllers/userController'

//create & expose router to server
const router = Router()
export default router

//routes
/**
 * @swagger
 * /user/me:
 *  get:
 *      description: Fetches a user's profile
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.get('/me', jwtauth, getProfile)
/**
 * @swagger
 * /user/friends:
 *  get:
 *      description: Fetches a user's friends
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.get('/friends', jwtauth, getFriends)
/**
 * @swagger
 * /user/settings:
 *  get:
 *      description: Fetches a user's settings
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.get('/settings', jwtauth, getSettings)

//.post('/postlist', postplaylist)

//licence
/**
 * @swagger
 * /user/give-license:
 *  post:
 *      description: Creates a license to allow other users to edit your playlist
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.post('/give-license', jwtauth, makeLicense)
/**
 * @swagger
 * /user/revoke-license:
 *  post:
 *      description: Deletes a license that allows other users to edit your playlist
 *      responses:
 *          200:
 *              description: ran successfully
 *          404:
 *              description: requires authentication
 */
.post('/revoke-license',jwtauth, removeLicense)

.post('/edit-details', jwtauth, editDetails)

.post('/follow-user', jwtauth, followUser)

.post('/unfollow-user', jwtauth, unfollowUser)

.get('/get-users', jwtauth, getUsers)