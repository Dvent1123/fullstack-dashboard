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


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true}).catch(err => console.log(err))
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', ()=> console.log('Connected to Mongoose'))


app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/assets', assetsRouter)
app.use('/tasks', tasksRouter)

app.listen(port, ()=> {
    console.log('server is running')
})