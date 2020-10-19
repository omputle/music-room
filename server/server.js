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
        websocketServer.clients.forEach( client => {
            console.log(client)
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    })
    // ws.on('message', data => {
    //     console.log(data)
    //     
    // });
    ws.on('close', () => {
        console.log('client disconnected')
    })
});

//api routes
import auth from './routes/auth'
import user from './routes/user'
import music from './routes/music'

app.use('/auth/', auth)
app.use('/user/', user)
app.use('/music', music)

//listen
app.listen(port, () => console.log(`server listening on port ${port}...`))