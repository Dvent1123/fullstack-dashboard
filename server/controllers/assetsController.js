const mongoose = require('mongoose')
const Assets = require('../models/Assets')
const passport = require('passport')

exports.getAssets = async (req, res) => {
    //the user info is in user and the error is in info
    passport.authenticate('jwt', {session: false}, async (err, user,info) => {
        if(err) {
            console.log(err)
        }
        if(info != undefined) {
            console.log(info.message)
            res.send(info.message)
        }else {
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
        }
    }) (req, res)
}

exports.newAsset = async (io, assetFromServer) => {
    let ioAsset = assetFromServer
    let result;

    const newAsset = new Assets({
             name: ioAsset.name,
             status: ioAsset.status,
             location: ioAsset.location,
             desc: ioAsset.desc
         })
     newAsset.save((err, asset) => {
        if(err) {
            result = {success: false, error: err}
            io.emit('AssetAdded', result)
        }else{
            result = {success: true, data: asset}
            io.emit('AssetAdded', result)
        }   
    })
}

exports.updateAsset = async (io, assetFromServer) => {
    const  id  = assetFromServer.id
    let newAsset = assetFromServer
    let result

        let asset = await Assets.findById(id)

            asset.name = newAsset.name,
            asset.status = newAsset.status,
            asset.location = newAsset.location,
            asset.desc = newAsset.desc

            asset.save((err, updatedAsset) => {
            if(err) {
                result = {success: false, error: err}
                io.emit('AssetUpdated', result)
            }else{
                result = {success: true, data: updatedAsset}
                io.emit('AssetUpdated', result)
            }   
        })
    
}

exports.deleteAsset = async (io, id) => {
        let asset = await Assets.findById(id)
        let result
        
        asset.remove((err, deletedAsset) => {
            if(err) {
                result = {success: false, error: err}
                io.emit('AssetDeleted', result)       
            }else {
                result = {success: true, data: deletedAsset}
                io.emit('AssetDeleted', result)  
            }
            })

}
