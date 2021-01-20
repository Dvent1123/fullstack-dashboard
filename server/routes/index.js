const express = require('express')
const router = express.Router()


router.get('/', async (req, res)=> {
    res.send({"message": "You are in the index page"})
})

module.exports = router