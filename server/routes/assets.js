const { json } = require('body-parser')
const express = require('express')
const router = express.Router()


router.get('/', async (req, res)=> {
    res.send({"message": "You are in the assets page"})
})

//add a new asset
router.post('/new', async (req, res) => {
    const newAsset =  req.body
    console.log(newAsset.name)
    res.send({"message": "New Person Added", "person": newAsset})
})

module.exports = router