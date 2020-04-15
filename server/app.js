require('../server/db/mongoose')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoStoreSession = require('connect-mongodb-session')(session)
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const { generateMessage } = require('./utils/messages')
const Inbox = require('./models/inbox')


const dbStore = new mongoStoreSession({
    uri: process.env.MONGODB_URL,
    collection: 'sessions'
});
app.use(session({
    secret: 'secret key encrypt session',
    resave: false,
    saveUninitialized: false,
    store: dbStore
}))



// requiring routes
const authRoute = require('../server/routes/auth')
const dashboardRoute = require('../server/routes/dashboard')


const publicDirectory = path.join(__dirname, '../public')
const viewDirectory = path.join(__dirname, '../views')
const partialsDirectory = path.join(__dirname, '../views/shared')

const port = process.env.PORT

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(partialsDirectory)
app.use(express.static(publicDirectory))


// Using routes
app.use(authRoute)
app.use(dashboardRoute)

io.on('connection', (socket) => {
    console.log('new websocket connection ')
    let inbox = new Inbox()
    socket.emit('message', generateMessage('welcome '))
    socket.broadcast.emit('message', generateMessage('A new User jas joined'))
    socket.on('sendMessage', (message, callback) => {
        io.emit('message', generateMessage(message))
        inbox.msg = message
        inbox.save()
        callback()
    })
    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'))
    })
})

server.listen(port, () => {
    console.log('listning on port ' + port)
})