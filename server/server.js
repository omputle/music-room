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
    //console.log('client socket connected')
    //console.log(req.url)
    let id = req.url.replace(/%20/g, ' ')
    sockets[id] = ws
    console.log('connected: ' + id + ' in ' + Object.getOwnPropertyNames(sockets))
    ws.on('message', (msg) => {
        try {
            msg = JSON.parse(msg)
            let receiver = sockets[msg.receiver]
            if (receiver) {
                //console.log(`${id} sending to ${msg.receiver}: ${msg.song}`)
                receiver.send(`{
                    "sender":"${id}",
                    "title":"${msg.title}",
                    "id":"${msg.id}"
                }`)
            }
        } catch (e) {console.log(e)}
        // try {
        //     websocketServer.clients.forEach( client => {
        //     console.log(client)
        //     if (client.readyState === WebSocket.OPEN) {
        //         client.send(data);
        //     }
        // });
        // } catch (e) {console.log(e)}
    })
    // ws.on('message', data => {
    //     console.log(data)
    //     
    // });
    ws.on('close', () => {
        console.log('client disconnected')
    })
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