//create route
import { Router } from 'express'
const router = Router()

//import controllers
import { hello } from '../controllers/userController'

//expose router to server
export default router

.get('/', hello)