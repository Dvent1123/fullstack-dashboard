const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5000 || process.env.PORT


app.use(cors())
app.use(bodyParser.json())


app.listen(port, ()=> {
    console.log('server is running')
})