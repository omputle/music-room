//create express app
import express from 'express'
const app = express()
const port = 5000
const passport = require('passport')

const passportSetup = require('./configs/passport-setup');
app.use(passport.initialize());
app.use(passport.session());
//setup path

//setup middleware
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

//initialize database
import { init } from './models/db'
init()

//api routes
import auth from './routes/auth'
import users from './routes/users'

app.use('/auth/', auth)
app.use('/user/', users)

//listen
app.listen(port, () => console.log(`server listening on port ${port}...`))