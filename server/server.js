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



app.use('/', indexRouter)
// app.use('/users', usersRouter)
app.use('/assets', assetsRouter)
// app.use('/tasks', tasksRouter)

app.listen(port, ()=> {
    console.log('server is running')
})