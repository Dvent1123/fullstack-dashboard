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
    let newAsset =  req.body
    try{
        const asset = new Assets({
            name: newAsset.name,
            status: newAsset.status,
            location: newAsset.location,
            desc: newAsset.desc
        })

        const saveAsset = await asset.save()
        return res.status(201).send({
            error: false,
            saveAsset
        })

    }catch{
        res.status(500).send({
            error: true,
        })
    }
})

//this route will update the existing assets
router.put('/edit/:id', async(req, res) => {
    const { id } = req.params
    let newAsset = req.body

    try{
        let asset = await Assets.findById(id)
            asset.name = newAsset.name,
            asset.status = newAsset.status,
            asset.location = newAsset.location,
            asset.desc = newAsset.desc

            await asset.save()

        return res.status(202).send({
            error: false,
            asset
        })
    }catch{
        res.status(500).send({
            error: true
        })
    }
})

//this route will delete an asset
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    try{
        let asset = await Assets.findById(id)
        await asset.remove()

        return res.status(202).send({
            error: false,
            asset
        })
    }catch{
        res.status(500).send({
            error: true
        })
    }
})

module.exports = router