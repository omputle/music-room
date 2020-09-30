//create express app
import express from 'express'
const app = express()
const port = 5000

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