if(process.env.NODE_ENV != 'production'){
    require('dotenv').config({path: './.env'})
}


const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5000 || process.env.PORT
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const assetsRouter = require('./routes/assets')
const tasksRouter = require('./routes/tasks')
const assetsController = require('./controllers/assetsController')
const tasksController = require('./controllers/tasksController')
const usersController = require('./controllers/usersController')
const authRoutes = require('./routes/auth')
const server= require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})
app.use(cors())



//socket.io connection
io.on('connection', socket => {
  console.log('New Client Connected');
  //this makes a req to the controller to add a new asset
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
});



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

server.listen(port, ()=> {
    console.log('server is running')
})