const { json } = require('body-parser')
const express = require('express')
const router = express.Router()


router.get('/', async (req, res)=> {
    //go into database here to get assets
    //as well as tasks
    res.send({"message": "You are in the assets page"})
})

//add a new asset
router.post('/new', async (req, res) => {
    const newAsset =  req.body
    console.log(newAsset.name)
    res.send({"message": "New Person Added", "person": newAsset})
})

//this route will update the existing assets
router.put('/:id', async(req, res) => {

})

//this route will delete an asset
router.delete(':id', async (req, res) => {

})

module.exports = router