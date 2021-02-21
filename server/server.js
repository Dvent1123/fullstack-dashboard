if(process.env.NODE_ENV != 'production'){
    require('dotenv').config({path: './.env'})
}


const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5000 || process.env.PORT
const passport = require('passport')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const assetsRouter = require('./routes/assets')
const tasksRouter = require('./routes/tasks')
const homeRouter = require('./routes/home')
const assetsController = require('./controllers/assetsController')
const tasksController = require('./controllers/tasksController')
const usersController = require('./controllers/usersController')
const roomController = require('./controllers/roomController')
const authRoutes = require('./routes/auth')
const server= require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})
const jwt = require('jsonwebtoken')
app.use(cors())
app.use(passport.initialize())
require('./config/passport')
// const WebSockets = require('./utils/WebSockets')

//THIS IS ONLY A TEST
// io.on('connection', WebSockets.connection)



io.use(function(socket, next){
  if (socket.handshake.auth){
    jwt.verify(socket.handshake.auth.token, process.env.TOKEN_SECRET, function(err, decoded) {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      next();
    });
  }
  else {
    next(new Error('Authentication error'));
  }    
})


//socket.io connection
io.on('connection', socket => {
        console.log('new client connected')
            //subscribes the socket to the room that they are a part of
            socket.on('subscribe', room => {
                socket.join(room)
                roomController.joinRoom(io, room)
            })
            socket.on('addAsset', data => {
                assetsController.newAsset(io, data)
            })
            //this makes a req to the controller to update the asset
            socket.on('updateAsset', data => {
                assetsController.updateAsset(io, data)
            })

            socket.on('deleteAsset', id => {
                assetsController.deleteAsset(io, id)
            })

            //making req to controller to add task
            socket.on('addTask', data => {
                tasksController.newTask(io, data)
            })

            socket.on('updateTask', data => {
                tasksController.updateTask(io, data)
            })

            socket.on('deleteTask', id => {
                tasksController.deleteTask(io, id)
            })

            socket.on('addUser', data => {
                usersController.newUser(io, data)
            })

            socket.on('updateUser', data => {
                usersController.updateUser(io, data)
            })

            socket.on('deleteUser', id => {
                usersController.deleteUser(io, id)
            })

            socket.on('disconnect', () => {
                console.log('client disconnected')
            })
})    



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



const mongoose = require('mongoose')
const { stringify } = require('querystring')
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true}).catch(err => console.log(err))
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', ()=> console.log('Connected to Mongoose'))


app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/assets', assetsRouter)
app.use('/tasks', tasksRouter)
app.use('/login', authRoutes)
app.use('/home', homeRouter)

server.listen(port, ()=> {
    console.log('server is running')
})