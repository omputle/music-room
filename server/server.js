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

//initialize database
import { init } from './models/db'
init()

//api routes
import users from './routes/users'

app.use('/users/', users)

//listen
app.listen(port, () => console.log(`server listening on port ${port}...`))