const { json } = require('body-parser')
const express = require('express')
const router = express.Router()
const Assets = require('../models/Assets')

router.get('/', async (req, res)=> {
    let assetsArray = []
    try{
        assetsArray = await Assets.find({})
        return res.status(201).send({
            error: false,
            assetsArray
        })
    }catch{
        res.status(500).send({
            error: true,
        })
    }
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