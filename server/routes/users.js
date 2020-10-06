//import modules & create router
import { Router } from 'express'
import passport from 'passport'

//import controllers
import { getProfile, postplaylist, getplaylist 
} from '../controllers/userController'

//create & expose router to server
const router = Router()
export default router

//routes
.get('/:username', getProfile)
//.get('/', getplaylist)
//.post('/postlist', postplaylist)