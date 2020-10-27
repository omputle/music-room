//create express app
import express from 'express'
const app = express()
const port = 5000

//setup passport
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

//websockets init
const WebSocket = require('ws');
const websocketServer = new WebSocket.Server({ port: 5001 });
var sockets = {}

websocketServer.on('connection', (ws, req) => {
    let id = req.url.replace(/%20/g, ' ')
    sockets[id] = ws
    //console.log('connected: ' + id + ' in ' + Object.getOwnPropertyNames(sockets))
    ws.on('message', (msg) => {
        try {
            msg = JSON.parse(msg)
            let response = ''
            switch (msg.type) {
                case 'delegate':
                    response = `{
                        "sender":"${id}",
                        "type":"delegate"
                    }`
                    break
                case 'playsong':
                    response = `{
                        "sender":"${id}",
                        "type":"playsong",
                        "title":"${msg.title}",
                        "id":"${msg.id}"
                    }`
                    break
                case 'shareplaylist':
                    response = `{
                        "sender":"${id}",
                        "type":"shareplaylist"
                    }`
                    break
                default:
                    response = `{
                        "error":"no type"
                    }`
            }
            sockets[msg.receiver] ? sockets[msg.receiver].send(response) : 0
        } catch (e) {console.log(e)}
    })
    ws.on('close', () => {})
});

// swagger documentation
const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Music Room',
      description: 'Music Room API documentation which shows the endpoints of our api',
      contact: {
        name: 'ksefeane & omputle',
        url: 'https://github.com/ksefeane/music-room.git',
        email: 'mahbabiez@gmail.com'
      },
      license: {
        name: "READMe",
        url: 'https://github.com/ksefeane/music-room/blob/master/README.md'
      },
      servers: ["http://localhost:5000"],
      verion: '1.0.1'
    }
  },
  apis: ['./routes/auth.js', './routes/music.js', './routes/user.js']
}

const swaggerDocs = swaggerJsDocs(swaggerOptions);
app.use('/api-documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//api routes
import auth from './routes/auth'
import user from './routes/user'
import music from './routes/music'

app.use('/auth/', auth)
app.use('/user/', user)
app.use('/music', music)

//listen
app.listen(port, () => console.log(`server listening on port ${port}...`))