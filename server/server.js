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

websocketServer.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
      websocketServer.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
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