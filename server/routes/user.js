//import modules & create router
import { Router } from 'express'
import passport from 'passport'

//import controllers
import { jwtauth } from '../controllers/authController'
import { getProfile
} from '../controllers/userController'

//create & expose router to server
const router = Router()
export default router

//routes
.get('/me', jwtauth, getProfile)
//.get('/', getplaylist)
//.post('/postlist', postplaylist)